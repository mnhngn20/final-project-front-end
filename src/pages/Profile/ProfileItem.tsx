import { Typography } from 'antd';
import Icon from '@ant-design/icons';
import { ComponentType, SVGProps } from 'react';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { TranslationKeys } from '#/generated/translationKeys';

interface ProfileItemProps {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  item?: string | null;
  translation: TranslationKeys;
}

const { Title, Text } = Typography;

function ProfileItem({ icon, item, translation }: ProfileItemProps) {
  const { t } = useTypeSafeTranslation();
  return (
    <Typography className="flex items-center">
      <Title level={5} className="my-3">
        <Icon component={icon} />
      </Title>
      <Text className="ml-2 text-base">{item ?? t(translation)}</Text>
    </Typography>
  );
}

export default ProfileItem;
