import { Button, Table, Switch, Typography, Image } from 'antd';
import { useState, useMemo } from 'react';
import AmenityForm from './Form';
import Filters from './Filters';
import {
  OrderBy,
  Amenity,
  useGetAmenitiesQuery,
  UpsertAmenityInput,
  useUpdateAmenityStatusMutation,
  useUpsertAmenityMutation,
} from '#/generated/schemas';
import { FormModal } from '#/shared/components/commons/FormModal';
import { useTable } from '#/shared/hooks/useTable';
import { DeepPartial } from '#/shared/utils/type';
import { showError, showSuccess } from '#/shared/utils/notification';
import { formatId } from '#/shared/utils/format';
import { formatDate } from '#/shared/utils/date';
import { ColumnsType } from 'antd/lib/table';
import { AddSVG, EditSVG } from '#/assets/svgs';
import PaginationPanel from '#/shared/components/commons/PaginationPanel';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '#/graphql/cache';
import DefaultImage from '#/assets/images/default.png';

export type GetAmenitiesFilter<T = string> = {
  amenityTypeId?: number;
  name?: string;
  isActive?: T;
};

function List() {
  const currentUser = useReactiveVar(userVar);
  const [filters, setFilters] = useState<
    GetAmenitiesFilter<boolean> | undefined
  >(undefined);
  const { pageSize, onChange, currentPage, setCurrentPage } = useTable();
  const [selectedItem, setSelectedItem] = useState<
    DeepPartial<Amenity> | undefined
  >(undefined);
  const clearSelectedItem = () => {
    setSelectedItem(undefined);
  };
  const { data, loading, refetch } = useGetAmenitiesQuery({
    variables: {
      input: {
        orderBy: OrderBy.Desc,
        page: currentPage,
        limit: pageSize,
        locationId: currentUser.locationId,
        ...filters,
      },
    },
    fetchPolicy: 'network-only',
  });
  const users = data?.getAmenities?.items ?? [];

  const [updateAmenityStatus, { loading: updateAmenityStatusLoading }] =
    useUpdateAmenityStatusMutation({
      onCompleted() {
        showSuccess('Updated status successfully');
        refetch();
        clearSelectedItem();
      },
      onError: showError,
    });

  const [upsertAmenity, { loading: upsertAmenityLoading }] =
    useUpsertAmenityMutation({
      onCompleted() {
        showSuccess('Update amenity successfully!');
        refetch();
        clearSelectedItem();
      },
      onError: showError,
    });

  const onFilter = ({ name, amenityTypeId, isActive }: GetAmenitiesFilter) => {
    const newFilter = {
      ...(name && { name }),
      ...(amenityTypeId && { amenityTypeId: Number(amenityTypeId) }),
      ...(isActive && { isActive: isActive === 'true' }),
    };
    setCurrentPage(1);
    setFilters(newFilter);
  };

  const onSubmit = ({ amenityTypeId, ...values }: UpsertAmenityInput) => {
    upsertAmenity({
      variables: {
        input: {
          ...values,
          ...(selectedItem?.id && {
            id: Number(selectedItem?.id),
          }),
          amenityTypeId: Number(amenityTypeId),
          locationId: Number(currentUser?.locationId),
        },
      },
    });
  };

  const COLUMNS: ColumnsType<DeepPartial<Amenity>> = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: formatId,
      },
      {
        title: 'Icon',
        dataIndex: 'image',
        key: 'image',
        render(icon?: string) {
          return (
            <Image
              src={icon ?? DefaultImage}
              width={100}
              height={100}
              preview={false}
            />
          );
        },
      },
      {
        title: 'Amenity Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'AmenityType',
        dataIndex: ['amenityType', 'name'],
        key: 'amenityType',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (createdAt: string) => formatDate(createdAt),
      },
      {
        title: 'Status',
        dataIndex: 'isActive',
        key: 'isActive',
        render: (isActive: boolean, { id }: DeepPartial<Amenity>) => (
          <Switch
            checked={isActive}
            onChange={() =>
              updateAmenityStatus({
                variables: {
                  input: {
                    id: Number(id),
                    isActive: !isActive,
                  },
                },
              })
            }
          />
        ),
      },
      {
        title: '',
        dataIndex: 'id',
        key: 'action',
        fixed: 'right' as const,
        render: (_: unknown, record: DeepPartial<Amenity>) => {
          const onEdit = () => {
            setSelectedItem({
              ...record,
            });
          };
          return (
            <div className="flex items-center justify-center gap-4 text-base text-primary-color">
              <Button type="link" onClick={onEdit}>
                <EditSVG width={24} height={24} />
              </Button>
            </div>
          );
        },
      },
    ],
    [updateAmenityStatus],
  );

  return (
    <>
      <Filters onFilter={onFilter} />
      <div className="rounded-xl bg-[white] px-4">
        <div className="flex items-center justify-between py-4">
          <Typography className="text-xl font-semibold">
            Amenity List
          </Typography>
          <Button
            type="primary"
            className="w-min"
            icon={<AddSVG className="anticon" />}
            onClick={() => setSelectedItem({})}
          >
            Create
          </Button>
        </div>
        <Table
          rowKey="id"
          dataSource={users as unknown as DeepPartial<Amenity>[]}
          columns={COLUMNS}
          scroll={{ x: 'max-content' }}
          loading={
            loading || upsertAmenityLoading || updateAmenityStatusLoading
          }
          onChange={onChange}
          pagination={false}
        />

        <PaginationPanel
          current={currentPage ?? 1}
          pageSize={10}
          total={data?.getAmenities?.total ?? 0}
          setCurrentPage={setCurrentPage}
          className="flex justify-end py-6 pr-6"
          showQuickJumper
        />
      </div>
      <FormModal<UpsertAmenityInput>
        loading={upsertAmenityLoading}
        onSubmit={onSubmit}
        name="Amenity"
        onClose={clearSelectedItem}
        selectedItem={selectedItem}
        initialValues={selectedItem}
      >
        <AmenityForm />
      </FormModal>
    </>
  );
}
export default List;
