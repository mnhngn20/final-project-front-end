import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type ChangePasswordInput = {
  oldPassword: Scalars['String'];
  password: Scalars['String'];
};

export type ChangeUserStatusInput = {
  id: Scalars['Float'];
  isActive: Scalars['Boolean'];
};

export type ContactInformation = {
  address?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  location: Location;
  locationId: Scalars['Float'];
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type CreateUserInput = {
  address?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  identityNumber?: InputMaybe<Scalars['String']>;
  locationId?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  roomId?: InputMaybe<Scalars['Float']>;
};

export type Equipment = {
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  location: Location;
  locationId: Scalars['Float'];
  name: Scalars['String'];
  room: Room;
  roomId: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type EquipmentListResponse = ListResponse & {
  items: Array<Equipment>;
  message?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  totalPages?: Maybe<Scalars['Float']>;
};

export type EquipmentResponse = IResponse & {
  equipment?: Maybe<Equipment>;
  message?: Maybe<Scalars['String']>;
};

export type GetAccessTokenInput = {
  refreshToken: Scalars['String'];
};

export type GetEquipmentsInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Float']>;
  locationId?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<OrderBy>;
  page?: InputMaybe<Scalars['Float']>;
  roomId?: InputMaybe<Scalars['Float']>;
};

export type GetLocationsInput = {
  address?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<OrderBy>;
  page?: InputMaybe<Scalars['Float']>;
};

export type GetRoomsInput = {
  floor?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
  locationId?: InputMaybe<Scalars['Float']>;
  maxBasePrice?: InputMaybe<Scalars['Float']>;
  minBasePrice?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<OrderBy>;
  page?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<RoomStatus>;
};

export type GetUsersInput = {
  email?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Float']>;
  locationId?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<OrderBy>;
  page?: InputMaybe<Scalars['Float']>;
  role?: InputMaybe<UserRole>;
  roomId?: InputMaybe<Scalars['Float']>;
};

export type IResponse = {
  message?: Maybe<Scalars['String']>;
};

export type ListResponse = {
  message?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  totalPages?: Maybe<Scalars['Float']>;
};

export type ListUserResponse = ListResponse & {
  items: Array<User>;
  message?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  totalPages?: Maybe<Scalars['Float']>;
};

export type Location = {
  address: Scalars['String'];
  contactInformations?: Maybe<Array<ContactInformation>>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  equipments?: Maybe<Array<Equipment>>;
  id: Scalars['ID'];
  images?: Maybe<Scalars['String']>;
  income: Scalars['Float'];
  isActive: Scalars['Boolean'];
  lat?: Maybe<Scalars['Float']>;
  long?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  numOfFloor?: Maybe<Scalars['Float']>;
  rooms?: Maybe<Array<Room>>;
  thumbnail?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  users?: Maybe<Array<User>>;
};

export type LocationContactInformationInput = {
  address?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type LocationListResponse = ListResponse & {
  items: Array<Location>;
  message?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  totalPages?: Maybe<Scalars['Float']>;
};

export type LocationResponse = IResponse & {
  location?: Maybe<Location>;
  message?: Maybe<Scalars['String']>;
};

export type LoginResponse = IResponse & {
  accessToken?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Mutation = {
  changePassword: Scalars['String'];
  changeUserStatus: Scalars['String'];
  createUser: UserResponse;
  getAccessToken: LoginResponse;
  login: LoginResponse;
  register: UserResponse;
  resetPassword: ResetPasswordResponse;
  resetPasswordConfirm: ResetPasswordResponse;
  updateEquipmentStatus: EquipmentResponse;
  updateLocationStatus: LocationResponse;
  updateMe: UserResponse;
  updateUser: UserResponse;
  upsertEquipment: EquipmentResponse;
  upsertLocation: LocationResponse;
  upsertRoom: RoomResponse;
};

export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};

export type MutationChangeUserStatusArgs = {
  input: ChangeUserStatusInput;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationGetAccessTokenArgs = {
  input: GetAccessTokenInput;
};

export type MutationLoginArgs = {
  input: RegisterLoginInput;
};

export type MutationRegisterArgs = {
  input: RegisterLoginInput;
};

export type MutationResetPasswordArgs = {
  email: Scalars['String'];
};

export type MutationResetPasswordConfirmArgs = {
  input: ResetPasswordConfirmInput;
};

export type MutationUpdateEquipmentStatusArgs = {
  input: UpdateEquipmentStatusInput;
};

export type MutationUpdateLocationStatusArgs = {
  input: UpdateLocationStatusInput;
};

export type MutationUpdateMeArgs = {
  input: UpdateMeInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type MutationUpsertEquipmentArgs = {
  input: UpsertEquipmentInput;
};

export type MutationUpsertLocationArgs = {
  input: UpsertLocationInput;
};

export type MutationUpsertRoomArgs = {
  input: UpsertRoomInput;
};

export enum OrderBy {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type Query = {
  getEquipment: EquipmentResponse;
  getEquipments: EquipmentListResponse;
  getLocation: LocationResponse;
  getLocations: LocationListResponse;
  getRoom: RoomResponse;
  getRooms: RoomListResponse;
  getUser: UserResponse;
  getUsers: ListUserResponse;
  me: UserResponse;
};

export type QueryGetEquipmentArgs = {
  id: Scalars['Float'];
};

export type QueryGetEquipmentsArgs = {
  input: GetEquipmentsInput;
};

export type QueryGetLocationArgs = {
  id: Scalars['Float'];
};

export type QueryGetLocationsArgs = {
  input: GetLocationsInput;
};

export type QueryGetRoomArgs = {
  id: Scalars['Float'];
};

export type QueryGetRoomsArgs = {
  input: GetRoomsInput;
};

export type QueryGetUserArgs = {
  id: Scalars['Float'];
};

export type QueryGetUsersArgs = {
  input: GetUsersInput;
};

export enum RoomStatus {
  Available = 'Available',
  NotAvailable = 'NotAvailable',
  Owned = 'Owned',
}

export type RegisterLoginInput = {
  address?: InputMaybe<Scalars['String']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  identityNumber?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type ResetPasswordConfirmInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type ResetPasswordResponse = {
  message?: Maybe<Scalars['String']>;
};

export type Room = {
  basePrice: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  equipments?: Maybe<Array<Equipment>>;
  floor?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  images?: Maybe<Scalars['String']>;
  location?: Maybe<Location>;
  locationId: Scalars['Float'];
  name?: Maybe<Scalars['String']>;
  status: RoomStatus;
  thumbnail?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type RoomListResponse = ListResponse & {
  items: Array<Room>;
  message?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  totalPages?: Maybe<Scalars['Float']>;
};

export type RoomResponse = IResponse & {
  message?: Maybe<Scalars['String']>;
  room?: Maybe<Room>;
};

export enum UserRole {
  Admin = 'Admin',
  Customer = 'Customer',
  SuperAdmin = 'SuperAdmin',
}

export type UpdateEquipmentStatusInput = {
  id: Scalars['Float'];
  isActive?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateLocationStatusInput = {
  id: Scalars['Float'];
  isActive: Scalars['Boolean'];
};

export type UpdateMeInput = {
  address?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  identityNumber?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['Float'];
  identityNumber?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  roomId?: InputMaybe<Scalars['Float']>;
};

export type UpsertEquipmentInput = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  image?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  roomId: Scalars['Float'];
};

export type UpsertLocationInput = {
  address?: InputMaybe<Scalars['String']>;
  contactInformations?: InputMaybe<Array<LocationContactInformationInput>>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  images?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  lat?: InputMaybe<Scalars['Float']>;
  long?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  numOfFloor: Scalars['Float'];
  thumbnail?: InputMaybe<Scalars['String']>;
};

export type UpsertRoomInput = {
  basePrice?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
  floor?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['Float']>;
  images?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  thumbnail?: InputMaybe<Scalars['String']>;
};

export type User = {
  address?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  dateOfBirth: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  identityNumber?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Location>;
  locationId?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  role: UserRole;
  room?: Maybe<Room>;
  roomId?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
};

export type UserResponse = IResponse & {
  message?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export const CreateUserDocument = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      message
      user {
        id
      }
    }
  }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument,
    options,
  );
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
  Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const LoginDocument = gql`
  mutation login($input: RegisterLoginInput!) {
    login(input: $input) {
      message
      accessToken
      refreshToken
      user {
        id
        email
        name
        identityNumber
        dateOfBirth
        avatar
        phoneNumber
        isActive
        role
        locationId
        location {
          id
          name
        }
      }
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const RegisterDocument = gql`
  mutation register($input: RegisterLoginInput!) {
    register(input: $input) {
      message
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options,
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const UpdateEquipmentStatusDocument = gql`
  mutation updateEquipmentStatus($input: UpdateEquipmentStatusInput!) {
    updateEquipmentStatus(input: $input) {
      message
      equipment {
        id
      }
    }
  }
`;
export type UpdateEquipmentStatusMutationFn = Apollo.MutationFunction<
  UpdateEquipmentStatusMutation,
  UpdateEquipmentStatusMutationVariables
>;

/**
 * __useUpdateEquipmentStatusMutation__
 *
 * To run a mutation, you first call `useUpdateEquipmentStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEquipmentStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEquipmentStatusMutation, { data, loading, error }] = useUpdateEquipmentStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEquipmentStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateEquipmentStatusMutation,
    UpdateEquipmentStatusMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateEquipmentStatusMutation,
    UpdateEquipmentStatusMutationVariables
  >(UpdateEquipmentStatusDocument, options);
}
export type UpdateEquipmentStatusMutationHookResult = ReturnType<
  typeof useUpdateEquipmentStatusMutation
>;
export type UpdateEquipmentStatusMutationResult =
  Apollo.MutationResult<UpdateEquipmentStatusMutation>;
export type UpdateEquipmentStatusMutationOptions = Apollo.BaseMutationOptions<
  UpdateEquipmentStatusMutation,
  UpdateEquipmentStatusMutationVariables
>;
export const UpdateMeDocument = gql`
  mutation updateMe($input: UpdateMeInput!) {
    updateMe(input: $input) {
      message
      user {
        id
      }
    }
  }
`;
export type UpdateMeMutationFn = Apollo.MutationFunction<
  UpdateMeMutation,
  UpdateMeMutationVariables
>;

/**
 * __useUpdateMeMutation__
 *
 * To run a mutation, you first call `useUpdateMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeMutation, { data, loading, error }] = useUpdateMeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateMeMutation,
    UpdateMeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateMeMutation, UpdateMeMutationVariables>(
    UpdateMeDocument,
    options,
  );
}
export type UpdateMeMutationHookResult = ReturnType<typeof useUpdateMeMutation>;
export type UpdateMeMutationResult = Apollo.MutationResult<UpdateMeMutation>;
export type UpdateMeMutationOptions = Apollo.BaseMutationOptions<
  UpdateMeMutation,
  UpdateMeMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      message
      user {
        id
      }
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options,
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const UpsertEquipmentDocument = gql`
  mutation upsertEquipment($input: UpsertEquipmentInput!) {
    upsertEquipment(input: $input) {
      message
      equipment {
        id
      }
    }
  }
`;
export type UpsertEquipmentMutationFn = Apollo.MutationFunction<
  UpsertEquipmentMutation,
  UpsertEquipmentMutationVariables
>;

/**
 * __useUpsertEquipmentMutation__
 *
 * To run a mutation, you first call `useUpsertEquipmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertEquipmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertEquipmentMutation, { data, loading, error }] = useUpsertEquipmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertEquipmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertEquipmentMutation,
    UpsertEquipmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpsertEquipmentMutation,
    UpsertEquipmentMutationVariables
  >(UpsertEquipmentDocument, options);
}
export type UpsertEquipmentMutationHookResult = ReturnType<
  typeof useUpsertEquipmentMutation
>;
export type UpsertEquipmentMutationResult =
  Apollo.MutationResult<UpsertEquipmentMutation>;
export type UpsertEquipmentMutationOptions = Apollo.BaseMutationOptions<
  UpsertEquipmentMutation,
  UpsertEquipmentMutationVariables
>;
export const UpsertRoomDocument = gql`
  mutation upsertRoom($input: UpsertRoomInput!) {
    upsertRoom(input: $input) {
      message
      room {
        id
      }
    }
  }
`;
export type UpsertRoomMutationFn = Apollo.MutationFunction<
  UpsertRoomMutation,
  UpsertRoomMutationVariables
>;

/**
 * __useUpsertRoomMutation__
 *
 * To run a mutation, you first call `useUpsertRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertRoomMutation, { data, loading, error }] = useUpsertRoomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertRoomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertRoomMutation,
    UpsertRoomMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpsertRoomMutation, UpsertRoomMutationVariables>(
    UpsertRoomDocument,
    options,
  );
}
export type UpsertRoomMutationHookResult = ReturnType<
  typeof useUpsertRoomMutation
>;
export type UpsertRoomMutationResult =
  Apollo.MutationResult<UpsertRoomMutation>;
export type UpsertRoomMutationOptions = Apollo.BaseMutationOptions<
  UpsertRoomMutation,
  UpsertRoomMutationVariables
>;
export const ChangeUserStatusDocument = gql`
  mutation changeUserStatus($input: ChangeUserStatusInput!) {
    changeUserStatus(input: $input)
  }
`;
export type ChangeUserStatusMutationFn = Apollo.MutationFunction<
  ChangeUserStatusMutation,
  ChangeUserStatusMutationVariables
>;

/**
 * __useChangeUserStatusMutation__
 *
 * To run a mutation, you first call `useChangeUserStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeUserStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeUserStatusMutation, { data, loading, error }] = useChangeUserStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeUserStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangeUserStatusMutation,
    ChangeUserStatusMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ChangeUserStatusMutation,
    ChangeUserStatusMutationVariables
  >(ChangeUserStatusDocument, options);
}
export type ChangeUserStatusMutationHookResult = ReturnType<
  typeof useChangeUserStatusMutation
>;
export type ChangeUserStatusMutationResult =
  Apollo.MutationResult<ChangeUserStatusMutation>;
export type ChangeUserStatusMutationOptions = Apollo.BaseMutationOptions<
  ChangeUserStatusMutation,
  ChangeUserStatusMutationVariables
>;
export const GetEquipmentDocument = gql`
  query getEquipment($id: Float!) {
    getEquipment(id: $id) {
      message
      equipment {
        id
        roomId
        locationId
        name
        description
        image
        isActive
        room {
          name
        }
        location {
          name
        }
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useGetEquipmentQuery__
 *
 * To run a query within a React component, call `useGetEquipmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEquipmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEquipmentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEquipmentQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetEquipmentQuery,
    GetEquipmentQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetEquipmentQuery, GetEquipmentQueryVariables>(
    GetEquipmentDocument,
    options,
  );
}
export function useGetEquipmentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetEquipmentQuery,
    GetEquipmentQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetEquipmentQuery, GetEquipmentQueryVariables>(
    GetEquipmentDocument,
    options,
  );
}
export type GetEquipmentQueryHookResult = ReturnType<
  typeof useGetEquipmentQuery
>;
export type GetEquipmentLazyQueryHookResult = ReturnType<
  typeof useGetEquipmentLazyQuery
>;
export type GetEquipmentQueryResult = Apollo.QueryResult<
  GetEquipmentQuery,
  GetEquipmentQueryVariables
>;
export function refetchGetEquipmentQuery(
  variables: GetEquipmentQueryVariables,
) {
  return { query: GetEquipmentDocument, variables: variables };
}
export const GetEquipmentsDocument = gql`
  query getEquipments($input: GetEquipmentsInput!) {
    getEquipments(input: $input) {
      page
      total
      totalPages
      message
      items {
        id
        roomId
        locationId
        name
        description
        image
        isActive
        room {
          name
        }
        location {
          name
        }
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useGetEquipmentsQuery__
 *
 * To run a query within a React component, call `useGetEquipmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEquipmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEquipmentsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetEquipmentsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetEquipmentsQuery,
    GetEquipmentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetEquipmentsQuery, GetEquipmentsQueryVariables>(
    GetEquipmentsDocument,
    options,
  );
}
export function useGetEquipmentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetEquipmentsQuery,
    GetEquipmentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetEquipmentsQuery, GetEquipmentsQueryVariables>(
    GetEquipmentsDocument,
    options,
  );
}
export type GetEquipmentsQueryHookResult = ReturnType<
  typeof useGetEquipmentsQuery
>;
export type GetEquipmentsLazyQueryHookResult = ReturnType<
  typeof useGetEquipmentsLazyQuery
>;
export type GetEquipmentsQueryResult = Apollo.QueryResult<
  GetEquipmentsQuery,
  GetEquipmentsQueryVariables
>;
export function refetchGetEquipmentsQuery(
  variables: GetEquipmentsQueryVariables,
) {
  return { query: GetEquipmentsDocument, variables: variables };
}
export const GetRoomDocument = gql`
  query getRoom($id: Float!) {
    getRoom(id: $id) {
      message
      room {
        id
        name
        locationId
        description
        images
        thumbnail
        status
        basePrice
        location {
          name
        }
        user {
          name
          email
          avatar
        }
        floor
        equipments {
          id
          roomId
          name
          description
          image
          isActive
        }
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useGetRoomQuery__
 *
 * To run a query within a React component, call `useGetRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRoomQuery(
  baseOptions: Apollo.QueryHookOptions<GetRoomQuery, GetRoomQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetRoomQuery, GetRoomQueryVariables>(
    GetRoomDocument,
    options,
  );
}
export function useGetRoomLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRoomQuery,
    GetRoomQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetRoomQuery, GetRoomQueryVariables>(
    GetRoomDocument,
    options,
  );
}
export type GetRoomQueryHookResult = ReturnType<typeof useGetRoomQuery>;
export type GetRoomLazyQueryHookResult = ReturnType<typeof useGetRoomLazyQuery>;
export type GetRoomQueryResult = Apollo.QueryResult<
  GetRoomQuery,
  GetRoomQueryVariables
>;
export function refetchGetRoomQuery(variables: GetRoomQueryVariables) {
  return { query: GetRoomDocument, variables: variables };
}
export const GetRoomsDocument = gql`
  query getRooms($input: GetRoomsInput!) {
    getRooms(input: $input) {
      page
      total
      totalPages
      message
      items {
        id
        name
        locationId
        description
        images
        thumbnail
        status
        basePrice
        locationId
        floor
        user {
          name
          email
          avatar
        }
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useGetRoomsQuery__
 *
 * To run a query within a React component, call `useGetRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetRoomsQuery(
  baseOptions: Apollo.QueryHookOptions<GetRoomsQuery, GetRoomsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetRoomsQuery, GetRoomsQueryVariables>(
    GetRoomsDocument,
    options,
  );
}
export function useGetRoomsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRoomsQuery,
    GetRoomsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetRoomsQuery, GetRoomsQueryVariables>(
    GetRoomsDocument,
    options,
  );
}
export type GetRoomsQueryHookResult = ReturnType<typeof useGetRoomsQuery>;
export type GetRoomsLazyQueryHookResult = ReturnType<
  typeof useGetRoomsLazyQuery
>;
export type GetRoomsQueryResult = Apollo.QueryResult<
  GetRoomsQuery,
  GetRoomsQueryVariables
>;
export function refetchGetRoomsQuery(variables: GetRoomsQueryVariables) {
  return { query: GetRoomsDocument, variables: variables };
}
export const GetUserDocument = gql`
  query getUser($id: Float!) {
    getUser(id: $id) {
      message
      user {
        id
        name
        email
        address
        phoneNumber
        dateOfBirth
        identityNumber
        avatar
        isActive
        role
        locationId
        location {
          id
        }
        room {
          name
        }
        roomId
        createdAt
      }
    }
  }
`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options,
  );
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserQuery,
    GetUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options,
  );
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>;
export function refetchGetUserQuery(variables: GetUserQueryVariables) {
  return { query: GetUserDocument, variables: variables };
}
export const GetUsersDocument = gql`
  query getUsers($input: GetUsersInput!) {
    getUsers(input: $input) {
      page
      total
      totalPages
      message
      items {
        id
        name
        email
        address
        phoneNumber
        dateOfBirth
        identityNumber
        avatar
        isActive
        role
        locationId
        location {
          id
        }
        room {
          name
        }
        roomId
        createdAt
      }
    }
  }
`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options,
  );
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options,
  );
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>;
export type GetUsersQueryResult = Apollo.QueryResult<
  GetUsersQuery,
  GetUsersQueryVariables
>;
export function refetchGetUsersQuery(variables: GetUsersQueryVariables) {
  return { query: GetUsersDocument, variables: variables };
}
export const MeDocument = gql`
  query me {
    me {
      message
      user {
        id
        name
        email
        address
        phoneNumber
        dateOfBirth
        role
        identityNumber
        avatar
        isActive
        locationId
        location {
          name
        }
        roomId
        room {
          name
        }
      }
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export function refetchMeQuery(variables?: MeQueryVariables) {
  return { query: MeDocument, variables: variables };
}
export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;

export type CreateUserMutation = {
  createUser: { message?: string | null; user?: { id: string } | null };
};

export type LoginMutationVariables = Exact<{
  input: RegisterLoginInput;
}>;

export type LoginMutation = {
  login: {
    message?: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
    user?: {
      id: string;
      email: string;
      name: string;
      identityNumber?: string | null;
      dateOfBirth: any;
      avatar?: string | null;
      phoneNumber?: string | null;
      isActive?: boolean | null;
      role: UserRole;
      locationId?: number | null;
      location?: { id: string; name: string } | null;
    } | null;
  };
};

export type RegisterMutationVariables = Exact<{
  input: RegisterLoginInput;
}>;

export type RegisterMutation = { register: { message?: string | null } };

export type UpdateEquipmentStatusMutationVariables = Exact<{
  input: UpdateEquipmentStatusInput;
}>;

export type UpdateEquipmentStatusMutation = {
  updateEquipmentStatus: {
    message?: string | null;
    equipment?: { id: string } | null;
  };
};

export type UpdateMeMutationVariables = Exact<{
  input: UpdateMeInput;
}>;

export type UpdateMeMutation = {
  updateMe: { message?: string | null; user?: { id: string } | null };
};

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;

export type UpdateUserMutation = {
  updateUser: { message?: string | null; user?: { id: string } | null };
};

export type UpsertEquipmentMutationVariables = Exact<{
  input: UpsertEquipmentInput;
}>;

export type UpsertEquipmentMutation = {
  upsertEquipment: {
    message?: string | null;
    equipment?: { id: string } | null;
  };
};

export type UpsertRoomMutationVariables = Exact<{
  input: UpsertRoomInput;
}>;

export type UpsertRoomMutation = {
  upsertRoom: { message?: string | null; room?: { id: string } | null };
};

export type ChangeUserStatusMutationVariables = Exact<{
  input: ChangeUserStatusInput;
}>;

export type ChangeUserStatusMutation = { changeUserStatus: string };

export type GetEquipmentQueryVariables = Exact<{
  id: Scalars['Float'];
}>;

export type GetEquipmentQuery = {
  getEquipment: {
    message?: string | null;
    equipment?: {
      id: string;
      roomId: number;
      locationId: number;
      name: string;
      description?: string | null;
      image?: string | null;
      isActive: boolean;
      createdAt: any;
      updatedAt: any;
      room: { name?: string | null };
      location: { name: string };
    } | null;
  };
};

export type GetEquipmentsQueryVariables = Exact<{
  input: GetEquipmentsInput;
}>;

export type GetEquipmentsQuery = {
  getEquipments: {
    page?: number | null;
    total?: number | null;
    totalPages?: number | null;
    message?: string | null;
    items: Array<{
      id: string;
      roomId: number;
      locationId: number;
      name: string;
      description?: string | null;
      image?: string | null;
      isActive: boolean;
      createdAt: any;
      updatedAt: any;
      room: { name?: string | null };
      location: { name: string };
    }>;
  };
};

export type GetRoomQueryVariables = Exact<{
  id: Scalars['Float'];
}>;

export type GetRoomQuery = {
  getRoom: {
    message?: string | null;
    room?: {
      id: string;
      name?: string | null;
      locationId: number;
      description?: string | null;
      images?: string | null;
      thumbnail?: string | null;
      status: RoomStatus;
      basePrice: number;
      floor?: number | null;
      createdAt: any;
      updatedAt: any;
      location?: { name: string } | null;
      user?: { name: string; email: string; avatar?: string | null } | null;
      equipments?: Array<{
        id: string;
        roomId: number;
        name: string;
        description?: string | null;
        image?: string | null;
        isActive: boolean;
      }> | null;
    } | null;
  };
};

export type GetRoomsQueryVariables = Exact<{
  input: GetRoomsInput;
}>;

export type GetRoomsQuery = {
  getRooms: {
    page?: number | null;
    total?: number | null;
    totalPages?: number | null;
    message?: string | null;
    items: Array<{
      id: string;
      name?: string | null;
      locationId: number;
      description?: string | null;
      images?: string | null;
      thumbnail?: string | null;
      status: RoomStatus;
      basePrice: number;
      floor?: number | null;
      createdAt: any;
      updatedAt: any;
      user?: { name: string; email: string; avatar?: string | null } | null;
    }>;
  };
};

export type GetUserQueryVariables = Exact<{
  id: Scalars['Float'];
}>;

export type GetUserQuery = {
  getUser: {
    message?: string | null;
    user?: {
      id: string;
      name: string;
      email: string;
      address?: string | null;
      phoneNumber?: string | null;
      dateOfBirth: any;
      identityNumber?: string | null;
      avatar?: string | null;
      isActive?: boolean | null;
      role: UserRole;
      locationId?: number | null;
      roomId?: number | null;
      createdAt: any;
      location?: { id: string } | null;
      room?: { name?: string | null } | null;
    } | null;
  };
};

export type GetUsersQueryVariables = Exact<{
  input: GetUsersInput;
}>;

export type GetUsersQuery = {
  getUsers: {
    page?: number | null;
    total?: number | null;
    totalPages?: number | null;
    message?: string | null;
    items: Array<{
      id: string;
      name: string;
      email: string;
      address?: string | null;
      phoneNumber?: string | null;
      dateOfBirth: any;
      identityNumber?: string | null;
      avatar?: string | null;
      isActive?: boolean | null;
      role: UserRole;
      locationId?: number | null;
      roomId?: number | null;
      createdAt: any;
      location?: { id: string } | null;
      room?: { name?: string | null } | null;
    }>;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  me: {
    message?: string | null;
    user?: {
      id: string;
      name: string;
      email: string;
      address?: string | null;
      phoneNumber?: string | null;
      dateOfBirth: any;
      role: UserRole;
      identityNumber?: string | null;
      avatar?: string | null;
      isActive?: boolean | null;
      locationId?: number | null;
      roomId?: number | null;
      location?: { name: string } | null;
      room?: { name?: string | null } | null;
    } | null;
  };
};
