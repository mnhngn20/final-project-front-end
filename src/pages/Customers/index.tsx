import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { PageContainer } from '@ant-design/pro-layout';
import List from './List';

export default function Customers() {
  const { t } = useTypeSafeTranslation();

  return (
    <PageContainer
      fixedHeader
      header={{
        title: 'Manage Customers',
      }}
    >
      <List />
    </PageContainer>
  );
}
