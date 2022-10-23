import { EditSVG } from '#/assets/svgs';
import {
  UpsertLocationReservationInput,
  useGetLocationReservationQuery,
  useUpsertLocationReservationMutation,
} from '#/generated/schemas';
import Avatar from '#/shared/components/commons/Avatar';
import CustomTag from '#/shared/components/commons/CustomTag';
import { FormModal } from '#/shared/components/commons/FormModal';
import { showError, showSuccess } from '#/shared/utils/notification';
import { PageContainer } from '@ant-design/pro-layout';
import { Typography } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import LocationReservationForm from '../Form';
import { getLocationReservationStatusColor } from '../utils';
import PaymentRecords from './PaymentRecords';

function DisplayItem({
  name,
  value,
}: {
  name: string;
  value?: string | number | JSX.Element;
}) {
  return (
    <div className="grid grid-cols-2 items-center gap-2 text-base">
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

  const { data, refetch } = useGetLocationReservationQuery({
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

  return (
    <>
      <PageContainer title="Location Reservation Detail">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 rounded-xl bg-[white] p-4">
            <div className="flex justify-between">
              <Typography className="mb-4 text-lg font-bold">
                Location Reservation Information
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
                value={`${locationReservation?.totalCalculatedPrice?.toLocaleString()} $`}
              />
              <DisplayItem
                name="Total Received Price"
                value={`${locationReservation?.totalReceivedPrice?.toLocaleString()} $`}
              />
              <DisplayItem
                name="Start Month"
                value={dayjs(locationReservation?.startDate)?.format('MM/YYYY')}
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
              />
              <DisplayItem
                name="Created Date"
                value={dayjs(locationReservation?.startDate)?.format(
                  'DD/MM/YYYY hh:mm:A',
                )}
              />
            </div>
          </div>
          <PaymentRecords locationReservation={locationReservation} />
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
    </>
  );
}

export default Detail;
