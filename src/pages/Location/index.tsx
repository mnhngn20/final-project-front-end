import {
  UpsertLocationInput,
  useGetLocationQuery,
  useUpsertLocationMutation,
} from '#/generated/schemas';
import { userVar } from '#/graphql/cache';
import { FormModal } from '#/shared/components/commons/FormModal';
import DetailLayout from '#/shared/components/layout/DetailLayout';
import { showError, showSuccess } from '#/shared/utils/notification';
import { Coordinates } from '#/shared/utils/type';
import { useReactiveVar } from '@apollo/client';
import { Skeleton } from 'antd';
import { useState } from 'react';
import LocationForm from './Form';
import MainContent from './MainContent';
import SideContent from './SideContent';

function Detail() {
  const currentUser = useReactiveVar(userVar);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const { data, loading, refetch } = useGetLocationQuery({
    variables: {
      id: Number(currentUser?.locationId),
    },
    skip: !currentUser?.locationId,
    onError: showError,
    fetchPolicy: 'network-only',
  });
  const location = data?.getLocation?.location;

  const [upsertLocation, { loading: upsertLocationLoading }] =
    useUpsertLocationMutation({
      onCompleted() {
        showSuccess('Updated location successfully!');
        setEditModalVisible(false);
        refetch();
      },
      onError: showError,
    });

  const onSubmit = ({
    coordinates,
    contactInformations,
    locationServiceIds,
    ...values
  }: UpsertLocationInput & {
    coordinates: Coordinates;
  }) => {
    upsertLocation({
      variables: {
        input: {
          ...values,
          contactInformations: contactInformations?.map(item => ({
            ...item,
            ...(item?.id && { id: Number(item?.id) }),
          })),
          locationServiceIds: locationServiceIds?.map(id => Number(id)),
          lat: coordinates?.lat,
          long: coordinates?.long,
        },
      },
    });
  };

  return (
    <Skeleton loading={loading}>
      <DetailLayout
        loading={loading}
        title="Manage Location"
        mainContent={<SideContent location={location ?? {}} />}
        sideContent={<MainContent location={location ?? {}} />}
        onEdit={() => setEditModalVisible(true)}
      />
      <FormModal<
        UpsertLocationInput & {
          coordinates: Coordinates;
        }
      >
        loading={upsertLocationLoading}
        onSubmit={onSubmit}
        name="Location"
        onClose={() => setEditModalVisible(false)}
        selectedItem={
          editModalVisible
            ? {
                ...location,
                locationServiceIds: location?.locationServices?.map(
                  service => service?.id,
                ),
              }
            : undefined
        }
        initialValues={{
          ...location,
          locationServiceIds: location?.locationServices?.map(
            service => service?.id,
          ),
        }}
      >
        <LocationForm />
      </FormModal>
    </Skeleton>
  );
}

export default Detail;
