import Icon from '@ant-design/icons';
import { Avatar, Typography } from 'antd';
import DefaultAvatar from '#/assets/images/avatar.png';
import { StarSVG } from '#/assets/svgs';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '#/graphql/cache';

const { Title, Text } = Typography;

function ProfileHeader() {
  const user = useReactiveVar(userVar);

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 rounded-tl-xl rounded-bl-xl bg-grey-primary py-[3.15rem] px-20 xlg:w-full xlg:rounded-tr-xl xlg:rounded-bl-none">
        <Avatar size={200} src={user.avatar ?? DefaultAvatar} />
        <Title level={3} className="text-center">
          {user.name}
        </Title>
      </div>
      <div className="absolute top-0 left-0 m-4 h-8 rounded-full bg-info-light px-3">
        <Typography className="flex items-center">
          <Title level={5} className="my-1">
            <Icon component={StarSVG} />
          </Title>
          <Text className="ml-2 text-sm text-info">{user.role}</Text>
        </Typography>
      </div>
    </div>
  );
}

export default ProfileHeader;
