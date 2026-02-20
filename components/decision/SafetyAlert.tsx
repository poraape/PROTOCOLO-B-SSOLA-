import React from 'react';

interface SafetyAlertProps {
  forbiddenAction?: string;
  recommendedAction?: string;
  escalateTo?: string;
}

export const SafetyAlert: React.FC<SafetyAlertProps> = ({ forbiddenAction, recommendedAction, escalateTo }) => {
  if (!forbiddenAction && !recommendedAction && !escalateTo) return null;

  return (
    <div className="rounded-xl border border-danger-200 bg-danger-50 p-3 text-sm text-danger-800">
      {forbiddenAction ? <p><strong>NÃO faça sozinho:</strong> {forbiddenAction}.</p> : null}
      {recommendedAction ? <p className="mt-1"><strong>FAÇA:</strong> {recommendedAction}.</p> : null}
      {escalateTo ? <p className="mt-1"><strong>Escale para:</strong> {escalateTo}.</p> : null}
    </div>
  );
};
