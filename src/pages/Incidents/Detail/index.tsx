import {
  UpsertIncidentInput,
  useGetIncidentQuery,
  useUpsertIncidentMutation,
} from '#/generated/schemas';
import { userVar } from '#/graphql/cache';
import { FormModal } from '#/shared/components/commons/FormModal';
import { showError, showSuccess } from '#/shared/utils/notification';
import { PageContainer } from '@ant-design/pro-layout';
import { useReactiveVar } from '@apollo/client';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import IncidentForm from '../Form';
import IncidentDetail from './IncidentDetail';
import IncidentEmployee from './IncidentEmployee';

function Detail() {
  const currentUser = useReactiveVar(userVar);
  const { id } = useParams();
  const [editModalVisible, setEditModalVisible] = useState(false);

  const { data, refetch } = useGetIncidentQuery({
    variables: {
      id: Number(id),
    },
    skip: !id,
    onError: showError,
  });
  const incident = data?.getIncident?.incident;

  const [upsertIncident, { loading: upsertIncidentLoading }] =
    useUpsertIncidentMutation({
      onCompleted() {
        showSuccess('Updated incident successfully!');
        setEditModalVisible(false);
        refetch();
      },
      onError: showError,
    });

  const onSubmit = ({
    incidentCategoryId,
    reporterId,
    employeeId,
    roomId,
    dueDate,
    id,
    ...rest
  }: UpsertIncidentInput) => {
    upsertIncident({
      variables: {
        input: {
          ...(id && { id: Number(id) }),
          ...(incidentCategoryId && {
            incidentCategoryId: Number(incidentCategoryId),
          }),
          ...(reporterId && { reporterId: Number(reporterId) }),
          ...(employeeId && { employeeId: Number(employeeId) }),
          ...(roomId && { roomId: Number(roomId) }),
          ...(dueDate && {
            dueDate: dayjs.utc(dueDate).startOf('date').toISOString(),
          }),
          ...rest,
          locationId: Number(currentUser?.locationId),
        },
      },
    });
  };

  return (
    <>
      <PageContainer title="Incident Detail">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
          <IncidentDetail
            incident={incident ?? {}}
            setEditModalVisible={setEditModalVisible}
          />
          <IncidentEmployee
            incident={incident ?? {}}
            setEditModalVisible={setEditModalVisible}
          />
        </div>
      </PageContainer>
      <FormModal<UpsertIncidentInput>
        loading={upsertIncidentLoading}
        onSubmit={onSubmit}
        name="User"
        onClose={() => setEditModalVisible(false)}
        selectedItem={
          editModalVisible
            ? {
                ...incident,
                ...(incident?.dueDate && {
                  dueDate: dayjs(incident?.dueDate),
                }),
              }
            : undefined
        }
        initialValues={{
          ...incident,
          ...(incident?.dueDate && {
            dueDate: dayjs(incident?.dueDate),
          }),
        }}
      >
        <IncidentForm />
      </FormModal>
    </>
  );
}

export default Detail;
