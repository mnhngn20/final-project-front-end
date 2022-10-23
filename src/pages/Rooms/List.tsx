import { Button, Table, Typography } from 'antd';
import { useState, useMemo } from 'react';
import { useReactiveVar } from '@apollo/client';
import RoomForm from './Form';
import Filters from './Filters';
import {
  User,
  OrderBy,
  useUpsertRoomMutation,
  Room,
  UpsertRoomInput,
  useGetRoomsQuery,
  RoomStatus,
} from '#/generated/schemas';
import { userVar } from '#/graphql/cache';
import { FormModal } from '#/shared/components/commons/FormModal';
import { useTable } from '#/shared/hooks/useTable';
import { Link } from 'react-router-dom';
import { DeepPartial } from '#/shared/utils/type';
import { showError, showSuccess } from '#/shared/utils/notification';
import { formatId } from '#/shared/utils/format';
import { formatDate } from '#/shared/utils/date';
import Image from '#/shared/components/commons/Image';
import { ColumnsType } from 'antd/lib/table';
import { AddSVG, EditSVG, EyeSVG } from '#/assets/svgs';
import DefaultImage from '#/assets/images/default.png';
import PaginationPanel from '#/shared/components/commons/PaginationPanel';
import CustomTag from '#/shared/components/commons/CustomTag';
import { getRoomStatusColor } from './ultils';

export type GetRoomsFilter = {
  name?: string;
  minBasePrice?: number;
  maxBasePrice?: number;
  status?: RoomStatus;
  floor?: number;
};

function List() {
  const [filters, setFilters] = useState<GetRoomsFilter | undefined>(undefined);
  const currentUser = useReactiveVar(userVar) as User;
  const { pageSize, onChange, currentPage, setCurrentPage } = useTable();
  const [selectedItem, setSelectedItem] = useState<
    DeepPartial<Room> | undefined
  >(undefined);
  const clearSelectedItem = () => {
    setSelectedItem(undefined);
  };
  const { data, loading, refetch } = useGetRoomsQuery({
    variables: {
      input: {
        orderBy: OrderBy.Desc,
        page: currentPage,
        limit: pageSize,
        locationId: Number(currentUser?.locationId),
        ...filters,
      },
    },
  });
  const rooms = data?.getRooms?.items ?? [];

  const [upsertRoom, { loading: upsertRoomLoading }] = useUpsertRoomMutation({
    onCompleted() {
      showSuccess(
        selectedItem?.id
          ? 'Updated room successfully!'
          : 'Created room successfully!',
      );
      refetch();
      clearSelectedItem();
    },
    onError: showError,
  });

  const onFilter = ({
    name,
    maxBasePrice,
    minBasePrice,
    status,
    floor,
  }: GetRoomsFilter) => {
    const newFilter = {
      ...(name && { name }),
      ...(status && { status }),
      ...(maxBasePrice && { maxBasePrice: Number(maxBasePrice) }),
      ...(minBasePrice && { minBasePrice: Number(minBasePrice) }),
      ...(floor && { floor }),
    };
    setCurrentPage(1);
    setFilters(newFilter);
  };

  const onSubmit = ({
    basePrice,
    description,
    images,
    name,
    thumbnail,
    floor,
  }: UpsertRoomInput) => {
    upsertRoom({
      variables: {
        input: {
          basePrice,
          description,
          images,
          name,
          thumbnail,
          floor: Number(floor),
          ...(selectedItem?.id && {
            id: Number(selectedItem?.id),
          }),
        },
      },
    });
  };

  const COLUMNS: ColumnsType<DeepPartial<Room>> = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: formatId,
      },
      {
        title: 'Image',
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        render(thumbnail: string) {
          return (
            <Image
              url={thumbnail ?? DefaultImage}
              width={100}
              height={100}
              className="object-cover"
            />
          );
        },
      },
      {
        title: 'Room Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Created Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date: Date) => formatDate(date),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render(status: RoomStatus) {
          return (
            <CustomTag
              content={status}
              className={getRoomStatusColor(status)}
            />
          );
        },
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Base Price',
        dataIndex: 'basePrice',
        key: 'basePrice',
        render: (basePrice?: number) => `$ ${basePrice}`,
      },
      {
        title: '',
        dataIndex: 'id',
        key: 'action',
        fixed: 'right' as const,
        render: (_: unknown, record: DeepPartial<Room>) => {
          const onEdit = () => {
            setSelectedItem({
              ...record,
            });
          };
          return (
            <div className="flex items-center justify-center gap-4 text-base text-primary-color">
              <Link to={`/rooms/${record?.id}`}>
                <EyeSVG width={24} height={24} />
              </Link>
              <Button type="link" onClick={onEdit}>
                <EditSVG width={24} height={24} />
              </Button>
            </div>
          );
        },
      },
    ],
    [],
  );

  return (
    <>
      <Filters onFilter={onFilter} />
      <div className="rounded-xl bg-[white] px-4">
        <div className="flex items-center justify-between py-4">
          <Typography className="text-xl font-semibold">Room List</Typography>
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
          dataSource={rooms as DeepPartial<Room>[]}
          columns={COLUMNS}
          scroll={{ x: 'max-content' }}
          loading={loading || upsertRoomLoading}
          onChange={onChange}
          pagination={false}
        />
        <PaginationPanel
          current={currentPage ?? 1}
          pageSize={10}
          total={data?.getRooms?.total ?? 0}
          setCurrentPage={setCurrentPage}
          className="flex justify-end py-6 pr-6"
          showQuickJumper
        />
      </div>
      <FormModal<UpsertRoomInput>
        loading={upsertRoomLoading}
        onSubmit={onSubmit}
        name="Room"
        onClose={clearSelectedItem}
        selectedItem={selectedItem}
        initialValues={selectedItem}
      >
        <RoomForm />
      </FormModal>
    </>
  );
}
export default List;
