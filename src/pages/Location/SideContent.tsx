import { Location } from '#/generated/schemas';
import { DeepPartial } from '#/shared/utils/type';
import { Image, Typography } from 'antd';
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
        <div>
          <Typography className="text-lg font-bold">Details</Typography>
          <DetailItem
            icon={LocationSVG}
            toolTip="Address"
            value={location?.address}
          />
          <DetailItem
            icon={BuildingOutlineSVG}
            toolTip="Number of floor"
            value={location?.numOfFloor}
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
            icon={RoomSVG}
            toolTip="Number of room"
            value={location?.rooms?.length ?? 0}
          />
          <DetailItem
            icon={NoteSVG}
            toolTip="Description"
            value={<EllipsisText text={location?.description ?? 'N/A'} />}
          />
          <DetailItem
            icon={SquareDollarOutlineSVG}
            toolTip="Total Revenue"
            value={(location?.totalRevenue ?? 0).toLocaleString()}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Typography className="text-lg font-bold">
            Contact Information
          </Typography>
          {location?.contactInformations?.[0] ? (
            location?.contactInformations?.map(contact => (
              <div
                key={contact?.id}
                className="flex flex-col rounded-xl p-4 shadow-card"
              >
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
