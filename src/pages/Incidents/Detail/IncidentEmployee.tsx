import { CalendarSVG, GalleryAddOutlineSVG } from '#/assets/svgs';
import {
  Incident,
  IncidentStatus,
  refetchGetIncidentQuery,
  useUpdateIncidentForEmployeeMutation,
} from '#/generated/schemas';
import Avatar from '#/shared/components/commons/Avatar';
import Gallery from '#/shared/components/commons/Gallery';
import { formatDate } from '#/shared/utils/date';
import { showError } from '#/shared/utils/notification';
import { DeepPartial } from '#/shared/utils/type';
import { Button, Divider, Empty, Input, Tooltip, Typography } from 'antd';
import { debounce } from 'lodash-es';
import { useParams } from 'react-router-dom';
import IncidentStatusSelector from './IncidentStatusSelector';
import { Skeleton } from 'antd';
import UploadImages from '#/shared/components/commons/UploadImages';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '#/graphql/cache';

interface IncidentEmployeeProps {
  incident?: DeepPartial<Incident>;
  setEditModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function IncidentEmployee({
  incident,
  setEditModalVisible,
}: IncidentEmployeeProps) {
  const { id } = useParams();
  const [updateIncident] = useUpdateIncidentForEmployeeMutation({
    onError: showError,
    refetchQueries: [refetchGetIncidentQuery({ id: Number(id) })],
  });
  const currentUser = useReactiveVar(userVar);

  const onChangeHandler = debounce((value: string) => {
    if (id) {
      updateIncident({
        variables: {
          input: {
            id: Number(id),
            reportMessage: value?.trim(),
          },
        },
      });
    }
  }, 300);

  const onlyAssignedEmployee =
    !incident?.employeeId ||
    Number(incident?.employeeId) !== Number(currentUser?.id);

  return (
    <div className="col-span-1 rounded-xl bg-[white] p-4">
      <Skeleton loading={!incident}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span onClick={() => setEditModalVisible?.(true)}>
            <Typography className="flex cursor-pointer items-center gap-4 text-grey-secondary-300">
              <Avatar size={36} src={incident?.employee?.avatar} />
              {incident?.employee ? (
                <span className="flex flex-col">
                  <Typography className="text- font-semibold text-primary-color">
                    {incident?.employee?.name}
                  </Typography>
                  <Typography className="text-xs">
                    {incident?.employee?.email}
                  </Typography>
                </span>
              ) : (
                'Add employee in charge'
              )}
            </Typography>
          </span>
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
          <Typography className="mb-4 flex items-center gap-4 text-base font-semibold">
            Incident Status
            <IncidentStatusSelector
              value={incident?.status}
              disabled={
                incident?.status === IncidentStatus.Overdue ||
                onlyAssignedEmployee
              }
              onChange={status =>
                updateIncident({
                  variables: {
                    input: {
                      id: Number(id),
                      status,
                    },
                  },
                })
              }
            />
          </Typography>
          <Typography className="text-base font-semibold">
            Reported Message From Employee
          </Typography>
          <Input.TextArea
            key={incident?.id}
            defaultValue={incident?.reportMessage ?? ''}
            placeholder="Enter your report message"
            onChange={e => {
              onChangeHandler(e.target.value);
            }}
            rows={6}
            disabled={onlyAssignedEmployee}
          />
        </div>
        <Divider />
        <UploadImages
          srcList={incident?.images}
          onCompleted={(_: string, newFileList: string[]) => {
            id &&
              updateIncident({
                variables: {
                  input: {
                    id: Number(id),
                    reportImages: newFileList?.join(','),
                  },
                },
              });
          }}
          showUploadList={false}
          render={loading => (
            <Button
              icon={
                <GalleryAddOutlineSVG
                  width={16}
                  height={16}
                  className="anticon"
                />
              }
              className="mb-4"
              loading={loading}
              type="primary"
              disabled={onlyAssignedEmployee}
            >
              Upload Report Images
            </Button>
          )}
          disabled={onlyAssignedEmployee}
        />
        <Gallery
          className="text-base font-semibold uppercase text-primary-color"
          title="Reported Image Attachments"
          gallery={incident?.reportImages?.split(',')}
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
        />
      </Skeleton>
    </div>
  );
}
