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

export type ChangePasswordInputDto = {
  confirmNewPassword: Scalars['String'];
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type DeleteFileDto = {
  url: Scalars['String'];
};

export type IPreSignUrl = {
  fileType: Scalars['String'];
  pathFile: Scalars['String'];
  uploadUrl: Scalars['String'];
};

export type IUser = {
  accountVerified?: Maybe<Scalars['Boolean']>;
  address?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  civility?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActived?: Maybe<Scalars['Boolean']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  package?: Maybe<Package>;
  phoneNumber1?: Maybe<Scalars['String']>;
  phoneNumber2?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars['ID']>;
  town?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userType?: Maybe<UserType>;
};

export type LoginInputDto = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponseDto = {
  accountVerified?: Maybe<Scalars['Boolean']>;
  address?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  civility?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  facebookId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActived?: Maybe<Scalars['Boolean']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber1?: Maybe<Scalars['String']>;
  phoneNumber2?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  refreshToken: Scalars['String'];
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars['String']>;
  token: Scalars['String'];
  town?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type LogoutInputDto = {
  refreshToken: Scalars['String'];
};

export type Mutation = {
  changePassword: ResponseMessageBase;
  deleteFileS3: Scalars['String'];
  login: LoginResponseDto;
  loginFacebook: LoginResponseDto;
  loginGoogle: LoginResponseDto;
  logout: ResponseMessageBase;
  presignedUrlS3: IPreSignUrl;
  refreshToken: RefreshTokenOutputDto;
  register: RegisterResponseDto;
  resendOtp: ResponseMessageBase;
  resetPassword: ResponseMessageBase;
  updateCurrentUser: User;
  verifyCode: LoginResponseDto;
};

export type MutationChangePasswordArgs = {
  input: ChangePasswordInputDto;
};

export type MutationDeleteFileS3Args = {
  deleteFileDto: DeleteFileDto;
};

export type MutationLoginArgs = {
  input: LoginInputDto;
};

export type MutationLoginFacebookArgs = {
  token: Scalars['String'];
};

export type MutationLoginGoogleArgs = {
  token: Scalars['String'];
};

export type MutationLogoutArgs = {
  input: LogoutInputDto;
};

export type MutationPresignedUrlS3Args = {
  presignedUrlDto: PresignedUrlDto;
};

export type MutationRefreshTokenArgs = {
  input: RefreshTokenInputDto;
};

export type MutationRegisterArgs = {
  input: RegisterInputDto;
};

export type MutationResendOtpArgs = {
  email: Scalars['String'];
};

export type MutationResetPasswordArgs = {
  input: ResetPasswordInputDto;
};

export type MutationUpdateCurrentUserArgs = {
  input: UpdateUserInputDto;
};

export type MutationVerifyCodeArgs = {
  input: VerifyCodeInputDto;
};

export type Package = {
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PresignedUrlDto = {
  fileName: Scalars['String'];
  fileType: Scalars['String'];
  pathType: S3UploadType;
};

export type Query = {
  getCurrentUser: IUser;
  testQuery: Scalars['String'];
};

export type RefreshTokenInputDto = {
  refreshToken: Scalars['String'];
};

export type RefreshTokenOutputDto = {
  token: Scalars['String'];
};

export type RegisterInputDto = {
  accountVerified?: InputMaybe<Scalars['Boolean']>;
  avatar?: InputMaybe<Scalars['String']>;
  customerId?: InputMaybe<Scalars['Float']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  packageId?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  userTypeId?: InputMaybe<Scalars['String']>;
  verifyEmailCode?: InputMaybe<Scalars['String']>;
};

export type RegisterResponseDto = {
  accountVerified?: Maybe<Scalars['Boolean']>;
  avatar?: Maybe<Scalars['String']>;
  customerId?: Maybe<Scalars['Float']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  packageId?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  userTypeId?: Maybe<Scalars['String']>;
  verifyEmailCode?: Maybe<Scalars['String']>;
};

export type ResetPasswordInputDto = {
  confirmNewPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type ResponseMessageBase = {
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type Role = {
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export enum S3UploadType {
  Profile = 'Profile',
  Public = 'Public',
}

export type UpdateUserInputDto = {
  address?: InputMaybe<Scalars['String']>;
  civility?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber1?: InputMaybe<Scalars['String']>;
  phoneNumber2?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
  town?: InputMaybe<Scalars['String']>;
};

export type User = {
  accountVerified?: Maybe<Scalars['Boolean']>;
  address?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  civility?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  customerId?: Maybe<Scalars['Float']>;
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  facebookId?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  googleId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActived?: Maybe<Scalars['Boolean']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  lastName: Scalars['String'];
  package?: Maybe<Package>;
  packageId?: Maybe<Scalars['ID']>;
  password?: Maybe<Scalars['String']>;
  phoneNumber1?: Maybe<Scalars['String']>;
  phoneNumber2?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  resetPasswordExpire?: Maybe<Scalars['DateTime']>;
  resetPasswordToken?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  roleId?: Maybe<Scalars['ID']>;
  town?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userType?: Maybe<UserType>;
  userTypeId?: Maybe<Scalars['ID']>;
  verifyEmailCode?: Maybe<Scalars['String']>;
  verifyEmailCodeExpire?: Maybe<Scalars['DateTime']>;
};

export type UserType = {
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type VerifyCodeInputDto = {
  email: Scalars['String'];
  verifyCode: Scalars['String'];
};

export const ChangePasswordDocument = gql`
  mutation changePassword($input: ChangePasswordInputDto!) {
    changePassword(input: $input) {
      message
    }
  }
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument, options);
}
export type ChangePasswordMutationHookResult = ReturnType<
  typeof useChangePasswordMutation
>;
export type ChangePasswordMutationResult =
  Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>;
export const LoginDocument = gql`
  mutation login($input: LoginInputDto!) {
    login(input: $input) {
      id
      token
      refreshToken
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
export const LogoutDocument = gql`
  mutation logout($input: LogoutInputDto!) {
    logout(input: $input) {
      success
      message
    }
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options,
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const PresignedUrlS3Document = gql`
  mutation presignedUrlS3($presignedUrlDto: PresignedUrlDto!) {
    presignedUrlS3(presignedUrlDto: $presignedUrlDto) {
      pathFile
      fileType
      uploadUrl
    }
  }
`;
export type PresignedUrlS3MutationFn = Apollo.MutationFunction<
  PresignedUrlS3Mutation,
  PresignedUrlS3MutationVariables
>;

/**
 * __usePresignedUrlS3Mutation__
 *
 * To run a mutation, you first call `usePresignedUrlS3Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePresignedUrlS3Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [presignedUrlS3Mutation, { data, loading, error }] = usePresignedUrlS3Mutation({
 *   variables: {
 *      presignedUrlDto: // value for 'presignedUrlDto'
 *   },
 * });
 */
export function usePresignedUrlS3Mutation(
  baseOptions?: Apollo.MutationHookOptions<
    PresignedUrlS3Mutation,
    PresignedUrlS3MutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    PresignedUrlS3Mutation,
    PresignedUrlS3MutationVariables
  >(PresignedUrlS3Document, options);
}
export type PresignedUrlS3MutationHookResult = ReturnType<
  typeof usePresignedUrlS3Mutation
>;
export type PresignedUrlS3MutationResult =
  Apollo.MutationResult<PresignedUrlS3Mutation>;
export type PresignedUrlS3MutationOptions = Apollo.BaseMutationOptions<
  PresignedUrlS3Mutation,
  PresignedUrlS3MutationVariables
>;
export const RefreshTokenDocument = gql`
  mutation refreshToken($input: RefreshTokenInputDto!) {
    refreshToken(input: $input) {
      token
    }
  }
`;
export type RefreshTokenMutationFn = Apollo.MutationFunction<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRefreshTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >(RefreshTokenDocument, options);
}
export type RefreshTokenMutationHookResult = ReturnType<
  typeof useRefreshTokenMutation
>;
export type RefreshTokenMutationResult =
  Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;
export const RegisterDocument = gql`
  mutation register($input: RegisterInputDto!) {
    register(input: $input) {
      email
      password
      firstName
      lastName
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
export const GetCurrentUserDocument = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      civility
      firstName
      lastName
      email
      phoneNumber1
      phoneNumber2
      dateOfBirth
      country
      town
      address
      postalCode
      avatar
      accountVerified
      isActived
      isDeleted
      roleId
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    options,
  );
}
export function useGetCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    options,
  );
}
export type GetCurrentUserQueryHookResult = ReturnType<
  typeof useGetCurrentUserQuery
>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<
  typeof useGetCurrentUserLazyQuery
>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables
>;
export function refetchGetCurrentUserQuery(
  variables?: GetCurrentUserQueryVariables,
) {
  return { query: GetCurrentUserDocument, variables: variables };
}
export const TestQueryDocument = gql`
  query testQuery {
    testQuery
  }
`;

/**
 * __useTestQueryQuery__
 *
 * To run a query within a React component, call `useTestQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestQueryQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TestQueryQuery,
    TestQueryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TestQueryQuery, TestQueryQueryVariables>(
    TestQueryDocument,
    options,
  );
}
export function useTestQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TestQueryQuery,
    TestQueryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TestQueryQuery, TestQueryQueryVariables>(
    TestQueryDocument,
    options,
  );
}
export type TestQueryQueryHookResult = ReturnType<typeof useTestQueryQuery>;
export type TestQueryLazyQueryHookResult = ReturnType<
  typeof useTestQueryLazyQuery
>;
export type TestQueryQueryResult = Apollo.QueryResult<
  TestQueryQuery,
  TestQueryQueryVariables
>;
export function refetchTestQueryQuery(variables?: TestQueryQueryVariables) {
  return { query: TestQueryDocument, variables: variables };
}
export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInputDto;
}>;

export type ChangePasswordMutation = { changePassword: { message: string } };

export type LoginMutationVariables = Exact<{
  input: LoginInputDto;
}>;

export type LoginMutation = {
  login: { id: string; token: string; refreshToken: string };
};

export type LogoutMutationVariables = Exact<{
  input: LogoutInputDto;
}>;

export type LogoutMutation = { logout: { success: boolean; message: string } };

export type PresignedUrlS3MutationVariables = Exact<{
  presignedUrlDto: PresignedUrlDto;
}>;

export type PresignedUrlS3Mutation = {
  presignedUrlS3: { pathFile: string; fileType: string; uploadUrl: string };
};

export type RefreshTokenMutationVariables = Exact<{
  input: RefreshTokenInputDto;
}>;

export type RefreshTokenMutation = { refreshToken: { token: string } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInputDto;
}>;

export type RegisterMutation = {
  register: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  };
};

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentUserQuery = {
  getCurrentUser: {
    id: string;
    civility?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    phoneNumber1?: string | null;
    phoneNumber2?: string | null;
    dateOfBirth?: any | null;
    country?: string | null;
    town?: string | null;
    address?: string | null;
    postalCode?: string | null;
    avatar?: string | null;
    accountVerified?: boolean | null;
    isActived?: boolean | null;
    isDeleted?: boolean | null;
    roleId?: string | null;
    createdAt?: any | null;
    updatedAt?: any | null;
  };
};

export type TestQueryQueryVariables = Exact<{ [key: string]: never }>;

export type TestQueryQuery = { testQuery: string };
