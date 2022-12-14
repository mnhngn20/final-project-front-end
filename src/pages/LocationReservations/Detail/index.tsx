import { EditSVG } from '#/assets/svgs';
import {
  LocationReservationStatus,
  refetchGetLocationReservationQuery,
  UpsertLocationReservationInput,
  useChangeLocationReservationStatusMutation,
  useGetLocationReservationQuery,
  useUpsertLocationReservationMutation,
} from '#/generated/schemas';
import Avatar from '#/shared/components/commons/Avatar';
import CustomTag from '#/shared/components/commons/CustomTag';
import { FormModal } from '#/shared/components/commons/FormModal';
import { showError, showSuccess } from '#/shared/utils/notification';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Modal, Skeleton, Typography } from 'antd';
import dayjs from 'dayjs';
import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LocationReservationForm from '../Form';
import { getLocationReservationStatusColor } from '../utils';
import PaymentRecords, { PaymentRecordsRef } from './PaymentRecords';

function DisplayItem({
  name,
  value,
  onClick,
}: {
  name: string;
  value?: string | number | JSX.Element;
  onClick?: () => void;
}) {
  return (
    <div
      className="grid cursor-pointer grid-cols-2 items-center gap-2 text-base"
      onClick={onClick}
    >
      <Typography className="col-span-1 text-base">{name}</Typography>
      <Typography className="col-span-1 text-primary-color">
        {value ?? 'N/A'}
      </Typography>
    </div>
  );
}

