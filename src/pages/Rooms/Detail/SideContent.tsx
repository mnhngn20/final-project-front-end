import { Room } from '#/generated/schemas';
import { DeepPartial } from '#/shared/utils/type';
import { Image, Typography } from 'antd';
import DefaultImage from '#/assets/images/default.png';
import CustomTag from '#/shared/components/commons/CustomTag';
import DetailItem from '#/shared/components/commons/DetailItem';
import {
  BuildingOutlineSVG,
  CalendarSVG,
  DevicesOutlineSVG,
  LocationSVG,
  NoteSVG,
  SquareDollarOutlineSVG,
} from '#/assets/svgs';
import { formatDate } from '#/shared/utils/date';
import { getRoomStatusColor } from '../ultils';

interface SideContentProps {
  room?: DeepPartial<Room>;
}

function SideContent({ room }: SideContentProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      <Image
        src={room?.thumbnail ?? DefaultImage}
        width={250}
        height={250}
        preview={false}
        className="rounded-full object-cover"
      />
      <div className="flex w-full flex-col gap-4 text-base">
        <div className="flex items-center justify-between">
          <Typography className="text-xl font-bold text-primary-color">
            {room?.name}
          </Typography>
          <CustomTag
            className={getRoomStatusColor(room?.status)}
            content={room?.status ?? 'N/A'}
          />
        </div>
        <div>
          <Typography className="text-lg font-bold">Details</Typography>
          <DetailItem
            icon={LocationSVG}
            toolTip="Room location"
            value={`Room ${room?.location?.name}`}
          />
          <DetailItem
            icon={BuildingOutlineSVG}
            toolTip="Room floor"
            value={`Floor ${room?.floor}`}
          />
          <DetailItem
            icon={CalendarSVG}
            toolTip="Created at"
            value={formatDate(room?.createdAt, 'hh:mm A, DD MMMM YYYY')}
          />
          <DetailItem
            icon={CalendarSVG}
            toolTip="Updated at"
            value={formatDate(room?.updatedAt, 'hh:mm A, DD MMMM YYYY')}
          />
          <DetailItem
            icon={DevicesOutlineSVG}
            toolTip="Number of equipment"
            value={`${room?.equipments?.length ?? 0} Equipment(s)`}
          />
          <DetailItem
            icon={SquareDollarOutlineSVG}
            toolTip="Base Price"
            value={`${room?.basePrice?.toLocaleString() ?? 0} VND`}
          />
          <DetailItem
            icon={NoteSVG}
            toolTip="Description"
            value={room?.description}
          />
        </div>
      </div>
    </div>
  );
}

export default SideContent;
