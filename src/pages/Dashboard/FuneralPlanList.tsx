import { Button, Typography } from 'antd';
import { AddSVG, EmptySVG } from '#/assets/svgs';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

function Empty() {
  const { t } = useTypeSafeTranslation();

  return (
    <>
      <Typography className="text-base text-grey-secondary-300">
        {t('dashboard.myFuneralPlansDescription')}
      </Typography>
      <EmptySVG className="my-4" />
      <Button type="primary" icon={<AddSVG className="anticon" />}>
        {t('button.createPlan')}
      </Button>
    </>
  );
}

function FuneralPlanList() {
  const { t } = useTypeSafeTranslation();

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl bg-[white] p-16 shadow-card">
      <Typography className="text-[2.5rem] font-semibold">
        {t('dashboard.myFuneralPlans')}
      </Typography>
      <Empty />
    </div>
  );
}

export default FuneralPlanList;
