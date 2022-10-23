import { Room } from '#/generated/schemas';
import ImageCarousel from '#/shared/components/commons/ImageCarousel';
import { DeepPartial } from '#/shared/utils/type';
import { Tabs } from 'antd';
import { useState } from 'react';
import EquipmentList from '#/pages/Equipments/List';
import CustomerList from '#/pages/Customers/List';

const { TabPane } = Tabs;

enum TabKey {
  Owner = 'Onwer',
  Equipment = 'Equipment',
}
interface MainContentProps {
  room?: DeepPartial<Room>;
}

export default function MainContent({ room }: MainContentProps) {
  const [tabKey, setTabKey] = useState<string>(TabKey.Equipment);

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-[white] p-4">
      <ImageCarousel images={room?.images ? room?.images?.split(',') : []} />
      <Tabs activeKey={tabKey} onChange={activeKey => setTabKey(activeKey)}>
        <TabPane
          tab="Equipments"
          key={TabKey.Equipment}
          tabKey={TabKey.Equipment}
        >
          <EquipmentList roomId={Number(room?.id)} />
        </TabPane>
        <TabPane tab="Owners" key={TabKey.Owner} tabKey={TabKey.Owner}>
          <CustomerList roomId={Number(room?.id)} />
        </TabPane>
      </Tabs>
    </div>
  );
}
