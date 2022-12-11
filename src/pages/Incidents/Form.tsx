import { Checkbox, Divider, Form, Input } from 'antd';
import { Incident, UserRole } from '#/generated/schemas';
import { DatePicker } from '#/shared/components/commons/DatePicker';
import RoomSelector from '#/shared/components/selectors/RoomSelector';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '#/graphql/cache';
import IncidentCategorySelector from '#/shared/components/selectors/IncidentCategorySelector';
import UploadImages from '#/shared/components/commons/UploadImages';
import UserSelector from '#/shared/components/selectors/UserSelector';
import IncidentPrioritySelector from '#/shared/components/selectors/IncidentPrioritySelector';

interface Props {
  initialValues?: Incident;
}

function IncidentForm({ initialValues }: Props) {
  const currentUser = useReactiveVar(userVar);

  return (
    <>
      <Form.Item label="Room" name="roomId" rules={[{ required: true }]}>
        <RoomSelector
          placeholder="Select Room"
          variables={{
            input: {
              locationId: Number(currentUser?.locationId),
            },
          }}
          initValues={initialValues?.room ? [initialValues?.room] : []}
          disabled={!!initialValues?.fromCustomer}
        />
      </Form.Item>
      <Form.Item
        name="reporterId"
        label="Reported By"
        rules={[{ required: true }]}
      >
        <UserSelector
          placeholder="Select reporter"
          variables={{
            input: {
              role: UserRole.Customer,
              locationId: Number(currentUser?.locationId),
              isActive: true,
            },
          }}
          disabled={!!initialValues?.fromCustomer}
        />
      </Form.Item>
      <Form.Item name="fromCustomer" valuePropName="checked">
        <Checkbox disabled={!!initialValues?.fromCustomer}>
          Reported By Customer
        </Checkbox>
      </Form.Item>
      <Divider />
      <Form.Item
        name="incidentCategoryId"
        label="Incident Type"
        rules={[{ required: true }]}
      >
        <IncidentCategorySelector
          placeholder="Select incident type"
          initValues={
            initialValues?.incidentCategory
              ? [initialValues?.incidentCategory]
              : []
          }
          disabled={!!initialValues?.fromCustomer}
        />
      </Form.Item>
      <Form.Item
        name="title"
        label="Priority Title"
        rules={[{ required: true, whitespace: true }]}
      >
        <Input
          placeholder="Enter priority title"
          disabled={!!initialValues?.fromCustomer}
        />
      </Form.Item>
      <Form.Item name="dueDate" label="Due Date">
        <DatePicker
          disabled={!!initialValues?.fromCustomer}
          placeholder="Select due date"
          className="w-full"
        />
      </Form.Item>
      <Form.Item
        name="description"
        label="Priority Description"
        rules={[{ whitespace: true }]}
      >
        <Input.TextArea
          rows={3}
          placeholder="Enter priority description"
          disabled={!!initialValues?.fromCustomer}
        />
      </Form.Item>
      <Form.Item name="images" label="Images Attached" valuePropName="srcList">
        <UploadImages disabled={!!initialValues?.fromCustomer} />
      </Form.Item>
      {initialValues?.id && (
        <>
          <Divider />
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true }]}
          >
            <IncidentPrioritySelector
              placeholder="Select incident priority"
              disabled={
                !initialValues.employeeId ||
                Number(currentUser?.id) !== Number(initialValues.employeeId)
              }
            />
          </Form.Item>
          <Form.Item name="employeeId" label="Employee In Charge">
            <UserSelector
              placeholder="Select employee to in charge"
              variables={{
                input: {
                  role: UserRole.Admin,
                  locationId: Number(currentUser?.locationId),
                  isActive: true,
                },
              }}
            />
          </Form.Item>
          <Form.Item name="reportMessage" label="Report Message">
            <Input.TextArea
              placeholder="Enter report message"
              className="w-full"
              disabled={
                !initialValues.employeeId ||
                Number(currentUser?.id) !== Number(initialValues.employeeId)
              }
            />
          </Form.Item>
          <Form.Item
            name="reportImages"
            label="Report Images"
            valuePropName="srcList"
          >
            <UploadImages
              disabled={
                !initialValues.employeeId ||
                Number(currentUser?.id) !== Number(initialValues.employeeId)
              }
            />
          </Form.Item>
        </>
      )}
    </>
  );
}

export default IncidentForm;
