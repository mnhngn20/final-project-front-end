import { Button, Modal, Switch, Table, Tooltip, Typography } from 'antd';
import { useState, useMemo } from 'react';
import { useReactiveVar } from '@apollo/client';
import EquipmentForm from './Form';
import Filters from './Filters';
import {
  User,
  OrderBy,
  Equipment,
  useGetEquipmentsQuery,
  useUpsertEquipmentMutation,
  UpsertEquipmentInput,
  useUpdateEquipmentStatusMutation,
  useDeleteEquipmentMutation,
} from '#/generated/schemas';
import { userVar } from '#/graphql/cache';
import { FormModal } from '#/shared/components/commons/FormModal';
import { useTable } from '#/shared/hooks/useTable';
import { DeepPartial } from '#/shared/utils/type';
import { showError, showSuccess } from '#/shared/utils/notification';
import { formatId } from '#/shared/utils/format';
import { formatDate } from '#/shared/utils/date';
import Image from '#/shared/components/commons/Image';
import { ColumnsType } from 'antd/lib/table';
import { AddSVG, EditSVG, TrashOutlineSVG } from '#/assets/svgs';
import DefaultImage from '#/assets/images/default.png';
import PaginationPanel from '#/shared/components/commons/PaginationPanel';

export type GetEquipmentsFilter<T = string> = {
  name?: string;
  isActive?: T;
  roomId?: number;
};

interface ListProps {
  roomId?: number;
}

function List({ roomId }: ListProps) {
  const [filters, setFilters] = useState<
    GetEquipmentsFilter<boolean> | undefined
  >(undefined);
  const currentUser = useReactiveVar(userVar) as User;
  const { pageSize, onChange, currentPage, setCurrentPage } = useTable();
  const [selectedItem, setSelectedItem] = useState<
    DeepPartial<Equipment> | undefined
  >(undefined);
  const clearSelectedItem = () => {
    setSelectedItem(undefined);
  };
  const { data, loading, refetch } = useGetEquipmentsQuery({
    variables: {
      input: {
        orderBy: OrderBy.Desc,
        page: currentPage,
        limit: pageSize,
        locationId: Number(currentUser?.locationId),
        ...(roomId && { roomId: Number(roomId) }),
        ...filters,
      },
    },
    fetchPolicy: 'network-only',
  });
  const equipments = data?.getEquipments?.items ?? [];

  const [upsertEquipment, { loading: upsertEquipmentLoading }] =
    useUpsertEquipmentMutation({
      onCompleted() {
        showSuccess(
          selectedItem?.id
            ? 'Updated equipment successfully!'
            : 'Created equipment successfully!',
        );
        refetch();
        clearSelectedItem();
      },
      onError: showError,
    });

  const onFilter = ({ name, isActive, roomId }: GetEquipmentsFilter) => {
    const newFilter = {
      ...(name && { name }),
      ...(isActive && { isActive: isActive === 'true' }),
      ...(roomId && { roomId: Number(roomId) }),
    };
    setCurrentPage(1);
    setFilters(newFilter);
  };

  const [updateEquipmentStatus, { loading: updateEquipmentStatusLoading }] =
    useUpdateEquipmentStatusMutation({
      onCompleted() {
        showSuccess('Updated status successfully');
        refetch();
        clearSelectedItem();
      },
      onError: showError,
    });

  const onSubmit = ({
    roomId,
    image,
    isActive,
    name,
    description,
  }: UpsertEquipmentInput) => {
    upsertEquipment({
      variables: {
        input: {
          image,
          isActive,
          description,
          name,
          roomId: Number(roomId),
          ...(selectedItem?.id && {
            id: Number(selectedItem?.id),
          }),
        },
      },
    });
  };

  const [deleteEquipment, { loading: deleteEquipmentLoading }] =
    useDeleteEquipmentMutation({
      onCompleted() {
        showSuccess('Delete equipment successfully!');
        refetch();
      },
      onError: showError,
    });

  const COLUMNS: ColumnsType<DeepPartial<Equipment>> = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: formatId,
      },
      {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render(image: string) {
          return (
            <Image
              url={image ?? DefaultImage}
              width={100}
              height={100}
              className="object-cover"
            />
          );
        },
      },
      {
        title: 'Equipment Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Room Name',
        dataIndex: ['room', 'name'],
        key: 'roomName',
        render: (roomName: string, { room }: DeepPartial<Equipment>) => (
          <Tooltip title={room?.description}>{roomName ?? 'N/A'}</Tooltip>
        ),
      },
      {
        title: 'Status',
        dataIndex: 'isActive',
        key: 'isActive',
        render(isActive: boolean, { id }: DeepPartial<Equipment>) {
          return (
            <Switch
              checked={isActive}
              onChange={() =>
                updateEquipmentStatus({
                  variables: {
                    input: {
                      id: Number(id),
                      isActive: !isActive,
                    },
                  },
                })
              }
            />
          );
        },
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (description: string) => description ?? 'N/A',
      },
      {
        title: 'Created Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date: Date) => formatDate(date, 'hh:mm A, DD MMMM YYYY'),
      },
      {
        title: 'Updated Date',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (date: Date) => formatDate(date, 'hh:mm A, DD MMMM YYYY'),
      },
      {
        title: '',
        dataIndex: 'id',
        key: 'action',
        fixed: 'right' as const,
        render: (_: unknown, record: DeepPartial<Equipment>) => {
          const onEdit = () => {
            setSelectedItem({
              ...record,
            });
          };
          return (
            <div className="flex items-center justify-center gap-4 text-base text-primary-color">
              <span onClick={onEdit}>
                <EditSVG width={24} height={24} />
              </span>
              <span
                className="cursor-pointer text-error"
                onClick={() => {
                  Modal.warning({
                    centered: true,
                    closable: true,
                    maskClosable: true,
                    title: 'Are you sure to delete this Equipment?',
                    okText: 'Delete',
                    onOk: () => {
                      deleteEquipment({
                        variables: {
                          id: Number(record?.id),
                        },
                      });
                    },
                  });
                }}
              >
                <TrashOutlineSVG width={24} height={24} />
              </span>
            </div>
          );
        },
      },
    ],
    [deleteEquipment, updateEquipmentStatus],
  );

  return (
    <>
      <Filters onFilter={onFilter} />
      <div className="rounded-xl bg-[white] px-4">
        <div className="flex items-center justify-between py-4">
          <Typography className="text-xl font-semibold">
            Equipment List
          </Typography>
          <Button
            type="primary"
            onClick={() => setSelectedItem({})}
            icon={<AddSVG className="anticon" />}
          >
            Create
          </Button>
        </div>
        <Table
          rowKey="id"
          dataSource={equipments as DeepPartial<Equipment>[]}
          columns={COLUMNS}
          scroll={{ x: 'max-content' }}
          loading={
            loading ||
            upsertEquipmentLoading ||
            updateEquipmentStatusLoading ||
            deleteEquipmentLoading
          }
          onChange={onChange}
          pagination={false}
        />
        <PaginationPanel
          current={currentPage ?? 1}
          pageSize={10}
          total={data?.getEquipments?.total ?? 0}
          setCurrentPage={setCurrentPage}
          className="flex justify-end py-6 pr-6"
          showQuickJumper
        />
      </div>
      <FormModal<UpsertEquipmentInput>
        loading={upsertEquipmentLoading}
        onSubmit={onSubmit}
        name="Equipment"
        onClose={clearSelectedItem}
        selectedItem={selectedItem}
        initialValues={selectedItem}
      >
        <EquipmentForm roomId={roomId} />
      </FormModal>
    </>
  );
}
export default List;
