import { IncidentStatus, IncidentPriority } from '#/generated/schemas';

export const getIncidentPriorityColor = (
  priority?: IncidentPriority | null,
) => {
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
export const getIncidentStatusColor = (status?: IncidentStatus | null) => {
  switch (status) {
    case IncidentStatus.Cancel:
      return 'text-[white] bg-alert';
    case IncidentStatus.Done:
      return 'text-[white] bg-success';
    case IncidentStatus.InProgress:
      return 'text-[white] bg-info';
    case IncidentStatus.ToDo:
      return 'text-[white] bg-grey-secondary-400';
    default:
      return 'text-[white] bg-alert';
  }
};
export const getIncidentStatus = (status?: IncidentStatus | null) => {
  switch (status) {
    case IncidentStatus.Cancel:
      return 'Cancel';
    case IncidentStatus.Done:
      return 'Done';
    case IncidentStatus.InProgress:
      return 'In Progress';
    case IncidentStatus.ToDo:
      return 'To Do';
    default:
      return 'Cancel';
  }
};
