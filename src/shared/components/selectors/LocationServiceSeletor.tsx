import InfinitySelect, { InfinitySelectProps } from '../commons/InfinitySelect';
import {
  GetLocationServicesDocument,
  GetLocationServicesQuery,
  GetLocationServicesQueryVariables,
  LocationService,
} from '#/generated/schemas';
import { DeepPartial } from '#/shared/utils/type';

function LocationServiceSelector({
  ...rest
}: InfinitySelectProps<
  DeepPartial<LocationService>,
  GetLocationServicesQueryVariables
>) {
  return (
    <InfinitySelect<
      GetLocationServicesQuery,
      GetLocationServicesQueryVariables,
      DeepPartial<LocationService>
    >
      formatData={data => data?.getLocationServices}
      query={GetLocationServicesDocument}
      className="w-full"
      fetchPolicy="network-only"
      {...rest}
    />
  );
}

export default LocationServiceSelector;