function Detail() {
  const { id } = useParams();
  const [editInfoModalVisible, setEditInfoModalVisible] = useState(false);
  const paymentRecordsRef = useRef<PaymentRecordsRef>(null);
  const navigate = useNavigate();

  const {
    data,
    refetch,
    loading: getLocationReservationLoading,
  } = useGetLocationReservationQuery({
    variables: {
      id: Number(id),
    },
    skip: !id,
    onError: showError,
  });
  const locationReservation = data?.getLocationReservation?.locationReservation;

  const [
    upsertLocationReservation,
    { loading: upsertLocationReservationLoading },
  ] = useUpsertLocationReservationMutation({
    onCompleted() {
      showSuccess('Updated location reservation successfully!');
      setEditInfoModalVisible(false);
      refetch();
    },
    onError: showError,
  });

  const [changeLocationReservationStatus, { loading }] =
    useChangeLocationReservationStatusMutation({
      onCompleted(data) {
        paymentRecordsRef?.current?.refetchPayment();
        showSuccess(
          data?.changeLocationReservationStatus?.locationReservation?.status ===
            LocationReservationStatus.Published
            ? 'Published Location Reservation'
            : 'Saved Location Reservation as draft',
        );
      },
      onError: showError,
      refetchQueries: [refetchGetLocationReservationQuery({ id: Number(id) })],
    });

  const onSubmit = ({
    createdById,
    locationId,
    startDate,
    id,
  }: UpsertLocationReservationInput) => {
    upsertLocationReservation({
      variables: {
        input: {
          createdById: Number(createdById),
          locationId: Number(locationId),
          startDate: dayjs.utc(startDate).startOf('date').toISOString(),
          id: Number(id),
        },
      },
    });
  };

  const onChangeLocationReservationStatus = (
    status: LocationReservationStatus,
  ) => {
    locationReservation?.id &&
      changeLocationReservationStatus({
        variables: {
          input: {
            status,
            locationReservationId: Number(locationReservation?.id),
          },
        },
      });
  };

  return (
    <Skeleton
      loading={
        getLocationReservationLoading || upsertLocationReservationLoading
      }
    >
      <PageContainer title="Location Reservation Detail">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 rounded-xl bg-[white] p-4">
            <div className="flex justify-between">
              <Typography className="mb-4 text-lg font-bold">
                Reservation Information
              </Typography>
              <EditSVG
                width={24}
                height={24}
                onClick={() => setEditInfoModalVisible(true)}
                className="cursor-pointer hover:text-primary-color"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <DisplayItem
                name="Location Name"
                value={locationReservation?.location?.name}
              />
              <DisplayItem
                name="Status"
                value={
                  <CustomTag
                    content={locationReservation?.status}
                    className={getLocationReservationStatusColor(
                      locationReservation?.status,
                    )}
                  />
                }
              />
              <DisplayItem
                name="Total Calculated Price"
                value={`${locationReservation?.totalCalculatedPrice?.toLocaleString()} VND`}
              />
              <DisplayItem
                name="Total Received Price"
                value={`${locationReservation?.totalReceivedPrice?.toLocaleString()} VND`}
              />
              <DisplayItem
                name="Start Month"
                value={dayjs(locationReservation?.startDate)?.format(
                  'MMM YYYY',
                )}
              />
              <DisplayItem
                name="Employee In Charge"
                value={
                  <div className="flex items-center gap-2">
                    <div className="mr-2 leading-none">
                      <Avatar
                        src={locationReservation?.createdBy?.avatar}
                        size={40}
                      />
                    </div>
                    <div>
                      <Typography className="font-semibold text-primary-color">
                        {locationReservation?.createdBy?.name}
                      </Typography>
                      <Typography className="m-0 text-xs leading-snug">
                        {locationReservation?.createdBy?.email}
                      </Typography>
                    </div>
                  </div>
                }
                onClick={() =>
                  navigate(`/customers/${locationReservation?.createdBy?.id}`)
                }
              />
              <DisplayItem
                name="Created Date"
                value={dayjs(locationReservation?.startDate)?.format(
                  'hh:mm A, DD MMM YYYY',
                )}
              />
              <DisplayItem
                name="Updated Date"
                value={dayjs(locationReservation?.startDate)?.format(
                  'hh:mm A, DD MMM YYYY',
                )}
              />
            </div>
          </div>
          <PaymentRecords
            ref={paymentRecordsRef}
            locationReservation={locationReservation}
          />

          {locationReservation?.status !==
            LocationReservationStatus?.Completed && (
            <div className="flex items-center justify-end gap-2">
              <Button
                loading={loading}
                onClick={() => {
                  Modal.warning({
                    centered: true,
                    closable: true,
                    maskClosable: true,
                    title: 'Are you sure to change this Reservation to Draft?',
                    okText: 'Agree',
                    onOk: () => {
                      onChangeLocationReservationStatus(
                        LocationReservationStatus.Draft,
                      );
                    },
                  });
                }}
                disabled={
                  locationReservation?.status ===
                  LocationReservationStatus.Draft
                }
              >
                Save as Draft
              </Button>
              <Button
                type="primary"
                loading={loading}
                onClick={() => {
                  Modal.warning({
                    centered: true,
                    closable: true,
                    maskClosable: true,
                    title: 'Are you sure to publish this Reservation?',
                    okText: 'Agree',
                    onOk: () => {
                      onChangeLocationReservationStatus(
                        LocationReservationStatus.Published,
                      );
                    },
                  });
                }}
                disabled={
                  locationReservation?.status ===
                  LocationReservationStatus.Published
                }
              >
                Save and Publish
              </Button>
            </div>
          )}
        </div>
      </PageContainer>
      <FormModal<UpsertLocationReservationInput>
        loading={upsertLocationReservationLoading}
        onSubmit={onSubmit}
        name="Location Reservation"
        onClose={() => setEditInfoModalVisible(false)}
        selectedItem={
          editInfoModalVisible
            ? {
                ...locationReservation,
                startDate: dayjs(locationReservation?.startDate),
              }
            : undefined
        }
        initialValues={{
          ...locationReservation,
          startDate: dayjs(locationReservation?.startDate),
        }}
      >
        <LocationReservationForm />
      </FormModal>
    </Skeleton>
  );
}

export default Detail;
