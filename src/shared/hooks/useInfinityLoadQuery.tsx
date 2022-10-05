import {
  DocumentNode,
  TypedDocumentNode,
  useQuery,
  FetchPolicy,
} from '@apollo/client';
import { useState } from 'react';
import { debounce, merge } from 'lodash';
import { Maybe } from '#/generated/schemas';
import { showError } from '../utils/notification';

export interface FormatDataResponse<Type> {
  page?: Maybe<number>;
  total?: Maybe<number>;
  totalPages?: Maybe<number>;
  message?: Maybe<string>;
  items: Maybe<Type>[] | null;
}

interface Props<TData, TVariables, Type> {
  query: DocumentNode | TypedDocumentNode<TData, TVariables>;
  formatData: (e: TData) => FormatDataResponse<Type> | null | undefined;
  variables?: TVariables;
  fetchPolicy?: FetchPolicy;
  skip?: boolean;
}

const OFFSET = 10;

export const useInfiniteLoadQuery = <TData, TVariables, Type>({
  query,
  variables,
  formatData,
  skip,
  fetchPolicy = 'cache-first',
}: Props<TData, TVariables, Type>) => {
  const [data, setData] = useState<Maybe<Type>[]>([]);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    total: 10,
    totalPage: 1,
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const { error, refetch } = useQuery<TData>(query, {
    variables: merge(
      {
        input: {
          page: 1,
          limit: 10,
        },
      },
      variables,
    ),
    skip,
    onCompleted(data) {
      setLoading(false);
      const formattedData = formatData(data);
      if (formattedData?.page === 1) {
        setData(formattedData?.items || []);
        setPageNumber(2);
        setPagination({
          pageNumber: formattedData?.page || 1,
          pageSize: 10,
          total: formattedData?.total || 10,
          totalPage: formattedData?.totalPages || 1,
        });
      }
    },
    onError: error => {
      showError(error);
      setLoading(false);
    },
    fetchPolicy,
  });

  const loadMore = (event: React.UIEvent) => {
    if (pagination.pageNumber >= pagination.totalPage) return;
    const target = event.target as HTMLDivElement;
    if (
      !loading &&
      target.scrollTop + target.offsetHeight + OFFSET >= target.scrollHeight
    ) {
      setLoading(true);
      refetch(
        merge(variables, {
          input: {
            limit: 10,
            page: pageNumber,
          },
        }),
      )
        .then(data => {
          const formattedData = formatData(data.data);
          setPageNumber(currentPage => currentPage + 1);
          setData(oldData => [...oldData, ...(formattedData?.items || [])]);
          setPagination({
            pageNumber: formattedData?.page || 1,
            pageSize: 10,
            total: formattedData?.total || 10,
            totalPage: formattedData?.totalPages || 1,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onSearch = debounce((value: string) => {
    setLoading(true);
    refetch({
      queryParams: {
        ...variables,
        page: 1,
        limit: 10,
        q: value.trim(),
      },
    })
      .then(data => {
        const formattedData = formatData(data.data);
        setPageNumber(1);
        setData(formattedData?.items ?? []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, 400);

  return {
    data: data as Type[],
    error,
    loading,
    onSearch,
    loadMore,
    setData,
    setPageNumber,
    setPagination,
    refetch,
    hasMore: pagination.pageNumber < pagination.totalPage,
    pageNumber,
  };
};
