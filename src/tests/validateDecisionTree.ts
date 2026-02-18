import { PROTOCOL_DATA } from '../../content/protocolData';
import { DecisionResult, FlowNode, Service } from '../../types';

export interface ValidationIssue {
  leafId: string;
  type:
    | 'MISSING_PRIMARY_SERVICE'
    | 'SERVICE_NOT_FOUND'
    | 'EMERGENCY_PRIORITY_MISMATCH'
    | 'CLASSIFICATION_TYPE_MISMATCH'
    | 'MISSING_JUSTIFICATION'
    | 'INVALID_SECONDARY_SERVICE';
  message: string;
}

const SERVICE_BY_ID = new Map(PROTOCOL_DATA.services.map((service) => [service.id, service]));

const getDecisionResult = (leaf: FlowNode): DecisionResult => ({
  classification: leaf.decisionResult?.classification || 'MEDIA',
  priority: leaf.decisionResult?.priority || 'ORIENTACAO',
  primaryServiceId: leaf.primaryServiceId || leaf.decisionResult?.primaryServiceId || leaf.primaryServiceIds?.[0] || '',
  secondaryServiceIds: leaf.secondaryServiceIds || leaf.decisionResult?.secondaryServiceIds || [],
  deadline: leaf.deadline || leaf.decisionResult?.deadline || '',
  justification: (leaf.whyThisService || leaf.decisionResult?.justification || '').trim()
});

const isClassificationCoherent = (classification: DecisionResult['classification'], primaryService?: Service) => {
  if (!primaryService) return false;
  if (classification === 'EMERGENCIA') return primaryService.type === 'EMERGENCIAL';
  if (classification === 'ALTA') return primaryService.type === 'PROTECAO' || primaryService.type === 'EMERGENCIAL' || primaryService.type === 'SAUDE';
  if (classification === 'MEDIA') return primaryService.type !== 'EMERGENCIAL';
  return true;
};

export const validateDecisionTree = (): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const leaves = PROTOCOL_DATA.decisionTree.filter((node) => node.isLeaf);

  leaves.forEach((leaf) => {
    const result = getDecisionResult(leaf);
    const primaryService = SERVICE_BY_ID.get(result.primaryServiceId);

    if (!result.primaryServiceId) {
      issues.push({
        leafId: leaf.id,
        type: 'MISSING_PRIMARY_SERVICE',
        message: 'Leaf sem primaryServiceId.'
      });
      return;
    }

    if (!primaryService) {
      issues.push({
        leafId: leaf.id,
        type: 'SERVICE_NOT_FOUND',
        message: `Serviço principal inexistente na Rede: ${result.primaryServiceId}.`
      });
    }

    if (result.classification === 'EMERGENCIA' && result.priority !== 'IMEDIATO') {
      issues.push({
        leafId: leaf.id,
        type: 'EMERGENCY_PRIORITY_MISMATCH',
        message: 'Classificação EMERGENCIA exige prioridade IMEDIATO.'
      });
    }

    if (!isClassificationCoherent(result.classification, primaryService)) {
      issues.push({
        leafId: leaf.id,
        type: 'CLASSIFICATION_TYPE_MISMATCH',
        message: `Classificação ${result.classification} incoerente com serviço ${primaryService?.name || result.primaryServiceId}.`
      });
    }

    if (!result.justification) {
      issues.push({
        leafId: leaf.id,
        type: 'MISSING_JUSTIFICATION',
        message: 'Justificativa ausente no leaf.'
      });
    }

    (result.secondaryServiceIds || []).forEach((secondaryId) => {
      if (!secondaryId || !SERVICE_BY_ID.has(secondaryId) || secondaryId === result.primaryServiceId) {
        issues.push({
          leafId: leaf.id,
          type: 'INVALID_SECONDARY_SERVICE',
          message: `Serviço secundário inválido: ${secondaryId || '(vazio)'}.`
        });
      }
    });
  });

  return issues;
};

export const runDecisionTreeValidation = () => {
  const issues = validateDecisionTree();
  return {
    ok: issues.length === 0,
    issues
  };
};
