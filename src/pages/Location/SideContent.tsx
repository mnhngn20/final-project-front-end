import { Location } from '#/generated/schemas';
import { DeepPartial } from '#/shared/utils/type';
import { Divider, Image, Tooltip, Typography } from 'antd';
import DefaultImage from '#/assets/images/default.png';
import CustomTag from '#/shared/components/commons/CustomTag';
import DetailItem from '#/shared/components/commons/DetailItem';
import {
  BuildingOutlineSVG,
  CalendarSVG,
  CallSVG,
  LocationSVG,
  MapSVG,
  NoteSVG,
  RoomSVG,
  SmsSVG,
  SquareDollarOutlineSVG,
  StarSVG,
  UserOutlineSVG,
} from '#/assets/svgs';
import { formatDate } from '#/shared/utils/date';
import EllipsisText from '#/shared/components/commons/EllipsisText';

interface SideContentProps {
  location?: DeepPartial<Location>;
}

function SideContent({ location }: SideContentProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      <Image
        src={location?.thumbnail ?? DefaultImage}
        width={250}
        height={250}
        preview={false}
        className="rounded-full object-cover"
      />
      <div className="flex w-full flex-col gap-4 text-base">
        <div className="flex items-center justify-between">
          <Typography className="text-xl font-bold text-primary-color">
            {location?.name}
          </Typography>
          <CustomTag
            className={`text-[white] ${
              location?.isActive ? 'bg-success' : 'bg-grey-secondary-300'
            }`}
            content={location?.isActive ? 'Is Active' : 'Not Active'}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Tooltip
            title="Total Revenue"
            className="flex w-fit cursor-pointer gap-2 rounded-xl bg-primary-color p-4 text-[white]"
          >
            <SquareDollarOutlineSVG width={24} height={24} />
            {(location?.totalRevenue ?? 0)?.toLocaleString()} VND
          </Tooltip>
          <Tooltip
            title="Total Rooms"
            className="flex w-fit cursor-pointer gap-2 rounded-xl bg-warning p-4 text-[white]"
          >
            <RoomSVG width={24} height={24} />
            {location?.rooms?.length ?? 0}
          </Tooltip>
          <Tooltip
            title="Total Users"
            className="flex w-fit cursor-pointer gap-2 rounded-xl bg-info p-4 text-[white]"
          >
            <UserOutlineSVG width={24} height={24} />
            {location?.users?.length ?? 0}
          </Tooltip>
        </div>
        <div>
          <Typography className="text-lg font-bold">Details</Typography>
          <Divider />

          <DetailItem
            icon={LocationSVG}
            toolTip="Address"
            value={location?.address}
          />
          <DetailItem
            icon={BuildingOutlineSVG}
            toolTip="Number of floor"
            value={`${location?.numOfFloor} ${
              (location?.numOfFloor ?? 0) > 1 ? 'Floors' : 'Floor'
            }`}
          />
          <DetailItem
            icon={StarSVG}
            toolTip="Services"
            value={
              location?.locationServices?.[0]
                ? location?.locationServices
                    ?.map(service => service?.name)
                    ?.join(', ')
                : 'N/A'
            }
          />
          <DetailItem
            icon={CalendarSVG}
            toolTip="Created at"
            value={formatDate(location?.createdAt)}
          />
          <DetailItem
            icon={NoteSVG}
            toolTip={
              (location?.description?.length ?? 0) < 60
                ? 'Description'
                : undefined
            }
            value={<EllipsisText text={location?.description ?? 'N/A'} />}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Typography className="text-lg font-bold">
            Contact Information
          </Typography>
          {location?.contactInformations?.[0] ? (
            location?.contactInformations?.map(contact => (
              <div key={contact?.id} className="flex flex-col">
                <Divider className="m-0" />
                <DetailItem
                  icon={UserOutlineSVG}
                  toolTip="Name"
                  value={contact?.name}
                />
                <DetailItem
                  icon={CallSVG}
                  toolTip="Phone Number"
                  value={contact?.phoneNumber}
                />
                <DetailItem
                  icon={SmsSVG}
                  toolTip="Email"
                  value={contact?.email}
                />
                <DetailItem
                  icon={MapSVG}
                  toolTip="Number of room"
                  value={contact?.address}
                />
              </div>
            ))
          ) : (
            <Typography>No contact available</Typography>
          )}
        </div>
      </div>
    </div>
  );
}

export default SideContent;
