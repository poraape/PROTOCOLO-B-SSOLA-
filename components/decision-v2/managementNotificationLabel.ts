import { ManagementNotificationTiming } from '../../types/decision-tree-v2';

const managementNotificationLabelByTiming: Record<ManagementNotificationTiming, string> = {
  IMEDIATO: 'Avisar gestão agora',
  MESMO_DIA: 'Avisar gestão hoje',
  CIENCIA: 'Dar ciência à gestão'
};

export const getManagementNotificationLabel = (timing?: ManagementNotificationTiming): string => {
  if (!timing) return 'Avisar gestão';
  return managementNotificationLabelByTiming[timing];
};

