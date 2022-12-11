import { Button, Table, Typography, Modal } from 'antd';
import { useState, useMemo } from 'react';
import ContactForm from './Form';
import Filters from './Filters';
import {
  OrderBy,
  ContactInformation,
  useGetLocationContactsQuery,
  useUpsertContactMutation,
  UpsertContactInput,
  useDeleteContactMutation,
  refetchGetLocationQuery,
} from '#/generated/schemas';
import { FormModal } from '#/shared/components/commons/FormModal';
import { useTable } from '#/shared/hooks/useTable';
import { DeepPartial } from '#/shared/utils/type';
import { showError, showSuccess } from '#/shared/utils/notification';
import { formatId } from '#/shared/utils/format';
import { formatDate } from '#/shared/utils/date';
import { ColumnsType } from 'antd/lib/table';
import { AddSVG, EditSVG, TrashOutlineSVG } from '#/assets/svgs';
import PaginationPanel from '#/shared/components/commons/PaginationPanel';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '#/graphql/cache';

export type GetContactsFilter = {
  name?: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
};

function List() {
  const currentUser = useReactiveVar(userVar);
  const [filters, setFilters] = useState<GetContactsFilter | undefined>(
    undefined,
  );
  const { pageSize, onChange, currentPage, setCurrentPage } = useTable();
  const [selectedItem, setSelectedItem] = useState<
    DeepPartial<ContactInformation> | undefined
  >(undefined);
  const clearSelectedItem = () => {
    setSelectedItem(undefined);
  };
  const { data, loading, refetch } = useGetLocationContactsQuery({
    variables: {
      input: {
        orderBy: OrderBy.Desc,
        page: currentPage,
        limit: pageSize,
        locationId: Number(currentUser.locationId),
        ...filters,
      },
    },
    fetchPolicy: 'network-only',
  });
  const contacts = data?.getLocationContacts?.items ?? [];

  const [upsertContact, { loading: upsertContactLoading }] =
    useUpsertContactMutation({
      onCompleted() {
        showSuccess(
          !selectedItem?.id
            ? 'Created Contact Successfully'
            : 'Updated Contact Successfully!',
        );
        refetch();
        clearSelectedItem();
      },
      onError: showError,
    });

  const onFilter = ({
    name,
    address,
    email,
    phoneNumber,
  }: GetContactsFilter) => {
    const newFilter = {
      ...(name && { name }),
      ...(address && { address }),
      ...(email && { email }),
      ...(phoneNumber && { phoneNumber }),
    };
    setCurrentPage(1);
    setFilters(newFilter);
  };

  const onSubmit = ({ ...values }: UpsertContactInput) => {
    upsertContact({
      variables: {
        input: {
          ...values,
          ...(selectedItem?.id && {
            id: Number(selectedItem?.id),
          }),
          locationId: Number(currentUser?.locationId),
        },
      },
    });
  };

  const [deleteContact, { loading: deleteContactLoading }] =
    useDeleteContactMutation({
      onCompleted() {
        showSuccess('Delete Contact Successfully!');
        refetch();
      },
      onError: showError,
      refetchQueries: [
        refetchGetLocationQuery({ id: Number(currentUser?.locationId) }),
      ],
    });

  const COLUMNS: ColumnsType<DeepPartial<ContactInformation>> = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: formatId,
      },
      {
        title: 'Contact Name',
        dataIndex: 'name',
        key: 'name',
        render: (content?: string) => content || 'N/A',
      },
      {
        title: 'Contact Address',
        dataIndex: 'address',
        key: 'address',
        render: (content?: string) => content || 'N/A',
      },

      {
        title: 'Contact Email',
        dataIndex: 'email',
        key: 'email',
        render: (content?: string) => content || 'N/A',
      },
      {
        title: 'Contact Phone Number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        render: (content?: string) => content || 'N/A',
      },
      {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (createdAt: string) =>
          formatDate(createdAt, 'hh:mm A, DD MMMM YYYY'),
      },
      {
        title: 'Updated At',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (updatedAt: string) =>
          formatDate(updatedAt, 'hh:mm A, DD MMMM YYYY'),
      },
      {
        title: '',
        dataIndex: 'id',
        key: 'action',
        fixed: 'right' as const,
        render: (_: unknown, record: DeepPartial<ContactInformation>) => {
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
                    title: 'Are you sure to delete this Contact?',
                    okText: 'Delete',
                    onOk: () => {
                      deleteContact({
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
    [deleteContact],
  );

  return (
    <>
      <Filters onFilter={onFilter} />
      <div className="rounded-xl bg-[white] px-4">
        <div className="flex items-center justify-between py-4">
          <Typography className="text-xl font-semibold">
            Contact List
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
          dataSource={contacts as unknown as DeepPartial<ContactInformation>[]}
          columns={COLUMNS}
          scroll={{ x: 'max-content' }}
          loading={loading || upsertContactLoading || deleteContactLoading}
          onChange={onChange}
          pagination={false}
        />

        <PaginationPanel
          current={currentPage ?? 1}
          pageSize={10}
          total={data?.getLocationContacts?.total ?? 0}
          setCurrentPage={setCurrentPage}
          className="flex justify-end py-6 pr-6"
          showQuickJumper
        />
      </div>
      <FormModal<UpsertContactInput>
        loading={upsertContactLoading}
        onSubmit={onSubmit}
        name="Contact"
        onClose={clearSelectedItem}
        selectedItem={selectedItem}
        initialValues={selectedItem}
      >
        <ContactForm />
      </FormModal>
    </>
  );
}
export default List;
