import {
  UpdateUserInput,
  useGetUserQuery,
  useUpdateUserMutation,
} from '#/generated/schemas';
import { FormModal } from '#/shared/components/commons/FormModal';
import DetailLayout from '#/shared/components/layout/DetailLayout';
import { showError, showSuccess } from '#/shared/utils/notification';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import UserForm from '../Form';
import SideContent from './SideContent';

function Detail() {
  const { id } = useParams();
  const [editModalVisible, setEditModalVisible] = useState(false);

  const { data, loading, refetch } = useGetUserQuery({
    variables: {
      id: Number(id),
    },
    skip: !id,
    onError: showError,
  });
  const user = data?.getUser?.user;

  const [updateUser, { loading: updateUserLoading }] = useUpdateUserMutation({
    onCompleted() {
      showSuccess('Updated user successfully!');
      setEditModalVisible(false);
      refetch();
    },
    onError: showError,
  });

  const onSubmit = ({
    dateOfBirth,
    id,
    address,
    avatar,
    identityNumber,
    name,
    phoneNumber,
    roomId,
  }: UpdateUserInput) => {
    updateUser({
      variables: {
        input: {
          id,
          address,
          avatar,
          identityNumber,
          name,
          phoneNumber,
          roomId,
          ...(dateOfBirth && {
            dateOfBirth: dayjs.utc(dateOfBirth).startOf('date').toISOString(),
          }),
        },
      },
    });
  };

  return (
    <>
      <DetailLayout
        loading={loading}
        title="User Detail"
        mainContent={<SideContent user={user ?? {}} />}
        sideContent={<>User Table</>}
        onEdit={() => setEditModalVisible(true)}
      />
      <FormModal<UpdateUserInput>
        loading={updateUserLoading}
        onSubmit={onSubmit}
        name="Location"
        onClose={() => setEditModalVisible(false)}
        selectedItem={
          editModalVisible
            ? {
                ...user,
                ...(user?.dateOfBirth && {
                  dateOfBirth: dayjs(user?.dateOfBirth),
                }),
              }
            : undefined
        }
        initialValues={{
          ...user,
          ...(user?.dateOfBirth && {
            dateOfBirth: dayjs(user?.dateOfBirth),
          }),
        }}
        width="1000"
      >
        <UserForm />
      </FormModal>
    </>
  );
}

export default Detail;
