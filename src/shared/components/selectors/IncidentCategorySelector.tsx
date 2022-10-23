import InfinitySelect, { InfinitySelectProps } from '../commons/InfinitySelect';
import {
  GetIncidentCategoriesDocument,
  GetIncidentCategoriesQuery,
  GetIncidentCategoriesQueryVariables,
  IncidentCategory,
} from '#/generated/schemas';
import { DeepPartial } from '#/shared/utils/type';

function IncidentCategorySelector({
  ...rest
}: InfinitySelectProps<
  DeepPartial<IncidentCategory>,
  GetIncidentCategoriesQueryVariables
>) {
  return (
    <InfinitySelect<
      GetIncidentCategoriesQuery,
      GetIncidentCategoriesQueryVariables,
      DeepPartial<IncidentCategory>
    >
      formatData={data => data?.getIncidentCategories}
      query={GetIncidentCategoriesDocument}
      className="w-full"
      fetchPolicy="network-only"
      {...rest}
    />
  );
}

export default IncidentCategorySelector;
