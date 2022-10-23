import { AddSVG } from '#/assets/svgs';
import {
  LocationReservation,
  Payment,
  refetchGetLocationReservationQuery,
  UpsertPaymentInput,
  useGetPaymentsQuery,
  useUpsertPaymentMutation,
} from '#/generated/schemas';
import { userVar } from '#/graphql/cache';
import PaymentForm from '#/pages/Payment/Form';
import { FormModal } from '#/shared/components/commons/FormModal';
import PaginationPanel from '#/shared/components/commons/PaginationPanel';
import { showSuccess } from '#/shared/utils/notification';
import { DeepPartial } from '#/shared/utils/type';
import { useReactiveVar } from '@apollo/client';
import { Col, Empty, Row, Tabs, Typography } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PaymentCard from './PaymentCard';

enum TabKey {
  CurrentPayment = 'Current Payment Record',
  UncreatedPayment = 'Uncreated Payment Record',
}

const { TabPane } = Tabs;

interface PaymentRecordsProps {
  locationReservation?: DeepPartial<LocationReservation> | null;
}

export default function PaymentRecords({
  locationReservation,
}: PaymentRecordsProps) {
  const currentUser = useReactiveVar(userVar);
  const [tabKey, setTabKey] = useState<string>(TabKey.CurrentPayment);
  const { id } = useParams();
  const [paymentCurrentPage, setPaymentCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<
    DeepPartial<Payment> | undefined
  >(undefined);
  const clearSelectedItem = () => setSelectedItem(undefined);

  const { data, refetch } = useGetPaymentsQuery({
    variables: {
      input: {
        locationReservationId: Number(locationReservation?.id),
        limit: 10,
        page: paymentCurrentPage,
      },
    },
    skip: !locationReservation?.id,
  });
  const payments = data?.getPayments?.items ?? [];

  const [upsertPayment, { loading: upsertPaymentLoading }] =
    useUpsertPaymentMutation({
      onCompleted() {
        showSuccess('Updated payment successfully!');
        clearSelectedItem();
        refetch();
      },
      refetchQueries: [refetchGetLocationReservationQuery({ id: Number(id) })],
    });

  const onSubmit = ({ ...values }: UpsertPaymentInput) => {
    upsertPayment({
      variables: {
        input: {
          ...values,
          locationReservationId: Number(id),
          locationId: Number(currentUser?.locationId),
        },
      },
    });
  };

  return (
    <>
      <div className="flex flex-col gap-4 rounded-xl bg-[white] p-4">
        <div className="flex justify-between">
          <Typography className="text-lg font-bold">Payment Records</Typography>
          <AddSVG
            width={24}
            height={24}
            className="cursor-pointer hover:text-primary-color"
          />
        </div>
        <div className="">
          <Tabs onChange={key => setTabKey(key)} activeKey={tabKey}>
            <TabPane
              key={TabKey.CurrentPayment}
              tabKey={TabKey.CurrentPayment}
              tab={TabKey.CurrentPayment}
            >
              <div className="flex flex-col gap-4">
                {payments?.[0] ? (
                  <Row gutter={[16, 16]}>
                    {payments?.map(payment => (
                      <Col
                        xs={24}
                        sm={24}
                        md={12}
                        lg={8}
                        xl={8}
                        key={payment?.id}
                      >
                        <PaymentCard
                          payment={payment}
                          onEdit={() => setSelectedItem({ ...payment })}
                        />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Empty />
                )}
                <PaginationPanel
                  current={paymentCurrentPage}
                  pageSize={10}
                  setCurrentPage={setPaymentCurrentPage}
                  total={data?.getPayments?.total ?? 0}
                />
              </div>
            </TabPane>
            <TabPane
              key={TabKey.UncreatedPayment}
              tabKey={TabKey.UncreatedPayment}
              tab={TabKey.UncreatedPayment}
            >
              s
            </TabPane>
          </Tabs>
        </div>
      </div>
      <FormModal<UpsertPaymentInput>
        loading={upsertPaymentLoading}
        onSubmit={onSubmit}
        name="Location"
        onClose={clearSelectedItem}
        selectedItem={selectedItem}
        initialValues={selectedItem}
      >
        <PaymentForm />
      </FormModal>
    </>
  );
}
