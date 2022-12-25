import { User } from '#/generated/schemas';
import { DeepPartial } from '#/shared/utils/type';
import { Tabs } from 'antd';
import { useState } from 'react';
import TransactionList from '#/pages/Transactions/List';
import PaymentList from '#/pages/Payments/List';

const { TabPane } = Tabs;

enum TabKey {
  Transaction = 'Transaction',
  Payment = 'Payment',
}
interface MainContentProps {
  user?: DeepPartial<User>;
}

export default function MainContent({ user }: MainContentProps) {
  const [tabKey, setTabKey] = useState<string>(TabKey.Transaction);

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-[white] p-4">
      <Tabs activeKey={tabKey} onChange={activeKey => setTabKey(activeKey)}>
        <TabPane
          tab="Transaction History"
          key={TabKey.Transaction}
          tabKey={TabKey.Transaction}
        >
          <TransactionList userId={Number(user?.id)} />
        </TabPane>
        <TabPane
          tab="Payment List"
          key={TabKey.Payment}
          tabKey={TabKey.Payment}
        >
          <PaymentList userId={Number(user?.id)} />
        </TabPane>
      </Tabs>
    </div>
  );
}
