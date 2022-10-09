import InfinitySelect, { InfinitySelectProps } from '../commons/InfinitySelect';
import {
  GetAmenityTypesDocument,
  GetAmenityTypesQuery,
  GetAmenityTypesQueryVariables,
  AmenityType,
} from '#/generated/schemas';
import { DeepPartial } from '#/shared/utils/type';

function AmenityTypeSelector({
  ...rest
}: InfinitySelectProps<
  DeepPartial<AmenityType>,
  GetAmenityTypesQueryVariables
>) {
  return (
    <InfinitySelect<
      GetAmenityTypesQuery,
      GetAmenityTypesQueryVariables,
      DeepPartial<AmenityType>
    >
      formatData={data => data?.getAmenityTypes}
      query={GetAmenityTypesDocument}
      className="w-full"
      fetchPolicy="network-only"
      {...rest}
    />
  );
}

export default AmenityTypeSelector;
