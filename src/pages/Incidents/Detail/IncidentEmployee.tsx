import { CalendarSVG, GalleryAddFilledSVG } from '#/assets/svgs';
import {
  Incident,
  IncidentStatus,
  refetchGetIncidentQuery,
  UpdateIncidentForEmployeeInput,
  useUpdateIncidentForEmployeeMutation,
} from '#/generated/schemas';
import Gallery from '#/shared/components/commons/Gallery';
import { formatDate } from '#/shared/utils/date';
import { showError, showSuccess } from '#/shared/utils/notification';
import { DeepPartial } from '#/shared/utils/type';
import { Button, Divider, Empty, Form, Input, Tooltip, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import IncidentStatusSelector from './IncidentStatusSelector';
import { Skeleton } from 'antd';
import UploadImages from '#/shared/components/commons/UploadImages';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '#/graphql/cache';
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import EmployeeSelector from '#/shared/components/selectors/EmployeeSelector';

interface IncidentEmployeeProps {
  incident?: DeepPartial<Incident>;
  setEditModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function IncidentEmployee({ incident }: IncidentEmployeeProps) {
  const { id } = useParams();
  const [updateIncident, { loading }] = useUpdateIncidentForEmployeeMutation({
    refetchQueries: [refetchGetIncidentQuery({ id: Number(id) })],
  });
  const currentUser = useReactiveVar(userVar);

  const [form] = Form.useForm();

  const reportIncident = ({
    reportImages,
    reportMessage,
    status,
  }: UpdateIncidentForEmployeeInput) => {
    id &&
      updateIncident({
        variables: {
          input: {
            reportImages,
            reportMessage,
            status,
            id: Number(id),
          },
        },
        onCompleted() {
          showSuccess('Saved Report Incident');
        },
        onError: showError,
      });
  };

  useEffect(() => {
    form.setFieldsValue({ ...incident });
  }, [incident, form]);

  return (
    <Form
      onFinish={reportIncident}
      className="col-span-1 rounded-xl bg-[white] p-4"
      form={form}
    >
      <Skeleton loading={!incident}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <EmployeeSelector
            initialValue={incident?.employee}
            onChange={userId => {
              updateIncident({
                variables: {
                  input: {
                    id: Number(id),
                    employeeId: Number(userId),
                  },
                },
              });
            }}
          />
          <Tooltip title="Due Date" placement="bottom">
            <Typography
              className={`flex cursor-pointer items-center gap-2 ${
                incident?.status === IncidentStatus.Overdue
                  ? 'text-error'
                  : 'text-success'
              }`}
            >
              <CalendarSVG width={24} height={24} />
              {formatDate(incident?.dueDate, 'MM/DD/YYYY hh:mm A')}
            </Typography>
          </Tooltip>
        </div>
        <Divider />
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Typography className="mb-4 flex items-center gap-4 text-base font-semibold">
              Incident Status
              <Form.Item noStyle shouldUpdate>
                {({ getFieldValue }) => (
                  <Form.Item noStyle name="status">
                    <IncidentStatusSelector
                      disabled={
                        getFieldValue('status') === IncidentStatus.Overdue ||
                        Number(getFieldValue('employeeId')) !==
                          Number(currentUser?.id)
                      }
                    />
                  </Form.Item>
                )}
              </Form.Item>
            </Typography>
            <Form.Item noStyle shouldUpdate>
              {({ getFieldValue }) => (
                <Form.Item
                  hidden={
                    getFieldValue('status') === IncidentStatus.Overdue ||
                    Number(getFieldValue('employeeId')) !==
                      Number(currentUser?.id)
                  }
                  noStyle
                >
                  <Button htmlType="submit" loading={loading} type="primary">
                    Save Report
                  </Button>
                </Form.Item>
              )}
            </Form.Item>
          </div>
          <Typography className="text-base font-semibold">
            Reported Message From Employee
          </Typography>
          <Form.Item noStyle shouldUpdate>
            {({ getFieldValue }) => (
              <Form.Item noStyle name="reportMessage">
                <Input.TextArea
                  placeholder="Enter your report message"
                  rows={6}
                  disabled={
                    Number(getFieldValue('employeeId')) !==
                    Number(currentUser?.id)
                  }
                />
              </Form.Item>
            )}
          </Form.Item>
        </div>
        <Divider className="mt-[27px]" />
        <div className="flex flex-col gap-1">
          <Form.Item noStyle shouldUpdate>
            {({ getFieldValue }) => (
              <Form.Item noStyle valuePropName="srcList" name="reportImages">
                <UploadImages
                  showUploadList={false}
                  render={loading => (
                    <Typography className="flex cursor-pointer items-center gap-2 text-base font-semibold uppercase text-primary-color">
                      <GalleryAddFilledSVG width={24} height={24} /> Upload
                      Report Images {loading && <LoadingOutlined />}
                    </Typography>
                  )}
                  disabled={
                    Number(getFieldValue('employeeId')) !==
                    Number(currentUser?.id)
                  }
                />
              </Form.Item>
            )}
          </Form.Item>
          <Form.Item noStyle shouldUpdate>
            {({ getFieldValue }) => (
              <Form.Item noStyle name="reportImages">
                <Gallery
                  className="text-base font-semibold uppercase text-primary-color"
                  gallery={getFieldValue('reportImages')?.split(',')}
                  emptyRender={() => (
                    <Empty
                      className="my-4 w-full"
                      description={
                        <div className="flex cursor-pointer items-center justify-center gap-2 text-grey-secondary-300">
                          No Report Image Data
                        </div>
                      }
                    />
                  )}
                  allowDelete
                />
              </Form.Item>
            )}
          </Form.Item>
        </div>
      </Skeleton>
    </Form>
  );
}
