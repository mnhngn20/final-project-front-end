import InfinitySelect, { InfinitySelectProps } from '../commons/InfinitySelect';
import {
  GetLocationReservationsDocument,
  GetLocationReservationsQuery,
  GetLocationReservationsQueryVariables,
  LocationReservation,
} from '#/generated/schemas';
import { DeepPartial } from '#/shared/utils/type';
import dayjs from 'dayjs';

function LocationReservationSelector({
  ...rest
}: InfinitySelectProps<
  DeepPartial<LocationReservation>,
  GetLocationReservationsQueryVariables
>) {
  return (
    <InfinitySelect<
      GetLocationReservationsQuery,
      GetLocationReservationsQueryVariables,
      DeepPartial<LocationReservation>
    >
      formatData={data => data?.getLocationReservations}
      convertDataToOptions={locationReservations =>
        locationReservations?.map(reservation => ({
          label: dayjs(reservation?.startDate).format('MMMM YYYY'),
          value: reservation?.id,
        }))
      }
      query={GetLocationReservationsDocument}
      className="w-full"
      fetchPolicy="network-only"
      {...rest}
    />
  );
}

export default LocationReservationSelector;
