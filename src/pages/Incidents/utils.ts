import { IncidentStatus, IncidentPriority } from '#/generated/schemas';

export const getIncidentPriorityColor = (priority?: string | null) => {
  switch (priority) {
    case IncidentPriority.High:
      return 'text-alert';
    case IncidentPriority.Low:
      return 'text-grey-secondary-400';
    case IncidentPriority.Medium:
      return 'text-info';
    case IncidentPriority.Urgent:
      return 'text-error';
    default:
      return 'text-grey-secondary-400';
  }
};
export const getIncidentStatusColor = (status?: string | null) => {
  switch (status) {
    case IncidentStatus.Cancel:
      return 'text-alert bg-alert-light';
    case IncidentStatus.Done:
      return 'text-success bg-success-light';
    case IncidentStatus.InProgress:
      return 'text-info bg-info-light';
    case IncidentStatus.ToDo:
      return 'text-[white] bg-grey-secondary-300';
    case IncidentStatus.Overdue:
      return 'text-[white] bg-error';
    default:
      return 'text-alert bg-alert-light';
  }
};
export const getIncidentStatus = (status?: string | null) => {
  switch (status) {
    case IncidentStatus.Cancel:
      return 'Cancel';
    case IncidentStatus.Done:
      return 'Done';
    case IncidentStatus.InProgress:
      return 'In Progress';
    case IncidentStatus.ToDo:
      return 'To Do';
    case IncidentStatus.Overdue:
      return 'Overdue';
    default:
      return 'Cancel';
  }
};
