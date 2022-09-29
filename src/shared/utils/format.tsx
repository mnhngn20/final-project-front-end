import { Scalars, User } from '#/generated/schemas';
import { Tag, Tooltip, Typography } from 'antd';
import { Link } from 'react-router-dom';
import Image from '../components/commons/Image';
import Info from '../components/commons/Info';
import { DeepPartial } from './type';

export const formatId = (id: number) => (
  <Tooltip placement="right" title={id}>
    <Typography.Text className="font-bold text-primary-color">{`#${id}`}</Typography.Text>
  </Tooltip>
);

export const formatDisplayUser = (user: DeepPartial<User>) => (
  <Link to={`/users/${user?.id}`}>
    <Info avatar={user?.avatar} fullName={user?.name} email={user?.email} />
  </Link>
);

export const formatDisplayName = (
  name: string,
  resource?: string,
  id?: string,
) =>
  resource ? (
    <Link to={`/${resource}/${id}`}>
      <strong className="text-primary-color">{name ?? 'N/A'}</strong>
    </Link>
  ) : (
    <strong className="text-primary-color">{name ?? 'N/A'}</strong>
  );

export const formatDisplayImage = (image: Scalars['String']) => (
  <Image width={150} height={90} url={image?.split(',')?.[0]} />
);

export const formatDisplayPrice = (price: string) => (
  <Typography className="m-0">{`${price} VND`}</Typography>
);

export const formatDisplayLocation = (name?: string) =>
  name ? (
    <Typography className="m-0 inline">{name}</Typography>
  ) : (
    <Tag color="var(--info-color)">From System</Tag>
  );
