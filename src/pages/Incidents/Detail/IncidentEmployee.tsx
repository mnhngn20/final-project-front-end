import { AddSVG, CalendarSVG } from '#/assets/svgs';
import {
  Incident,
  IncidentStatus,
  refetchGetIncidentQuery,
  useUpdateIncidentForEmployeeMutation,
} from '#/generated/schemas';
import Avatar from '#/shared/components/commons/Avatar';
import Gallery from '#/shared/components/commons/Gallery';
import { formatDate } from '#/shared/utils/date';
import { showError } from '#/shared/utils/notification';
import { DeepPartial } from '#/shared/utils/type';
import { Divider, Empty, Tooltip, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import IncidentStatusSelector from './IncidentStatusSelector';

interface IncidentEmployeeProps {
  incident?: DeepPartial<Incident>;
  setEditModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function IncidentEmployee({
  incident,
  setEditModalVisible,
}: IncidentEmployeeProps) {
  const { id } = useParams();
  const [updateIncident] = useUpdateIncidentForEmployeeMutation({
    onError: showError,
    refetchQueries: [refetchGetIncidentQuery({ id: Number(id) })],
  });

  return (
    <div className="col-span-1 rounded-xl bg-[white] p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span onClick={() => setEditModalVisible?.(true)}>
          <Typography className="flex cursor-pointer items-center gap-4 text-grey-secondary-300">
            <Avatar size={36} src={incident?.employee?.avatar} />
            {incident?.employee ? (
              <span className="flex flex-col">
                <Typography className="text- font-semibold text-primary-color">
                  {incident?.employee?.name}
                </Typography>
                <Typography className="text-xs">
                  {incident?.employee?.email}
                </Typography>
              </span>
            ) : (
              'Add employee in charge'
            )}
          </Typography>
        </span>
        <Tooltip title="Due Date" placement="bottom">
          <Typography
            className={`flex cursor-pointer items-center gap-2 ${
              incident?.status === IncidentStatus.Overdue
                ? 'text-error'
                : 'text-success'
            }`}
          >
            <CalendarSVG width={24} height={24} />
            {formatDate(incident?.dueDate, 'MM/DD/YYYY hh:mm A')}
          </Typography>
        </Tooltip>
      </div>
      <Divider />
      <div className="flex flex-col gap-4">
        <Typography className="mb-4 flex items-center gap-4 text-base font-semibold">
          Incident Status
          <IncidentStatusSelector
            value={incident?.status}
            disabled={incident?.status === IncidentStatus.Overdue}
            onChange={status =>
              updateIncident({
                variables: {
                  input: {
                    id: Number(id),
                    status,
                  },
                },
              })
            }
          />
        </Typography>
        <Typography className="text-base font-semibold">
          Reported Message From Employee
        </Typography>
        {incident?.reportMessage ? (
          <Typography>{incident?.reportMessage}</Typography>
        ) : (
          <Empty
            description={
              <div
                className="flex cursor-pointer items-center justify-center gap-2 text-grey-secondary-300"
                onClick={() => setEditModalVisible?.(true)}
              >
                <AddSVG width={24} height={24} />
                Add Report Message
              </div>
            }
          />
        )}
      </div>
      <Divider />
      <Gallery
        className="text-base font-semibold uppercase text-primary-color"
        title="Reported Image Attachments"
        gallery={incident?.reportImages?.split(',')}
        emptyRender={() => (
          <Empty
            className="my-4 w-full"
            description={
              <div
                className="flex cursor-pointer items-center justify-center gap-2 text-grey-secondary-300"
                onClick={() => setEditModalVisible?.(true)}
              >
                <AddSVG width={24} height={24} />
                Add Report Images
              </div>
            }
          />
        )}
      />
    </div>
  );
}
