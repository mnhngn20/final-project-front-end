import { User } from '#/generated/schemas';
import { DeepPartial } from '#/shared/utils/type';
import { Image, Typography } from 'antd';
import DefaultAvatar from '#/assets/images/avatar.png';
import CustomTag from '#/shared/components/commons/CustomTag';
import DetailItem from '#/shared/components/commons/DetailItem';
import {
  BirthdaySVG,
  CalendarSVG,
  CallSVG,
  CardSVG,
  LocationSVG,
  MapSVG,
  SmsSVG,
  StarSVG,
} from '#/assets/svgs';
import { formatDate } from '#/shared/utils/date';

interface SideContentProps {
  user?: DeepPartial<User>;
}

function SideContent({ user }: SideContentProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      <Image
        src={user?.avatar ?? DefaultAvatar}
        width={250}
        height={250}
        preview={false}
        className="rounded-full object-cover"
      />
      <div className="flex w-full flex-col gap-4 text-base">
        <div className="flex items-center justify-between">
          <Typography className="text-xl font-bold text-primary-color">
            {user?.name}
          </Typography>
          <CustomTag
            className={`text-[white] ${
              user?.isActive ? 'bg-success' : 'bg-grey-secondary-300'
            }`}
            content={user?.isActive ? 'Is Active' : 'Not Active'}
          />
        </div>
        <div>
          <Typography className="text-lg font-bold">Details</Typography>
          <DetailItem icon={SmsSVG} value={user?.email} toolTip="Email" />
          <DetailItem
            icon={CallSVG}
            value={user?.phoneNumber}
            toolTip="Phone Number"
          />
          <DetailItem
            icon={LocationSVG}
            value={user?.address}
            toolTip="Address"
          />
          <DetailItem
            icon={CalendarSVG}
            value={user?.createdAt}
            toolTip="Joined At"
          />
          <DetailItem icon={StarSVG} value={user?.role} toolTip="Role" />
          <DetailItem
            icon={CardSVG}
            value={user?.identityNumber}
            toolTip="Identity Number"
          />
          <DetailItem
            icon={MapSVG}
            value={user?.location?.name}
            toolTip="Location"
          />
          <DetailItem
            icon={BirthdaySVG}
            value={formatDate(user?.dateOfBirth, 'DD/MM/YYYY')}
            toolTip="Birthday"
          />
        </div>
      </div>
    </div>
  );
}

export default SideContent;
