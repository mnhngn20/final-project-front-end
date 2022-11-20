import InfinitySelect, { InfinitySelectProps } from '../commons/InfinitySelect';
import {
  GetRoomsDocument,
  GetRoomsQuery,
  GetRoomsQueryVariables,
  Room,
} from '#/generated/schemas';
import { DeepPartial } from '#/shared/utils/type';

function RoomSelector({
  ...rest
}: InfinitySelectProps<DeepPartial<Room>, GetRoomsQueryVariables>) {
  return (
    <InfinitySelect<GetRoomsQuery, GetRoomsQueryVariables, DeepPartial<Room>>
      formatData={data => data?.getRooms}
      query={GetRoomsDocument}
      className="w-full"
      fetchPolicy="network-only"
      convertDataToOptions={rooms =>
        rooms.map(room => ({
          label: `Room ${room?.name}`,
          value: room?.id,
        }))
      }
      {...rest}
    />
  );
}

export default RoomSelector;
