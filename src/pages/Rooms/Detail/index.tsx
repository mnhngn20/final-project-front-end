import {
  UpsertRoomInput,
  useGetRoomQuery,
  useUpsertRoomMutation,
} from '#/generated/schemas';
import { FormModal } from '#/shared/components/commons/FormModal';
import DetailLayout from '#/shared/components/layout/DetailLayout';
import { showError, showSuccess } from '#/shared/utils/notification';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import RoomForm from '../Form';
import SideContent from './SideContent';
import MainContent from './MainContent';
import { Skeleton } from 'antd';

function Detail() {
  const { id } = useParams();
  const [editModalVisible, setEditModalVisible] = useState(false);

  const { data, loading, refetch } = useGetRoomQuery({
    variables: {
      id: Number(id),
    },
    skip: !id,
    onError: showError,
  });
  const room = data?.getRoom?.room;

  const [upsertRoom, { loading: upsertRoomLoading }] = useUpsertRoomMutation({
    onCompleted() {
      showSuccess('Updated room successfully!');
      setEditModalVisible(false);
      refetch();
    },
    onError: showError,
  });

  const onSubmit = ({ floor, ...values }: UpsertRoomInput) => {
    upsertRoom({
      variables: {
        input: {
          floor: Number(floor),
          ...values,
        },
      },
    });
  };

  return (
    <Skeleton loading={loading}>
      <DetailLayout
        loading={loading}
        title="Room Detail"
        mainContent={<SideContent room={room ?? {}} />}
        sideContent={<MainContent room={room ?? {}} />}
        onEdit={() => setEditModalVisible(true)}
      />
      <FormModal<UpsertRoomInput>
        loading={upsertRoomLoading}
        onSubmit={onSubmit}
        name="Room"
        onClose={() => setEditModalVisible(false)}
        selectedItem={editModalVisible ? { ...room } : undefined}
        initialValues={{ ...room }}
      >
        <RoomForm />
      </FormModal>
    </Skeleton>
  );
}

export default Detail;
