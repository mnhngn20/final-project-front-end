import { CalendarFilledSVG, EditSVG } from '#/assets/svgs';
import {
  Incident,
  refetchGetIncidentQuery,
  useUpdateIncidentForEmployeeMutation,
} from '#/generated/schemas';
import Avatar from '#/shared/components/commons/Avatar';
import Gallery from '#/shared/components/commons/Gallery';
import { formatDate } from '#/shared/utils/date';
import { showError } from '#/shared/utils/notification';
import { DeepPartial } from '#/shared/utils/type';
import { Divider, Tooltip, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import IncidentPrioritySelector from './IncidentPrioritySelector';

interface IncidentDetailProps {
  incident?: DeepPartial<Incident>;
  setEditModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

function DisplayItem({
  name,
  className,
  value,
}: {
  name: string;
  value?: string | number | JSX.Element | null;
  className?: string;
}) {
  return (
    <div
      className={`grid w-full grid-cols-4 items-center text-base ${className}`}
    >
      <Typography className="col-span-1 font-semibold">{name}</Typography>
      <Typography className="col-span-3">{value ?? 'N/A'}</Typography>
    </div>
  );
}

export default function IncidentDetail({
  incident,
  setEditModalVisible,
}: IncidentDetailProps) {
  const { id } = useParams();

  const [updateIncident] = useUpdateIncidentForEmployeeMutation({
    onError: showError,
    refetchQueries: [refetchGetIncidentQuery({ id: Number(id) })],
  });

  return (
    <div className="col-span-1 items-center rounded-xl bg-[white] p-4">
      <div className="flex flex-wrap items-center justify-between gap-4 p-[5px]">
        <div className="flex items-center gap-4">
          <IncidentPrioritySelector
            value={incident?.priority}
            onChange={priority =>
              incident?.status &&
              updateIncident({
                variables: {
                  input: { id: Number(id), priority, status: incident?.status },
                },
              })
            }
          />
        </div>
        <div className="flex items-center gap-4">
          <Tooltip
            title={`Created At: ${formatDate(
              incident?.createdAt,
              'DD/MM/YYYY mm:hh A',
            )}`}
            className="flex items-center gap-4"
            placement="bottom"
          >
            <CalendarFilledSVG
              width={24}
              height={24}
              className="text-success"
            />
          </Tooltip>
          <EditSVG
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={() => setEditModalVisible?.(true)}
          />
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-8">
        <DisplayItem
          name="Reported By"
          value={
            <div className="flex items-center gap-4">
              <Avatar src={incident?.reporter?.avatar} size={40} />
              <div>
                <Typography className="text-base font-semibold text-primary-color">
                  {incident?.reporter?.name}
                </Typography>
                <Typography className="text-xs font-normal">
                  {incident?.reporter?.email}
                </Typography>
              </div>
            </div>
          }
        />
        <DisplayItem name="Room" value={`Room ${incident?.room?.name}`} />
        <DisplayItem
          name="Incident Type"
          value={incident?.incidentCategory?.name}
        />
        <DisplayItem name="Incident Title" value={incident?.title} />
        <DisplayItem name="Description" value={incident?.description} />
        <Divider className="m-0" />
        <Gallery
          className="text-base font-semibold uppercase text-primary-color"
          title="Image Attachments"
          gallery={incident?.images?.split(',')}
        />
      </div>
    </div>
  );
}
