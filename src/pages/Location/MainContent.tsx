import { Location } from '#/generated/schemas';
import ImageCarousel from '#/shared/components/commons/ImageCarousel';
import { DeepPartial } from '#/shared/utils/type';
import LocationReservationList from '#/pages/LocationReservations/List';
import { Tabs } from 'antd';
import { useState } from 'react';

const { TabPane } = Tabs;

enum TabKey {
  LocationReservations = 'LocationReservations',
}

interface MainContentProps {
  location?: DeepPartial<Location> | null;
}

export default function MainContent({ location }: MainContentProps) {
  const [tabKey, setTabKey] = useState<string>(TabKey.LocationReservations);

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-[white] p-4">
      <ImageCarousel
        images={location?.images ? location?.images?.split(',') : []}
      />
      <Tabs activeKey={tabKey} onChange={activeKey => setTabKey(activeKey)}>
        <TabPane
          tab="Location Reservations"
          tabKey={TabKey.LocationReservations}
          key={TabKey.LocationReservations}
        >
          <LocationReservationList />
        </TabPane>
      </Tabs>
    </div>
  );
}
