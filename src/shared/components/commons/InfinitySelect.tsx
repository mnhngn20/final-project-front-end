import { TypedDocumentNode, DocumentNode, FetchPolicy } from '@apollo/client';
import { Select, SelectProps } from 'antd';
import { SelectValue } from 'antd/es/select';
import { uniqBy, get } from 'lodash';
import {
  FormatDataResponse,
  useInfiniteLoadQuery,
} from '#/shared/hooks/useInfinityLoadQuery';

export interface InfinitySelectProps<Type, QueryVariables>
  extends SelectProps<SelectValue> {
  initValues?: Type[];
  variables?: QueryVariables;
  fetchPolicy?: FetchPolicy;
  hasNullValue?: boolean;
}

export interface Props<Query, QueryVariables, Type>
  extends SelectProps<SelectValue> {
  query: DocumentNode | TypedDocumentNode<Query, QueryVariables>;
  formatData: (e: Query) => FormatDataResponse<Type> | null | undefined;
  initValues?: Type[];
  convertDataToOptions?: (data: Type[]) => {
    value: string | React.ReactNode;
    label: unknown;
  }[];
  variables?: QueryVariables;
  fetchPolicy?: FetchPolicy;
  hasNullValue?: boolean;
}

export function convertDataToSelectOptions<T>(
  data: T[],
  valueProp: string,
  labelProp: string,
) {
  return data?.map(item => ({
    value: get(item, valueProp),
    label: get(item, labelProp),
  }));
}

const getValue = (value?: SelectValue | null) => {
  if (typeof value === 'object') {
    return value;
  }
  return value && String(value);
};

function InfinitySelect<Query, QueryVariables, Type>({
  query,
  formatData,
  initValues = [],
  convertDataToOptions,
  variables,
  fetchPolicy,
  hasNullValue,
  value,
  ...rest
}: Props<Query, QueryVariables, Type>) {
  const { data, loading, loadMore, onSearch } = useInfiniteLoadQuery<
    Query,
    QueryVariables,
    Type
  >({
    query,
    formatData,
    variables,
    fetchPolicy,
  });

  const items = uniqBy([...initValues, ...data], 'id');
  const formattedData = convertDataToOptions
    ? convertDataToOptions(items as Type[])
    : convertDataToSelectOptions(items, 'id', 'name');
  const options = loading
    ? [...formattedData, { value: null, label: 'Loading...' }]
    : formattedData;

  if (hasNullValue) {
    options?.unshift({
      value: null,
      label: 'From System',
    });
  }

  return (
    <Select
      value={getValue(value)}
      onPopupScroll={loadMore}
      loading={loading}
      options={options}
      optionFilterProp="label"
      showArrow
      onSearch={onSearch}
      {...rest}
    />
  );
}

export default InfinitySelect;
