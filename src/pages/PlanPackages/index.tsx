import { Typography, Tabs } from 'antd';
import { useState } from 'react';
import Packages from './Package';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

const { TabPane } = Tabs;

export enum PackageType {
  Month = 'Month',
  Year = 'Year',
}

function PlanPackages() {
  const [tabKey, setTabKey] = useState<string>(PackageType.Month);
  const { t } = useTypeSafeTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Typography className="font-dm-serif-display text-[2.5rem]">
        {t('planPackages.title')}
      </Typography>
      <Typography className="mb-4 text-xl text-grey-secondary-300">
        {t('planPackages.description')}
      </Typography>
      <Tabs activeKey={tabKey} onChange={setTabKey}>
        <TabPane
          key={PackageType.Month}
          tabKey={PackageType.Month}
          tab={t('values.monthly')}
        />
        <TabPane
          key={PackageType.Year}
          tabKey={PackageType.Year}
          tab={t('values.yearly')}
        />
      </Tabs>
      <div className="mt-8 grid w-full grid-cols-12 gap-8">
        <div className="col-span-4 md:col-span-12">
          <Packages
            title="Free wishes"
            benefits={[
              'Personal Informations',
              'Trusted Contacts',
              'Funeral Plans',
            ]}
            packageType={PackageType.Month}
            price={0}
            isDefaultPackage
          />
        </div>
        <div className="col-span-4 md:col-span-12">
          <Packages
            title="Customize above wishes"
            benefits={[
              'Personal Informations',
              'Trusted Contacts',
              'Funeral Plans',
              'Personal Documents',
            ]}
            packageType={PackageType.Month}
            price={125}
            isRegistered
          />
        </div>
        <div className="col-span-4 md:col-span-12">
          <Packages
            title="Memories and wills"
            benefits={[
              'Personal Informations',
              'Trusted Contacts',
              'Funeral Plans',
              'Personal Documents',
              'Personal Accounts',
              'Memories',
            ]}
            packageType={PackageType.Month}
            price={140}
          />
        </div>
      </div>
    </div>
  );
}

export default PlanPackages;
