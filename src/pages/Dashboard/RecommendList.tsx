import { Button, Typography } from 'antd';
import RecommendCard from './RecommendCard';
import SearchInput from './SearchInput';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

function Empty() {
  const { t } = useTypeSafeTranslation();

  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-3xl bg-[white] p-16 shadow-card">
      <Typography className="text-2xl font-semibold">
        {t('dashboard.recommendToYourFamily')}
      </Typography>
      <Typography className="text-base text-grey-secondary-300">
        {t('dashboard.recommendToYourFamilyDescription')}
      </Typography>
      <Button type="default" className="mt-6">
        {t('button.suggest')}
      </Button>
    </div>
  );
}

function RecommendList() {
  const { t } = useTypeSafeTranslation();

  const recommendList = [
    {
      email: 'mnhngn20@gmail.com',
      id: 1,
      name: 'Minh Nguyen',
      progress: 30,
      status: 'Draft',
      type: 'Advance',
    },
    {
      email: 'mnhngn20@gmail.com',
      id: 2,
      name: 'Phat Nguyen',
      progress: 80,
      status: 'Draft',
      type: 'Advance',
    },
    {
      email: 'mnhngn20@gmail.com',
      id: 3,
      name: 'Nhan Duc',
      progress: 45,
      status: 'Draft',
      type: 'Advance',
    },
    {
      email: 'mnhngn20@gmail.com',
      id: 4,
      name: 'Duc Thuan',
      progress: 100,
      status: 'Draft',
      type: 'Advance',
    },
  ];

  return recommendList?.[0] ? (
    <div className="mt-20 flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between">
        <Typography className="text-3xl font-semibold text-grey-secondary-300">
          {t('dashboard.myFamilyMembers')} ({recommendList?.length})
        </Typography>
        <div className="flex items-center gap-6">
          <SearchInput />
          <Button>{t('button.suggest')}</Button>
        </div>
      </div>
      <div className="grid w-full grid-cols-12 gap-4">
        {recommendList?.map(item => (
          <div className="col-span-6 lg:col-span-12" key={item.id}>
            <RecommendCard
              id={item.id}
              email={item.email}
              name={item.name}
              status={item.status}
              progress={item.progress}
              type={item?.type}
            />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Empty />
  );
}

export default RecommendList;
