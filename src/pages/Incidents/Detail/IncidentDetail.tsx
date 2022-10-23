import { CalendarFilledSVG, EditSVG, FlagOutlineSVG } from '#/assets/svgs';
import { Incident } from '#/generated/schemas';
import Avatar from '#/shared/components/commons/Avatar';
import Gallery from '#/shared/components/commons/Gallery';
import CustomTag from '#/shared/components/commons/Tag';
import { formatDate } from '#/shared/utils/date';
import { DeepPartial } from '#/shared/utils/type';
import { Divider, Tooltip, Typography } from 'antd';
import {
  getIncidentPriorityColor,
  getIncidentStatus,
  getIncidentStatusColor,
} from '../utils';

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
  return (
    <div className="col-span-1 rounded-xl bg-[white] p-4">
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex items-center gap-4">
          <CustomTag
            content={getIncidentStatus(incident?.status)}
            className={`h-min border-none ${getIncidentStatusColor(
              incident?.status,
            )}`}
          />
          <Divider type="vertical" />
          <div
            className={`${getIncidentPriorityColor(
              incident?.priority,
            )} flex items-center gap-2`}
          >
            <FlagOutlineSVG width={16} height={16} />
            {incident?.priority}
          </div>
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
        <DisplayItem name="Room" value={incident?.room?.name} />
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
