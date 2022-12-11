import { AddSVG, WalletMoneyOutlineSVG } from '#/assets/svgs';
import {
  LocationReservation,
  LocationReservationStatus,
  Payment,
  PaymentStatus,
  refetchGetLocationReservationQuery,
  refetchMeQuery,
  UpdatePaymentsInput,
  UpsertPaymentInput,
  useGetPaymentsQuery,
  useManuallyPayMutation,
  useUpdatePaymentsMutation,
  useUpsertPaymentMutation,
} from '#/generated/schemas';
import { userVar } from '#/graphql/cache';
import AllPaymentForm from '#/pages/Payments/AllPaymentForm';
import PaymentForm from '#/pages/Payments/Form';
import { FormModal } from '#/shared/components/commons/FormModal';
import PaginationPanel from '#/shared/components/commons/PaginationPanel';
import PaymentStatusSelector from '#/shared/components/selectors/PaymentStatusSelector';
import { showError, showSuccess } from '#/shared/utils/notification';
import { DeepPartial } from '#/shared/utils/type';
import { useReactiveVar } from '@apollo/client';
import { Col, Divider, Empty, Row, Spin, Tooltip, Typography } from 'antd';
import { useState, forwardRef, useImperativeHandle } from 'react';
import { useParams } from 'react-router-dom';
import FloorSelector from './FloorSelector';
import PaymentCard from './PaymentCard';

interface PaymentRecordsProps {
  locationReservation?: DeepPartial<LocationReservation> | null;
}
export interface PaymentRecordsRef {
  refetchPayment: () => void;
}

export type SelectedPayment = DeepPartial<Payment> & {
  userIds?: string[];
};

// eslint-disable-next-line react/display-name
const PaymentRecords = forwardRef<PaymentRecordsRef, PaymentRecordsProps>(
  ({ locationReservation }, ref) => {
    const currentUser = useReactiveVar(userVar);
    const { id } = useParams();
    const [floor, setFloor] = useState<number | undefined>(1);
    const [status, setStatus] = useState<PaymentStatus | undefined>(undefined);
    const [paymentCurrentPage, setPaymentCurrentPage] = useState(1);
    const [selectedItem, setSelectedItem] = useState<
      SelectedPayment | undefined
    >(undefined);
    const [editAllPaymentVisible, setEditAllPaymentVisible] = useState(false);
    const clearSelectedItem = () => setSelectedItem(undefined);

    const { data, refetch, loading } = useGetPaymentsQuery({
      variables: {
        input: {
          locationReservationId: Number(locationReservation?.id),
          limit: 5,
          page: paymentCurrentPage,
          ...(floor && {
            floor,
          }),
          ...(status && { status }),
        },
      },
      skip: !locationReservation?.id,
    });
    const payments = data?.getPayments?.items ?? [];

    useImperativeHandle(ref, () => ({ refetchPayment: refetch }), [refetch]);

    const [upsertPayment, { loading: upsertPaymentLoading }] =
      useUpsertPaymentMutation({
        onCompleted() {
          showSuccess('Updated payment successfully!');
          clearSelectedItem();
          refetch();
        },
        onError: showError,
        refetchQueries: [
          refetchGetLocationReservationQuery({ id: Number(id) }),
        ],
      });

    const onSubmit = ({ roomId, userIds, ...values }: UpsertPaymentInput) => {
      upsertPayment({
        variables: {
          input: {
            ...values,
            userIds: userIds?.map(id => Number(id)),
            roomId: Number(roomId),
            locationReservationId: Number(id),
            locationId: Number(currentUser?.locationId),
          },
        },
      });
    };

    const [updatePayments, { loading: updatePaymentsLoading }] =
      useUpdatePaymentsMutation({
        onCompleted() {
          showSuccess('Update payments successfully!');
          setEditAllPaymentVisible(false);
          refetch();
        },
        onError: showError,

        refetchQueries: [
          refetchGetLocationReservationQuery({ id: Number(id) }),
        ],
      });

    const onEditAllPayment = ({ ...values }: UpdatePaymentsInput) => {
      updatePayments({
        variables: {
          input: {
            locationReservationId: Number(id),
            ...values,
          },
        },
      });
    };

    const [manuallyPay] = useManuallyPayMutation({
      onCompleted() {
        showSuccess('Paid sucessfully!');
        refetch();
      },
      onError: showError,
      refetchQueries: [
        refetchGetLocationReservationQuery({ id: Number(id) }),
        refetchMeQuery(),
      ],
    });

    return (
      <>
        <div className="flex flex-col gap-4 rounded-xl bg-[white] p-4">
          <div className="flex justify-between">
            <Typography className="text-lg font-bold">
              Payment Records
            </Typography>
            <div className="flex items-center gap-2">
              <Tooltip title="Calculate for all record">
                <WalletMoneyOutlineSVG
                  onClick={() => setEditAllPaymentVisible(true)}
                  className="cursor-pointer hover:text-primary-color"
                />
              </Tooltip>
              <Tooltip title="New Payment Record">
                <AddSVG
                  width={24}
                  height={24}
                  onClick={() => setSelectedItem({})}
                  className="cursor-pointer hover:text-primary-color"
                />
              </Tooltip>
            </div>
          </div>
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-4">
              <Typography>Select Floor</Typography>
              <FloorSelector
                value={floor}
                onChange={setFloor}
                numOfFloor={currentUser?.location?.numOfFloor ?? 1}
              />
            </div>
            <div className="flex items-center gap-4">
              <Typography>Filter by Status</Typography>
              <PaymentStatusSelector
                className="w-[20rem]"
                allowClear
                onChange={setStatus}
                placeholder="Select Payment Status"
              />
            </div>
          </div>

          <Divider className="m-0" />
          <div className="">
            <div className="flex flex-col gap-4">
              {loading ? (
                <div className="flex h-full w-full items-center justify-center p-4">
                  <Spin />
                </div>
              ) : payments?.[0] ? (
                <Row gutter={[16, 16]}>
                  {payments?.map(payment => (
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      xl={24}
                      key={payment?.id}
                    >
                      <PaymentCard
                        payment={payment}
                        onEdit={() =>
                          setSelectedItem({
                            ...payment,
                            userIds: payment?.users?.map(user => user?.id),
                          })
                        }
                        onManuallyPay={id =>
                          manuallyPay({
                            variables: {
                              id,
                            },
                          })
                        }
                        editable={
                          locationReservation?.status ===
                          LocationReservationStatus.Draft
                        }
                      />
                    </Col>
                  ))}
                </Row>
              ) : (
                <Empty description="No Payment Data" />
              )}

              <PaginationPanel
                current={paymentCurrentPage}
                pageSize={5}
                setCurrentPage={setPaymentCurrentPage}
                total={data?.getPayments?.total ?? 0}
              />
            </div>
          </div>
        </div>
        <FormModal<UpsertPaymentInput>
          loading={updatePaymentsLoading}
          onSubmit={onEditAllPayment}
          name="Edit All payment Record"
          onClose={() => setEditAllPaymentVisible(false)}
          selectedItem={editAllPaymentVisible ? {} : undefined}
          initialValues={editAllPaymentVisible ? {} : undefined}
        >
          <AllPaymentForm />
        </FormModal>
        <FormModal<UpsertPaymentInput>
          loading={upsertPaymentLoading}
          onSubmit={onSubmit}
          name="Payment"
          onClose={clearSelectedItem}
          selectedItem={selectedItem}
          initialValues={selectedItem}
        >
          <PaymentForm />
        </FormModal>
      </>
    );
  },
);

export default PaymentRecords;
