import { renderHook, act } from '@testing-library/react-hooks';
import { useDecisionTreeV2 } from '../hooks/useDecisionTreeV2';
import { decisionTreeV2 } from '../data/decision-tree-migration';

describe('useDecisionTreeV2', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('deve iniciar no nó CRITICAL_TRIAGE_ROOT', () => {
    const { result } = renderHook(() => useDecisionTreeV2(decisionTreeV2));

    expect(result.current.currentNode.id).toBe('CRITICAL_TRIAGE_ROOT');
    if ('level' in result.current.currentNode) {
      expect(result.current.currentNode.level).toBe('CRITICAL_TRIAGE');
    }
  });

  test('deve navegar para EMERGENCY_LEAF ao escolher SIM na triagem crítica', () => {
    const { result } = renderHook(() => useDecisionTreeV2(decisionTreeV2));

    act(() => {
      result.current.navigate('EMERGENCY_LEAF', 'SIM');
    });

    expect(result.current.currentNode.id).toBe('EMERGENCY_LEAF');
    if ('level' in result.current.currentNode) {
      expect(result.current.currentNode.level).toBe('LEAF');
    }
    if ('riskClassification' in result.current.currentNode) {
      expect(result.current.currentNode.riskClassification).toBe('EMERGENCIAL');
    }
  });

  test('deve calcular risco ALTO com score >= 8', () => {
    const { result } = renderHook(() => useDecisionTreeV2(decisionTreeV2));

    act(() => {
      result.current.navigate('RISK_ASSESS_Q1', 'SIM', 2);
      result.current.navigate('RISK_ASSESS_Q2', 'SIM', 3);
      result.current.navigate('RISK_ASSESS_Q3', 'SIM', 3);
    });

    expect(result.current.riskClassification).toBe('ALTO');
  });

  test('deve voltar ao nó anterior com goBack()', () => {
    const { result } = renderHook(() => useDecisionTreeV2(decisionTreeV2));
    const firstNodeId = result.current.currentNode.id;

    act(() => {
      result.current.navigate('RISK_ASSESS_Q1');
    });

    expect(result.current.currentNode.id).toBe('RISK_ASSESS_Q1');

    act(() => {
      result.current.goBack();
    });

    expect(result.current.currentNode.id).toBe(firstNodeId);
  });

  test('deve salvar estado no localStorage', () => {
    const { result } = renderHook(() => useDecisionTreeV2(decisionTreeV2));

    act(() => {
      result.current.navigate('RISK_ASSESS_Q1', 'SIM', 2);
    });

    const saved = localStorage.getItem('decisionTreeState');
    expect(saved).toBeTruthy();

    const parsed = JSON.parse(saved || '{}');
    expect(parsed.currentNodeId).toBe('RISK_ASSESS_Q1');
  });
});
