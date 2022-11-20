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
  JSONObject: any;
};

export type Amenity = {
  amenityType: AmenityType;
  amenityTypeId: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  location: Location;
  locationId: Scalars['Float'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type AmenityListResponse = ListResponse & {
  items: Array<Amenity>;
  message?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  totalPages?: Maybe<Scalars['Float']>;
};

export type AmenityResponse = IResponse & {
  amenity?: Maybe<Amenity>;
  message?: Maybe<Scalars['String']>;
};

export type AmenityType = {
  amenities?: Maybe<Array<Amenity>>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type AmenityTypeListResponse = ListResponse & {
  items: Array<AmenityType>;
  message?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  totalPages?: Maybe<Scalars['Float']>;
};

export type AmenityTypeResponse = IResponse & {
  amenityType?: Maybe<AmenityType>;
  message?: Maybe<Scalars['String']>;
};

export type ChangeLocationReservationStatusInput = {
  locationReservationId: Scalars['Float'];
  status: Scalars['String'];
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

export type CreateInstallationInput = {
  firebaseToken: Scalars['String'];
  userId: Scalars['Float'];
};

export type CreateStripeCheckoutInput = {
  cancelUrl: Scalars['String'];
  paymentId: Scalars['Float'];
  successUrl: Scalars['String'];
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

export enum DiscountType {
  FixedCashDiscount = 'FixedCashDiscount',
  PercentageDiscount = 'PercentageDiscount',
}

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

export type GetAmenitiesInput = {
  amenityTypeId?: InputMaybe<Scalars['Float']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Float']>;
  locationId?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<OrderBy>;
  page?: InputMaybe<Scalars['Float']>;
};

export type GetAmenityTypesInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<OrderBy>;
  page?: InputMaybe<Scalars['Float']>;
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

export type GetIncidentCategoriesInput = {
  limit?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<OrderBy>;
  page?: InputMaybe<Scalars['Float']>;
};

export type GetIncidentsInput = {
  dueDate?: InputMaybe<Scalars['DateTime']>;
  employeeId?: InputMaybe<Scalars['Float']>;
  fromCustomer?: InputMaybe<Scalars['Boolean']>;
  incidentCategoryId?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
  locationId?: InputMaybe<Scalars['Float']>;
  orderBy?: InputMaybe<OrderBy>;
  page?: InputMaybe<Scalars['Float']>;
  priority?: InputMaybe<IncidentPriority>;
  reporterId?: InputMaybe<Scalars['Float']>;
  roomId?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<IncidentStatus>;
  title?: InputMaybe<Scalars['String']>;
};

export type GetLocationReservationsInput = {
  createdById?: InputMaybe<Scalars['Float']>;
  fromDate?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Float']>;
  locationId?: InputMaybe<Scalars['Float']>;
  orderBy?: InputMaybe<OrderBy>;
  page?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<LocationReservationStatus>;
  toDate?: InputMaybe<Scalars['DateTime']>;
};

export type GetLocationServicesInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<OrderBy>;
  page?: InputMaybe<Scalars['Float']>;
};

export type GetLocationsInput = {
  address?: InputMaybe<Scalars['String']>;
  distance?: InputMaybe<Scalars['Float']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  lat?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
  locationServiceIds?: InputMaybe<Array<Scalars['Float']>>;
  long?: InputMaybe<Scalars['Float']>;
  maxPrice?: InputMaybe<Scalars['Float']>;
  minPrice?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Float']>;
};

export type GetMyNotificationStatusResponse = {
  message: Scalars['String'];
  total: Scalars['Float'];
};

export type GetNotificationsInput = {
  isAdminOnly?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Float']>;
  locationId?: InputMaybe<Scalars['Float']>;
  orderBy?: InputMaybe<OrderBy>;
  page?: InputMaybe<Scalars['Float']>;
  type?: InputMaybe<NotificationType>;
  userId?: InputMaybe<Scalars['Float']>;
};

export type GetPaymentsInput = {
  floor?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
  locationId?: InputMaybe<Scalars['Float']>;
  locationReservationId?: InputMaybe<Scalars['Float']>;
  orderBy?: InputMaybe<OrderBy>;
  page?: InputMaybe<Scalars['Float']>;
  roomId?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<PaymentStatus>;
  userIds?: InputMaybe<Array<Scalars['Float']>>;
};

export type GetRoomsInput = {
  capacity?: InputMaybe<Scalars['Float']>;
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

export enum IncidentPriority {
  High = 'High',
  Low = 'Low',
  Medium = 'Medium',
  Urgent = 'Urgent',
}

export enum IncidentStatus {
  Cancel = 'Cancel',
  Done = 'Done',
  InProgress = 'InProgress',
  Overdue = 'Overdue',
  ToDo = 'ToDo',
}

export type IResponse = {
  message?: Maybe<Scalars['String']>;
};

export type Incident = {
  completedDate?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['DateTime']>;
  employee?: Maybe<User>;
  employeeId?: Maybe<Scalars['Float']>;
  fromCustomer?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  images?: Maybe<Scalars['String']>;
  incidentCategory: IncidentCategory;
  incidentCategoryId: Scalars['Float'];
  location: Location;
  locationId: Scalars['Float'];
  priority?: Maybe<IncidentPriority>;
  reportImages?: Maybe<Scalars['String']>;
  reportMessage?: Maybe<Scalars['String']>;
  reporter: User;
  reporterId: Scalars['Float'];
  room: Room;
  roomId: Scalars['Float'];
  status?: Maybe<IncidentStatus>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type IncidentCategory = {
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  incidents?: Maybe<Array<Incident>>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type IncidentCategoryListResponse = ListResponse & {
  items: Array<IncidentCategory>;
  message?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  totalPages?: Maybe<Scalars['Float']>;
};

export type IncidentCategoryResponse = IResponse & {
  incidentCategory?: Maybe<IncidentCategory>;
  message?: Maybe<Scalars['String']>;
};

export type IncidentListResponse = ListResponse & {
  items: Array<Incident>;
  message?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  totalPages?: Maybe<Scalars['Float']>;
};

export type IncidentResponse = IResponse & {
  incident?: Maybe<Incident>;
  message?: Maybe<Scalars['String']>;
};

export enum LocationReservationStatus {
  Completed = 'Completed',
  Draft = 'Draft',
  Published = 'Published',
}

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
  amenities: Array<Amenity>;
  contactInformations?: Maybe<Array<ContactInformation>>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  electricCounterPrice?: Maybe<Scalars['Float']>;
  equipments?: Maybe<Array<Equipment>>;
  geoLocation?: Maybe<Scalars['JSONObject']>;
  id: Scalars['ID'];
  images?: Maybe<Scalars['String']>;
  incidents: Array<Incident>;
  income: Scalars['Float'];
  isActive: Scalars['Boolean'];
  lat?: Maybe<Scalars['Float']>;
  locationReservations?: Maybe<Array<LocationReservation>>;
  locationServices: Array<LocationService>;
  long?: Maybe<Scalars['Float']>;
  minPrice?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  notification: Array<Notification>;
  numOfFloor?: Maybe<Scalars['Float']>;
  payments?: Maybe<Array<Payment>>;
  rooms?: Maybe<Array<Room>>;
  stripeAccountId?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  totalRevenue?: Maybe<Scalars['Float']>;
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

export type LocationReservation = {
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['Float'];
  id: Scalars['ID'];
  location: Location;
  locationId: Scalars['Float'];
  payments?: Maybe<Array<Payment>>;
  startDate: Scalars['DateTime'];
  status: Scalars['String'];
  totalCalculatedPrice: Scalars['Float'];
  totalReceivedPrice: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type LocationReservationListResponse = ListResponse & {
  items: Array<LocationReservation>;
  message?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  totalPages?: Maybe<Scalars['Float']>;
};

export type LocationReservationResponse = IResponse & {
  locationReservation?: Maybe<LocationReservation>;
  message?: Maybe<Scalars['String']>;
};

export type LocationResponse = IResponse & {
  location?: Maybe<Location>;
  message?: Maybe<Scalars['String']>;
};

export type LocationService = {
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type LocationServiceListResponse = ListResponse & {
  items: Array<LocationService>;
  message?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  totalPages?: Maybe<Scalars['Float']>;
};

export type LocationServiceResponse = IResponse & {
  locationService?: Maybe<LocationService>;
  message?: Maybe<Scalars['String']>;
};

export type LoginResponse = IResponse & {
  accessToken?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Mutation = {
  authorizeCode: Scalars['String'];
  changeLocationReservationStatus: LocationReservationResponse;
  changePassword: Scalars['String'];
  changeUserStatus: Scalars['String'];
  createInstallation: Scalars['String'];
  createStripeCheckoutSession: StripeResponse;
  createUser: UserResponse;
  deleteAmenity: Scalars['String'];
  deleteEquipment: Scalars['String'];
  deleteLocationReservation: Scalars['String'];
  deleteRoom: Scalars['String'];
  getAccessToken: LoginResponse;
  login: LoginResponse;
  manuallyPay: PaymentResponse;
  readNotification: Scalars['String'];
  register: UserResponse;
  resetPassword: ResetPasswordResponse;
  resetPasswordConfirm: ResetPasswordResponse;
  updateAmenityStatus: AmenityResponse;
  updateEquipmentStatus: EquipmentResponse;
  updateIncidentForEmployee: IncidentResponse;
  updateLocationStatus: LocationResponse;
  updateMe: UserResponse;
  updatePaymentStatus: PaymentResponse;
  updateUser: UserResponse;
  upsertAmenity: AmenityResponse;
  upsertAmenityType: AmenityTypeResponse;
  upsertEquipment: EquipmentResponse;
  upsertIncident: IncidentResponse;
  upsertIncidentCategory: IncidentCategoryResponse;
  upsertLocation: LocationResponse;
  upsertLocationReservation: LocationReservationResponse;
  upsertLocationService: LocationServiceResponse;
  upsertPayment: PaymentResponse;
  upsertRoom: RoomResponse;
};

export type MutationAuthorizeCodeArgs = {
  code: Scalars['String'];
};

export type MutationChangeLocationReservationStatusArgs = {
  input: ChangeLocationReservationStatusInput;
};

export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};

export type MutationChangeUserStatusArgs = {
  input: ChangeUserStatusInput;
};

export type MutationCreateInstallationArgs = {
  input: CreateInstallationInput;
};

export type MutationCreateStripeCheckoutSessionArgs = {
  input: CreateStripeCheckoutInput;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationDeleteAmenityArgs = {
  id: Scalars['Float'];
};

export type MutationDeleteEquipmentArgs = {
  id: Scalars['Float'];
};

export type MutationDeleteLocationReservationArgs = {
  id: Scalars['Float'];
};

export type MutationDeleteRoomArgs = {
  id: Scalars['Float'];
};

export type MutationGetAccessTokenArgs = {
  input: GetAccessTokenInput;
};

export type MutationLoginArgs = {
  input: RegisterLoginInput;
};

export type MutationManuallyPayArgs = {
  id: Scalars['Float'];
};

export type MutationReadNotificationArgs = {
  id: Scalars['Float'];
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

export type MutationUpdateAmenityStatusArgs = {
  input: UpdateAmenityStatusInput;
};

export type MutationUpdateEquipmentStatusArgs = {
  input: UpdateEquipmentStatusInput;
};

export type MutationUpdateIncidentForEmployeeArgs = {
  input: UpdateIncidentForEmployeeInput;
};

export type MutationUpdateLocationStatusArgs = {
  input: UpdateLocationStatusInput;
};

export type MutationUpdateMeArgs = {
  input: UpdateMeInput;
};

export type MutationUpdatePaymentStatusArgs = {
  input: UpdatePaymentStatusInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type MutationUpsertAmenityArgs = {
  input: UpsertAmenityInput;
};

export type MutationUpsertAmenityTypeArgs = {
  input: UpsertAmenityTypeInput;
};

export type MutationUpsertEquipmentArgs = {
  input: UpsertEquipmentInput;
};

export type MutationUpsertIncidentArgs = {
  input: UpsertIncidentInput;
};

export type MutationUpsertIncidentCategoryArgs = {
  input: UpsertIncidentCategoriesInput;
};

export type MutationUpsertLocationArgs = {
  input: UpsertLocationInput;
};

export type MutationUpsertLocationReservationArgs = {
  input: UpsertLocationReservationInput;
};

export type MutationUpsertLocationServiceArgs = {
  input: UpsertLocationServiceInput;
};

export type MutationUpsertPaymentArgs = {
  input: UpsertPaymentInput;
};

export type MutationUpsertRoomArgs = {
  input: UpsertRoomInput;
};

export enum NotificationType {
  Announcement = 'Announcement',
  Incident = 'Incident',
  Other = 'Other',
  Payment = 'Payment',
}

export type Notification = {
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  dataId?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  isAdminOnly?: Maybe<Scalars['Boolean']>;
  isRead?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Location>;
  locationId?: Maybe<Scalars['Float']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['Float'];
};

export type NotificationListResponse = ListResponse & {
  items: Array<Notification>;
  message?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  totalPages?: Maybe<Scalars['Float']>;
};

export enum OrderBy {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum PaymentStatus {
  Canceled = 'Canceled',
  MissingLivingPrice = 'MissingLivingPrice',
  Paid = 'Paid',
  Unpaid = 'Unpaid',
}

export type Payment = {
  createdAt: Scalars['DateTime'];
  discount?: Maybe<Scalars['Float']>;
  discountType?: Maybe<DiscountType>;
  electricCounter?: Maybe<Scalars['Float']>;
  extraFee?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  location: Location;
  locationId: Scalars['Float'];
  locationReservation: LocationReservation;
  locationReservationId: Scalars['Float'];
  prePaidFee?: Maybe<Scalars['Float']>;
  room: Room;
  roomId: Scalars['Float'];
  status: PaymentStatus;
  totalPrice?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
  users?: Maybe<Array<User>>;
  waterPrice?: Maybe<Scalars['Float']>;
};

export type PaymentListResponse = ListResponse & {
  items: Array<Payment>;
  message?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  totalPages?: Maybe<Scalars['Float']>;
};

export type PaymentResponse = IResponse & {
  message?: Maybe<Scalars['String']>;
  payment?: Maybe<Payment>;
};

export type Query = {
  getAmenities: AmenityListResponse;
  getAmenity: AmenityResponse;
  getAmenityType: AmenityTypeResponse;
  getAmenityTypes: AmenityTypeListResponse;
  getEquipment: EquipmentResponse;
  getEquipments: EquipmentListResponse;
  getIncident: IncidentResponse;
  getIncidentCategories: IncidentCategoryListResponse;
  getIncidentCategory: IncidentCategoryResponse;
  getIncidents: IncidentListResponse;
  getLocation: LocationResponse;
  getLocationReservation: LocationReservationResponse;
  getLocationReservations: LocationReservationListResponse;
  getLocationService: LocationServiceResponse;
  getLocationServices: LocationServiceListResponse;
  getLocations: LocationListResponse;
  getMyNotificationStatus: GetMyNotificationStatusResponse;
  getNotifications: NotificationListResponse;
  getPayment: PaymentResponse;
  getPayments: PaymentListResponse;
  getRoom: RoomResponse;
  getRooms: RoomListResponse;
  getUser: UserResponse;
  getUsers: ListUserResponse;
  me: UserResponse;
};

export type QueryGetAmenitiesArgs = {
  input: GetAmenitiesInput;
};

export type QueryGetAmenityArgs = {
  id: Scalars['Float'];
};

export type QueryGetAmenityTypeArgs = {
  id: Scalars['Float'];
};

export type QueryGetAmenityTypesArgs = {
  input: GetAmenityTypesInput;
};

export type QueryGetEquipmentArgs = {
  id: Scalars['Float'];
};

export type QueryGetEquipmentsArgs = {
  input: GetEquipmentsInput;
};

export type QueryGetIncidentArgs = {
  id: Scalars['Float'];
};

export type QueryGetIncidentCategoriesArgs = {
  input: GetIncidentCategoriesInput;
};

export type QueryGetIncidentCategoryArgs = {
  id: Scalars['Float'];
};

export type QueryGetIncidentsArgs = {
  input: GetIncidentsInput;
};

export type QueryGetLocationArgs = {
  id: Scalars['Float'];
};

export type QueryGetLocationReservationArgs = {
  id: Scalars['Float'];
};

export type QueryGetLocationReservationsArgs = {
  input: GetLocationReservationsInput;
};

export type QueryGetLocationServiceArgs = {
  id: Scalars['Float'];
};

export type QueryGetLocationServicesArgs = {
  input: GetLocationServicesInput;
};

export type QueryGetLocationsArgs = {
  input: GetLocationsInput;
};

export type QueryGetNotificationsArgs = {
  input: GetNotificationsInput;
};

export type QueryGetPaymentArgs = {
  id: Scalars['Float'];
};

export type QueryGetPaymentsArgs = {
  input: GetPaymentsInput;
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
  capacity?: Maybe<Scalars['Float']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  equipments?: Maybe<Array<Equipment>>;
  floor?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  images?: Maybe<Scalars['String']>;
  incidents?: Maybe<Array<Incident>>;
  location?: Maybe<Location>;
  locationId: Scalars['Float'];
  name?: Maybe<Scalars['String']>;
  payments?: Maybe<Array<Payment>>;
  status: RoomStatus;
  thumbnail?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  users?: Maybe<Array<User>>;
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

export type StripeResponse = IResponse & {
  message?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export enum UserRole {
  Admin = 'Admin',
  Customer = 'Customer',
  SuperAdmin = 'SuperAdmin',
}

export type UpdateAmenityStatusInput = {
  id: Scalars['Float'];
  isActive?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateEquipmentStatusInput = {
  id: Scalars['Float'];
  isActive?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateIncidentForEmployeeInput = {
  employeeId?: InputMaybe<Scalars['Float']>;
  id: Scalars['Float'];
  priority?: InputMaybe<Scalars['String']>;
  reportImages?: InputMaybe<Scalars['String']>;
  reportMessage?: InputMaybe<Scalars['String']>;
  status: IncidentStatus;
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

export type UpdatePaymentStatusInput = {
  id: Scalars['Float'];
  status: PaymentStatus;
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

export type UpsertAmenityInput = {
  amenityTypeId: Scalars['Float'];
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  image?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  locationId?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpsertAmenityTypeInput = {
  description?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpsertEquipmentInput = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  image?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  roomId: Scalars['Float'];
};

export type UpsertIncidentCategoriesInput = {
  description?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpsertIncidentInput = {
  description?: InputMaybe<Scalars['String']>;
  dueDate?: InputMaybe<Scalars['DateTime']>;
  employeeId?: InputMaybe<Scalars['Float']>;
  fromCustomer?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['Float']>;
  images?: InputMaybe<Scalars['String']>;
  incidentCategoryId: Scalars['Float'];
  locationId: Scalars['Float'];
  priority?: InputMaybe<IncidentPriority>;
  reportImages?: InputMaybe<Scalars['String']>;
  reportMessage?: InputMaybe<Scalars['String']>;
  reporterId: Scalars['Float'];
  roomId?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<IncidentStatus>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpsertLocationInput = {
  address?: InputMaybe<Scalars['String']>;
  contactInformations?: InputMaybe<Array<LocationContactInformationInput>>;
  description?: InputMaybe<Scalars['String']>;
  electricCounterPrice?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['Float']>;
  images?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  lat?: InputMaybe<Scalars['Float']>;
  locationServiceIds?: InputMaybe<Array<Scalars['Float']>>;
  long?: InputMaybe<Scalars['Float']>;
  minPrice?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  numOfFloor: Scalars['Float'];
  thumbnail?: InputMaybe<Scalars['String']>;
};

export type UpsertLocationReservationInput = {
  createdById: Scalars['Float'];
  id?: InputMaybe<Scalars['Float']>;
  locationId: Scalars['Float'];
  startDate: Scalars['DateTime'];
  status?: InputMaybe<LocationReservationStatus>;
};

export type UpsertLocationServiceInput = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpsertPaymentInput = {
  discount?: InputMaybe<Scalars['Float']>;
  discountType?: InputMaybe<DiscountType>;
  electricCounter?: InputMaybe<Scalars['Float']>;
  extraFee?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['Float']>;
  locationId: Scalars['Float'];
  locationReservationId: Scalars['Float'];
  prePaidFee?: InputMaybe<Scalars['Float']>;
  roomId: Scalars['Float'];
  status?: InputMaybe<PaymentStatus>;
  userIds?: InputMaybe<Array<Scalars['Float']>>;
  waterPrice?: InputMaybe<Scalars['Float']>;
};

export type UpsertRoomInput = {
  basePrice?: InputMaybe<Scalars['Float']>;
  capacity?: InputMaybe<Scalars['Float']>;
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
  employeeIncidents?: Maybe<Array<Incident>>;
  firebaseToken?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  identityNumber?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Location>;
  locationId?: Maybe<Scalars['Float']>;
  locationReservations?: Maybe<Array<LocationReservation>>;
  name: Scalars['String'];
  notification?: Maybe<Array<Notification>>;
  payments?: Maybe<Array<Payment>>;
  phoneNumber?: Maybe<Scalars['String']>;
  reportIncidents?: Maybe<Array<Incident>>;
  role: UserRole;
  room?: Maybe<Room>;
  roomId?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
};

export type UserResponse = IResponse & {
  message?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export const AuthorizeCodeDocument = gql`
  mutation authorizeCode($code: String!) {
    authorizeCode(code: $code)
  }
`;
export type AuthorizeCodeMutationFn = Apollo.MutationFunction<
  AuthorizeCodeMutation,
  AuthorizeCodeMutationVariables
>;

/**
 * __useAuthorizeCodeMutation__
 *
 * To run a mutation, you first call `useAuthorizeCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthorizeCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authorizeCodeMutation, { data, loading, error }] = useAuthorizeCodeMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useAuthorizeCodeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AuthorizeCodeMutation,
    AuthorizeCodeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AuthorizeCodeMutation,
    AuthorizeCodeMutationVariables
  >(AuthorizeCodeDocument, options);
}
export type AuthorizeCodeMutationHookResult = ReturnType<
  typeof useAuthorizeCodeMutation
>;
export type AuthorizeCodeMutationResult =
  Apollo.MutationResult<AuthorizeCodeMutation>;
export type AuthorizeCodeMutationOptions = Apollo.BaseMutationOptions<
  AuthorizeCodeMutation,
  AuthorizeCodeMutationVariables
>;
export const ChangeLocationReservationStatusDocument = gql`
  mutation changeLocationReservationStatus(
    $input: ChangeLocationReservationStatusInput!
  ) {
    changeLocationReservationStatus(input: $input) {
      message
      locationReservation {
        id
        status
      }
    }
  }
`;
export type ChangeLocationReservationStatusMutationFn = Apollo.MutationFunction<
  ChangeLocationReservationStatusMutation,
  ChangeLocationReservationStatusMutationVariables
>;

/**
 * __useChangeLocationReservationStatusMutation__
 *
 * To run a mutation, you first call `useChangeLocationReservationStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeLocationReservationStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeLocationReservationStatusMutation, { data, loading, error }] = useChangeLocationReservationStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeLocationReservationStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangeLocationReservationStatusMutation,
    ChangeLocationReservationStatusMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ChangeLocationReservationStatusMutation,
    ChangeLocationReservationStatusMutationVariables
  >(ChangeLocationReservationStatusDocument, options);
}
export type ChangeLocationReservationStatusMutationHookResult = ReturnType<
  typeof useChangeLocationReservationStatusMutation
>;
export type ChangeLocationReservationStatusMutationResult =
  Apollo.MutationResult<ChangeLocationReservationStatusMutation>;
export type ChangeLocationReservationStatusMutationOptions =
  Apollo.BaseMutationOptions<
    ChangeLocationReservationStatusMutation,
    ChangeLocationReservationStatusMutationVariables
  >;
export const CreateInstallationDocument = gql`
  mutation createInstallation($input: CreateInstallationInput!) {
    createInstallation(input: $input)
  }
`;
export type CreateInstallationMutationFn = Apollo.MutationFunction<
  CreateInstallationMutation,
  CreateInstallationMutationVariables
>;

/**
 * __useCreateInstallationMutation__
 *
 * To run a mutation, you first call `useCreateInstallationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInstallationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInstallationMutation, { data, loading, error }] = useCreateInstallationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateInstallationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateInstallationMutation,
    CreateInstallationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateInstallationMutation,
    CreateInstallationMutationVariables
  >(CreateInstallationDocument, options);
}
export type CreateInstallationMutationHookResult = ReturnType<
  typeof useCreateInstallationMutation
>;
export type CreateInstallationMutationResult =
  Apollo.MutationResult<CreateInstallationMutation>;
export type CreateInstallationMutationOptions = Apollo.BaseMutationOptions<
  CreateInstallationMutation,
  CreateInstallationMutationVariables
>;
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
export const DeleteAmenityDocument = gql`
  mutation deleteAmenity($id: Float!) {
    deleteAmenity(id: $id)
  }
`;
export type DeleteAmenityMutationFn = Apollo.MutationFunction<
  DeleteAmenityMutation,
  DeleteAmenityMutationVariables
>;

/**
 * __useDeleteAmenityMutation__
 *
 * To run a mutation, you first call `useDeleteAmenityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAmenityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAmenityMutation, { data, loading, error }] = useDeleteAmenityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAmenityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteAmenityMutation,
    DeleteAmenityMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteAmenityMutation,
    DeleteAmenityMutationVariables
  >(DeleteAmenityDocument, options);
}
export type DeleteAmenityMutationHookResult = ReturnType<
  typeof useDeleteAmenityMutation
>;
export type DeleteAmenityMutationResult =
  Apollo.MutationResult<DeleteAmenityMutation>;
export type DeleteAmenityMutationOptions = Apollo.BaseMutationOptions<
  DeleteAmenityMutation,
  DeleteAmenityMutationVariables
>;
export const DeleteEquipmentDocument = gql`
  mutation deleteEquipment($id: Float!) {
    deleteEquipment(id: $id)
  }
`;
export type DeleteEquipmentMutationFn = Apollo.MutationFunction<
  DeleteEquipmentMutation,
  DeleteEquipmentMutationVariables
>;

/**
 * __useDeleteEquipmentMutation__
 *
 * To run a mutation, you first call `useDeleteEquipmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEquipmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEquipmentMutation, { data, loading, error }] = useDeleteEquipmentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEquipmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteEquipmentMutation,
    DeleteEquipmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteEquipmentMutation,
    DeleteEquipmentMutationVariables
  >(DeleteEquipmentDocument, options);
}
export type DeleteEquipmentMutationHookResult = ReturnType<
  typeof useDeleteEquipmentMutation
>;
export type DeleteEquipmentMutationResult =
  Apollo.MutationResult<DeleteEquipmentMutation>;
export type DeleteEquipmentMutationOptions = Apollo.BaseMutationOptions<
  DeleteEquipmentMutation,
  DeleteEquipmentMutationVariables
>;
export const DeleteLocationReservationDocument = gql`
  mutation deleteLocationReservation($id: Float!) {
    deleteLocationReservation(id: $id)
  }
`;
export type DeleteLocationReservationMutationFn = Apollo.MutationFunction<
  DeleteLocationReservationMutation,
  DeleteLocationReservationMutationVariables
>;

/**
 * __useDeleteLocationReservationMutation__
 *
 * To run a mutation, you first call `useDeleteLocationReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLocationReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLocationReservationMutation, { data, loading, error }] = useDeleteLocationReservationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLocationReservationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteLocationReservationMutation,
    DeleteLocationReservationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteLocationReservationMutation,
    DeleteLocationReservationMutationVariables
  >(DeleteLocationReservationDocument, options);
}
export type DeleteLocationReservationMutationHookResult = ReturnType<
  typeof useDeleteLocationReservationMutation
>;
export type DeleteLocationReservationMutationResult =
  Apollo.MutationResult<DeleteLocationReservationMutation>;
export type DeleteLocationReservationMutationOptions =
  Apollo.BaseMutationOptions<
    DeleteLocationReservationMutation,
    DeleteLocationReservationMutationVariables
  >;
export const DeleteRoomDocument = gql`
  mutation deleteRoom($id: Float!) {
    deleteRoom(id: $id)
  }
`;
export type DeleteRoomMutationFn = Apollo.MutationFunction<
  DeleteRoomMutation,
  DeleteRoomMutationVariables
>;

/**
 * __useDeleteRoomMutation__
 *
 * To run a mutation, you first call `useDeleteRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoomMutation, { data, loading, error }] = useDeleteRoomMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRoomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteRoomMutation,
    DeleteRoomMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteRoomMutation, DeleteRoomMutationVariables>(
    DeleteRoomDocument,
    options,
  );
}
export type DeleteRoomMutationHookResult = ReturnType<
  typeof useDeleteRoomMutation
>;
export type DeleteRoomMutationResult =
  Apollo.MutationResult<DeleteRoomMutation>;
export type DeleteRoomMutationOptions = Apollo.BaseMutationOptions<
  DeleteRoomMutation,
  DeleteRoomMutationVariables
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
export const ManuallyPayDocument = gql`
  mutation manuallyPay($id: Float!) {
    manuallyPay(id: $id) {
      message
      payment {
        id
        status
      }
    }
  }
`;
export type ManuallyPayMutationFn = Apollo.MutationFunction<
  ManuallyPayMutation,
  ManuallyPayMutationVariables
>;

/**
 * __useManuallyPayMutation__
 *
 * To run a mutation, you first call `useManuallyPayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useManuallyPayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [manuallyPayMutation, { data, loading, error }] = useManuallyPayMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useManuallyPayMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ManuallyPayMutation,
    ManuallyPayMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ManuallyPayMutation, ManuallyPayMutationVariables>(
    ManuallyPayDocument,
    options,
  );
}
export type ManuallyPayMutationHookResult = ReturnType<
  typeof useManuallyPayMutation
>;
export type ManuallyPayMutationResult =
  Apollo.MutationResult<ManuallyPayMutation>;
export type ManuallyPayMutationOptions = Apollo.BaseMutationOptions<
  ManuallyPayMutation,
  ManuallyPayMutationVariables
>;
export const ReadNotificationDocument = gql`
  mutation readNotification($id: Float!) {
    readNotification(id: $id)
  }
`;
export type ReadNotificationMutationFn = Apollo.MutationFunction<
  ReadNotificationMutation,
  ReadNotificationMutationVariables
>;

/**
 * __useReadNotificationMutation__
 *
 * To run a mutation, you first call `useReadNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readNotificationMutation, { data, loading, error }] = useReadNotificationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReadNotificationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ReadNotificationMutation,
    ReadNotificationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ReadNotificationMutation,
    ReadNotificationMutationVariables
  >(ReadNotificationDocument, options);
}
export type ReadNotificationMutationHookResult = ReturnType<
  typeof useReadNotificationMutation
>;
export type ReadNotificationMutationResult =
  Apollo.MutationResult<ReadNotificationMutation>;
export type ReadNotificationMutationOptions = Apollo.BaseMutationOptions<
  ReadNotificationMutation,
  ReadNotificationMutationVariables
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
export const UpdateAmenityStatusDocument = gql`
  mutation updateAmenityStatus($input: UpdateAmenityStatusInput!) {
    updateAmenityStatus(input: $input) {
      message
      amenity {
        id
      }
    }
  }
`;
export type UpdateAmenityStatusMutationFn = Apollo.MutationFunction<
  UpdateAmenityStatusMutation,
  UpdateAmenityStatusMutationVariables
>;

/**
 * __useUpdateAmenityStatusMutation__
 *
 * To run a mutation, you first call `useUpdateAmenityStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAmenityStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAmenityStatusMutation, { data, loading, error }] = useUpdateAmenityStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAmenityStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateAmenityStatusMutation,
    UpdateAmenityStatusMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateAmenityStatusMutation,
    UpdateAmenityStatusMutationVariables
  >(UpdateAmenityStatusDocument, options);
}
export type UpdateAmenityStatusMutationHookResult = ReturnType<
  typeof useUpdateAmenityStatusMutation
>;
export type UpdateAmenityStatusMutationResult =
  Apollo.MutationResult<UpdateAmenityStatusMutation>;
export type UpdateAmenityStatusMutationOptions = Apollo.BaseMutationOptions<
  UpdateAmenityStatusMutation,
  UpdateAmenityStatusMutationVariables
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
export const UpdateIncidentForEmployeeDocument = gql`
  mutation updateIncidentForEmployee($input: UpdateIncidentForEmployeeInput!) {
    updateIncidentForEmployee(input: $input) {
      message
      incident {
        id
      }
    }
  }
`;
export type UpdateIncidentForEmployeeMutationFn = Apollo.MutationFunction<
  UpdateIncidentForEmployeeMutation,
  UpdateIncidentForEmployeeMutationVariables
>;

/**
 * __useUpdateIncidentForEmployeeMutation__
 *
 * To run a mutation, you first call `useUpdateIncidentForEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIncidentForEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateIncidentForEmployeeMutation, { data, loading, error }] = useUpdateIncidentForEmployeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateIncidentForEmployeeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateIncidentForEmployeeMutation,
    UpdateIncidentForEmployeeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateIncidentForEmployeeMutation,
    UpdateIncidentForEmployeeMutationVariables
  >(UpdateIncidentForEmployeeDocument, options);
}
export type UpdateIncidentForEmployeeMutationHookResult = ReturnType<
  typeof useUpdateIncidentForEmployeeMutation
>;
export type UpdateIncidentForEmployeeMutationResult =
  Apollo.MutationResult<UpdateIncidentForEmployeeMutation>;
export type UpdateIncidentForEmployeeMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateIncidentForEmployeeMutation,
    UpdateIncidentForEmployeeMutationVariables
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
export const UpsertAmenityDocument = gql`
  mutation upsertAmenity($input: UpsertAmenityInput!) {
    upsertAmenity(input: $input) {
      message
      amenity {
        id
      }
    }
  }
`;
export type UpsertAmenityMutationFn = Apollo.MutationFunction<
  UpsertAmenityMutation,
  UpsertAmenityMutationVariables
>;

/**
 * __useUpsertAmenityMutation__
 *
 * To run a mutation, you first call `useUpsertAmenityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertAmenityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertAmenityMutation, { data, loading, error }] = useUpsertAmenityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertAmenityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertAmenityMutation,
    UpsertAmenityMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpsertAmenityMutation,
    UpsertAmenityMutationVariables
  >(UpsertAmenityDocument, options);
}
export type UpsertAmenityMutationHookResult = ReturnType<
  typeof useUpsertAmenityMutation
>;
export type UpsertAmenityMutationResult =
  Apollo.MutationResult<UpsertAmenityMutation>;
export type UpsertAmenityMutationOptions = Apollo.BaseMutationOptions<
  UpsertAmenityMutation,
  UpsertAmenityMutationVariables
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
export const UpsertIncidentDocument = gql`
  mutation upsertIncident($input: UpsertIncidentInput!) {
    upsertIncident(input: $input) {
      message
      incident {
        id
      }
    }
  }
`;
export type UpsertIncidentMutationFn = Apollo.MutationFunction<
  UpsertIncidentMutation,
  UpsertIncidentMutationVariables
>;

/**
 * __useUpsertIncidentMutation__
 *
 * To run a mutation, you first call `useUpsertIncidentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertIncidentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertIncidentMutation, { data, loading, error }] = useUpsertIncidentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertIncidentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertIncidentMutation,
    UpsertIncidentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpsertIncidentMutation,
    UpsertIncidentMutationVariables
  >(UpsertIncidentDocument, options);
}
export type UpsertIncidentMutationHookResult = ReturnType<
  typeof useUpsertIncidentMutation
>;
export type UpsertIncidentMutationResult =
  Apollo.MutationResult<UpsertIncidentMutation>;
export type UpsertIncidentMutationOptions = Apollo.BaseMutationOptions<
  UpsertIncidentMutation,
  UpsertIncidentMutationVariables
>;
export const UpsertIncidentCategoryDocument = gql`
  mutation upsertIncidentCategory($input: UpsertIncidentCategoriesInput!) {
    upsertIncidentCategory(input: $input) {
      message
      incidentCategory {
        id
      }
    }
  }
`;
export type UpsertIncidentCategoryMutationFn = Apollo.MutationFunction<
  UpsertIncidentCategoryMutation,
  UpsertIncidentCategoryMutationVariables
>;

/**
 * __useUpsertIncidentCategoryMutation__
 *
 * To run a mutation, you first call `useUpsertIncidentCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertIncidentCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertIncidentCategoryMutation, { data, loading, error }] = useUpsertIncidentCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertIncidentCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertIncidentCategoryMutation,
    UpsertIncidentCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpsertIncidentCategoryMutation,
    UpsertIncidentCategoryMutationVariables
  >(UpsertIncidentCategoryDocument, options);
}
export type UpsertIncidentCategoryMutationHookResult = ReturnType<
  typeof useUpsertIncidentCategoryMutation
>;
export type UpsertIncidentCategoryMutationResult =
  Apollo.MutationResult<UpsertIncidentCategoryMutation>;
export type UpsertIncidentCategoryMutationOptions = Apollo.BaseMutationOptions<
  UpsertIncidentCategoryMutation,
  UpsertIncidentCategoryMutationVariables
>;
export const UpsertLocationDocument = gql`
  mutation upsertLocation($input: UpsertLocationInput!) {
    upsertLocation(input: $input) {
      message
      location {
        id
      }
    }
  }
`;
export type UpsertLocationMutationFn = Apollo.MutationFunction<
  UpsertLocationMutation,
  UpsertLocationMutationVariables
>;

/**
 * __useUpsertLocationMutation__
 *
 * To run a mutation, you first call `useUpsertLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertLocationMutation, { data, loading, error }] = useUpsertLocationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertLocationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertLocationMutation,
    UpsertLocationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpsertLocationMutation,
    UpsertLocationMutationVariables
  >(UpsertLocationDocument, options);
}
export type UpsertLocationMutationHookResult = ReturnType<
  typeof useUpsertLocationMutation
>;
export type UpsertLocationMutationResult =
  Apollo.MutationResult<UpsertLocationMutation>;
export type UpsertLocationMutationOptions = Apollo.BaseMutationOptions<
  UpsertLocationMutation,
  UpsertLocationMutationVariables
>;
export const UpsertLocationReservationDocument = gql`
  mutation upsertLocationReservation($input: UpsertLocationReservationInput!) {
    upsertLocationReservation(input: $input) {
      message
      locationReservation {
        id
      }
    }
  }
`;
export type UpsertLocationReservationMutationFn = Apollo.MutationFunction<
  UpsertLocationReservationMutation,
  UpsertLocationReservationMutationVariables
>;

/**
 * __useUpsertLocationReservationMutation__
 *
 * To run a mutation, you first call `useUpsertLocationReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertLocationReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertLocationReservationMutation, { data, loading, error }] = useUpsertLocationReservationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertLocationReservationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertLocationReservationMutation,
    UpsertLocationReservationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpsertLocationReservationMutation,
    UpsertLocationReservationMutationVariables
  >(UpsertLocationReservationDocument, options);
}
export type UpsertLocationReservationMutationHookResult = ReturnType<
  typeof useUpsertLocationReservationMutation
>;
export type UpsertLocationReservationMutationResult =
  Apollo.MutationResult<UpsertLocationReservationMutation>;
export type UpsertLocationReservationMutationOptions =
  Apollo.BaseMutationOptions<
    UpsertLocationReservationMutation,
    UpsertLocationReservationMutationVariables
  >;
export const UpsertPaymentDocument = gql`
  mutation upsertPayment($input: UpsertPaymentInput!) {
    upsertPayment(input: $input) {
      message
      payment {
        id
      }
    }
  }
`;
export type UpsertPaymentMutationFn = Apollo.MutationFunction<
  UpsertPaymentMutation,
  UpsertPaymentMutationVariables
>;

/**
 * __useUpsertPaymentMutation__
 *
 * To run a mutation, you first call `useUpsertPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertPaymentMutation, { data, loading, error }] = useUpsertPaymentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertPaymentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpsertPaymentMutation,
    UpsertPaymentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpsertPaymentMutation,
    UpsertPaymentMutationVariables
  >(UpsertPaymentDocument, options);
}
export type UpsertPaymentMutationHookResult = ReturnType<
  typeof useUpsertPaymentMutation
>;
export type UpsertPaymentMutationResult =
  Apollo.MutationResult<UpsertPaymentMutation>;
export type UpsertPaymentMutationOptions = Apollo.BaseMutationOptions<
  UpsertPaymentMutation,
  UpsertPaymentMutationVariables
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
export const GetAmenitiesDocument = gql`
  query getAmenities($input: GetAmenitiesInput!) {
    getAmenities(input: $input) {
      page
      total
      totalPages
      message
      items {
        id
        name
        description
        image
        isActive
        amenityTypeId
        amenityType {
          id
          name
          description
        }
        locationId
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
 * __useGetAmenitiesQuery__
 *
 * To run a query within a React component, call `useGetAmenitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAmenitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAmenitiesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAmenitiesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAmenitiesQuery,
    GetAmenitiesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAmenitiesQuery, GetAmenitiesQueryVariables>(
    GetAmenitiesDocument,
    options,
  );
}
export function useGetAmenitiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAmenitiesQuery,
    GetAmenitiesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAmenitiesQuery, GetAmenitiesQueryVariables>(
    GetAmenitiesDocument,
    options,
  );
}
export type GetAmenitiesQueryHookResult = ReturnType<
  typeof useGetAmenitiesQuery
>;
export type GetAmenitiesLazyQueryHookResult = ReturnType<
  typeof useGetAmenitiesLazyQuery
>;
export type GetAmenitiesQueryResult = Apollo.QueryResult<
  GetAmenitiesQuery,
  GetAmenitiesQueryVariables
>;
export function refetchGetAmenitiesQuery(
  variables: GetAmenitiesQueryVariables,
) {
  return { query: GetAmenitiesDocument, variables: variables };
}
export const GetAmenityTypesDocument = gql`
  query getAmenityTypes($input: GetAmenityTypesInput!) {
    getAmenityTypes(input: $input) {
      page
      total
      totalPages
      message
      items {
        id
        name
        icon
        description
        isActive
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useGetAmenityTypesQuery__
 *
 * To run a query within a React component, call `useGetAmenityTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAmenityTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAmenityTypesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAmenityTypesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAmenityTypesQuery,
    GetAmenityTypesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAmenityTypesQuery, GetAmenityTypesQueryVariables>(
    GetAmenityTypesDocument,
    options,
  );
}
export function useGetAmenityTypesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAmenityTypesQuery,
    GetAmenityTypesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAmenityTypesQuery,
    GetAmenityTypesQueryVariables
  >(GetAmenityTypesDocument, options);
}
export type GetAmenityTypesQueryHookResult = ReturnType<
  typeof useGetAmenityTypesQuery
>;
export type GetAmenityTypesLazyQueryHookResult = ReturnType<
  typeof useGetAmenityTypesLazyQuery
>;
export type GetAmenityTypesQueryResult = Apollo.QueryResult<
  GetAmenityTypesQuery,
  GetAmenityTypesQueryVariables
>;
export function refetchGetAmenityTypesQuery(
  variables: GetAmenityTypesQueryVariables,
) {
  return { query: GetAmenityTypesDocument, variables: variables };
}
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
          id
          name
          description
        }
        location {
          id
          name
          description
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
export const GetIncidentDocument = gql`
  query getIncident($id: Float!) {
    getIncident(id: $id) {
      message
      incident {
        id
        title
        description
        fromCustomer
        dueDate
        priority
        images
        reportImages
        reportMessage
        status
        employeeId
        employee {
          id
          name
          email
          avatar
        }
        reporterId
        reporter {
          id
          name
          email
          avatar
        }
        roomId
        room {
          id
          name
          floor
          thumbnail
        }
        incidentCategoryId
        incidentCategory {
          id
          name
          description
        }
        locationId
        location {
          name
          address
          thumbnail
        }
        createdAt
      }
    }
  }
`;

/**
 * __useGetIncidentQuery__
 *
 * To run a query within a React component, call `useGetIncidentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIncidentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIncidentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetIncidentQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetIncidentQuery,
    GetIncidentQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetIncidentQuery, GetIncidentQueryVariables>(
    GetIncidentDocument,
    options,
  );
}
export function useGetIncidentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetIncidentQuery,
    GetIncidentQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetIncidentQuery, GetIncidentQueryVariables>(
    GetIncidentDocument,
    options,
  );
}
export type GetIncidentQueryHookResult = ReturnType<typeof useGetIncidentQuery>;
export type GetIncidentLazyQueryHookResult = ReturnType<
  typeof useGetIncidentLazyQuery
>;
export type GetIncidentQueryResult = Apollo.QueryResult<
  GetIncidentQuery,
  GetIncidentQueryVariables
>;
export function refetchGetIncidentQuery(variables: GetIncidentQueryVariables) {
  return { query: GetIncidentDocument, variables: variables };
}
export const GetIncidentCategoriesDocument = gql`
  query getIncidentCategories($input: GetIncidentCategoriesInput!) {
    getIncidentCategories(input: $input) {
      page
      total
      totalPages
      message
      items {
        id
        name
        description
        icon
        createdAt
      }
    }
  }
`;

/**
 * __useGetIncidentCategoriesQuery__
 *
 * To run a query within a React component, call `useGetIncidentCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIncidentCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIncidentCategoriesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetIncidentCategoriesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetIncidentCategoriesQuery,
    GetIncidentCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetIncidentCategoriesQuery,
    GetIncidentCategoriesQueryVariables
  >(GetIncidentCategoriesDocument, options);
}
export function useGetIncidentCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetIncidentCategoriesQuery,
    GetIncidentCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetIncidentCategoriesQuery,
    GetIncidentCategoriesQueryVariables
  >(GetIncidentCategoriesDocument, options);
}
export type GetIncidentCategoriesQueryHookResult = ReturnType<
  typeof useGetIncidentCategoriesQuery
>;
export type GetIncidentCategoriesLazyQueryHookResult = ReturnType<
  typeof useGetIncidentCategoriesLazyQuery
>;
export type GetIncidentCategoriesQueryResult = Apollo.QueryResult<
  GetIncidentCategoriesQuery,
  GetIncidentCategoriesQueryVariables
>;
export function refetchGetIncidentCategoriesQuery(
  variables: GetIncidentCategoriesQueryVariables,
) {
  return { query: GetIncidentCategoriesDocument, variables: variables };
}
export const GetIncidentsDocument = gql`
  query getIncidents($input: GetIncidentsInput!) {
    getIncidents(input: $input) {
      page
      total
      totalPages
      message
      items {
        id
        title
        description
        fromCustomer
        dueDate
        priority
        images
        reportImages
        reportMessage
        status
        employeeId
        employee {
          id
          name
          email
          avatar
        }
        reporterId
        reporter {
          id
          name
          email
          avatar
        }
        roomId
        room {
          id
          name
          floor
          thumbnail
          description
        }
        incidentCategoryId
        incidentCategory {
          id
          name
          description
        }
        locationId
        location {
          name
          address
          thumbnail
        }
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useGetIncidentsQuery__
 *
 * To run a query within a React component, call `useGetIncidentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIncidentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIncidentsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetIncidentsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetIncidentsQuery,
    GetIncidentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetIncidentsQuery, GetIncidentsQueryVariables>(
    GetIncidentsDocument,
    options,
  );
}
export function useGetIncidentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetIncidentsQuery,
    GetIncidentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetIncidentsQuery, GetIncidentsQueryVariables>(
    GetIncidentsDocument,
    options,
  );
}
export type GetIncidentsQueryHookResult = ReturnType<
  typeof useGetIncidentsQuery
>;
export type GetIncidentsLazyQueryHookResult = ReturnType<
  typeof useGetIncidentsLazyQuery
>;
export type GetIncidentsQueryResult = Apollo.QueryResult<
  GetIncidentsQuery,
  GetIncidentsQueryVariables
>;
export function refetchGetIncidentsQuery(
  variables: GetIncidentsQueryVariables,
) {
  return { query: GetIncidentsDocument, variables: variables };
}
export const GetLocationDocument = gql`
  query getLocation($id: Float!) {
    getLocation(id: $id) {
      message
      location {
        id
        name
        address
        long
        lat
        images
        thumbnail
        description
        numOfFloor
        income
        isActive
        createdAt
        minPrice
        locationServices {
          id
          name
          description
        }
        totalRevenue
        contactInformations {
          address
          name
          id
          phoneNumber
          email
        }
      }
    }
  }
`;

/**
 * __useGetLocationQuery__
 *
 * To run a query within a React component, call `useGetLocationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLocationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLocationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLocationQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetLocationQuery,
    GetLocationQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetLocationQuery, GetLocationQueryVariables>(
    GetLocationDocument,
    options,
  );
}
export function useGetLocationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLocationQuery,
    GetLocationQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetLocationQuery, GetLocationQueryVariables>(
    GetLocationDocument,
    options,
  );
}
export type GetLocationQueryHookResult = ReturnType<typeof useGetLocationQuery>;
export type GetLocationLazyQueryHookResult = ReturnType<
  typeof useGetLocationLazyQuery
>;
export type GetLocationQueryResult = Apollo.QueryResult<
  GetLocationQuery,
  GetLocationQueryVariables
>;
export function refetchGetLocationQuery(variables: GetLocationQueryVariables) {
  return { query: GetLocationDocument, variables: variables };
}
export const GetLocationReservationDocument = gql`
  query getLocationReservation($id: Float!) {
    getLocationReservation(id: $id) {
      message
      locationReservation {
        id
        totalCalculatedPrice
        status
        totalReceivedPrice
        startDate
        createdById
        createdBy {
          id
          name
          avatar
          email
        }
        locationId
        location {
          name
          images
        }
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useGetLocationReservationQuery__
 *
 * To run a query within a React component, call `useGetLocationReservationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLocationReservationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLocationReservationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLocationReservationQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetLocationReservationQuery,
    GetLocationReservationQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetLocationReservationQuery,
    GetLocationReservationQueryVariables
  >(GetLocationReservationDocument, options);
}
export function useGetLocationReservationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLocationReservationQuery,
    GetLocationReservationQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetLocationReservationQuery,
    GetLocationReservationQueryVariables
  >(GetLocationReservationDocument, options);
}
export type GetLocationReservationQueryHookResult = ReturnType<
  typeof useGetLocationReservationQuery
>;
export type GetLocationReservationLazyQueryHookResult = ReturnType<
  typeof useGetLocationReservationLazyQuery
>;
export type GetLocationReservationQueryResult = Apollo.QueryResult<
  GetLocationReservationQuery,
  GetLocationReservationQueryVariables
>;
export function refetchGetLocationReservationQuery(
  variables: GetLocationReservationQueryVariables,
) {
  return { query: GetLocationReservationDocument, variables: variables };
}
export const GetLocationReservationsDocument = gql`
  query getLocationReservations($input: GetLocationReservationsInput!) {
    getLocationReservations(input: $input) {
      page
      total
      totalPages
      message
      items {
        id
        totalCalculatedPrice
        status
        totalReceivedPrice
        startDate
        createdById
        createdBy {
          id
          name
          avatar
          email
        }
        locationId
        location {
          name
          images
        }
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useGetLocationReservationsQuery__
 *
 * To run a query within a React component, call `useGetLocationReservationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLocationReservationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLocationReservationsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetLocationReservationsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetLocationReservationsQuery,
    GetLocationReservationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetLocationReservationsQuery,
    GetLocationReservationsQueryVariables
  >(GetLocationReservationsDocument, options);
}
export function useGetLocationReservationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLocationReservationsQuery,
    GetLocationReservationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetLocationReservationsQuery,
    GetLocationReservationsQueryVariables
  >(GetLocationReservationsDocument, options);
}
export type GetLocationReservationsQueryHookResult = ReturnType<
  typeof useGetLocationReservationsQuery
>;
export type GetLocationReservationsLazyQueryHookResult = ReturnType<
  typeof useGetLocationReservationsLazyQuery
>;
export type GetLocationReservationsQueryResult = Apollo.QueryResult<
  GetLocationReservationsQuery,
  GetLocationReservationsQueryVariables
>;
export function refetchGetLocationReservationsQuery(
  variables: GetLocationReservationsQueryVariables,
) {
  return { query: GetLocationReservationsDocument, variables: variables };
}
export const GetLocationServicesDocument = gql`
  query getLocationServices($input: GetLocationServicesInput!) {
    getLocationServices(input: $input) {
      page
      total
      totalPages
      message
      items {
        id
        name
        description
        isActive
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useGetLocationServicesQuery__
 *
 * To run a query within a React component, call `useGetLocationServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLocationServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLocationServicesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetLocationServicesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetLocationServicesQuery,
    GetLocationServicesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetLocationServicesQuery,
    GetLocationServicesQueryVariables
  >(GetLocationServicesDocument, options);
}
export function useGetLocationServicesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLocationServicesQuery,
    GetLocationServicesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetLocationServicesQuery,
    GetLocationServicesQueryVariables
  >(GetLocationServicesDocument, options);
}
export type GetLocationServicesQueryHookResult = ReturnType<
  typeof useGetLocationServicesQuery
>;
export type GetLocationServicesLazyQueryHookResult = ReturnType<
  typeof useGetLocationServicesLazyQuery
>;
export type GetLocationServicesQueryResult = Apollo.QueryResult<
  GetLocationServicesQuery,
  GetLocationServicesQueryVariables
>;
export function refetchGetLocationServicesQuery(
  variables: GetLocationServicesQueryVariables,
) {
  return { query: GetLocationServicesDocument, variables: variables };
}
export const GetMyNotificationStatusDocument = gql`
  query getMyNotificationStatus {
    getMyNotificationStatus {
      message
      total
    }
  }
`;

/**
 * __useGetMyNotificationStatusQuery__
 *
 * To run a query within a React component, call `useGetMyNotificationStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyNotificationStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyNotificationStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyNotificationStatusQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMyNotificationStatusQuery,
    GetMyNotificationStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetMyNotificationStatusQuery,
    GetMyNotificationStatusQueryVariables
  >(GetMyNotificationStatusDocument, options);
}
export function useGetMyNotificationStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyNotificationStatusQuery,
    GetMyNotificationStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetMyNotificationStatusQuery,
    GetMyNotificationStatusQueryVariables
  >(GetMyNotificationStatusDocument, options);
}
export type GetMyNotificationStatusQueryHookResult = ReturnType<
  typeof useGetMyNotificationStatusQuery
>;
export type GetMyNotificationStatusLazyQueryHookResult = ReturnType<
  typeof useGetMyNotificationStatusLazyQuery
>;
export type GetMyNotificationStatusQueryResult = Apollo.QueryResult<
  GetMyNotificationStatusQuery,
  GetMyNotificationStatusQueryVariables
>;
export function refetchGetMyNotificationStatusQuery(
  variables?: GetMyNotificationStatusQueryVariables,
) {
  return { query: GetMyNotificationStatusDocument, variables: variables };
}
export const GetNotificationsDocument = gql`
  query getNotifications($input: GetNotificationsInput!) {
    getNotifications(input: $input) {
      page
      total
      totalPages
      message
      items {
        id
        content
        title
        dataId
        isRead
        image
        type
        userId
        createdAt
      }
    }
  }
`;

/**
 * __useGetNotificationsQuery__
 *
 * To run a query within a React component, call `useGetNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetNotificationsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetNotificationsQuery,
    GetNotificationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(
    GetNotificationsDocument,
    options,
  );
}
export function useGetNotificationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetNotificationsQuery,
    GetNotificationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetNotificationsQuery,
    GetNotificationsQueryVariables
  >(GetNotificationsDocument, options);
}
export type GetNotificationsQueryHookResult = ReturnType<
  typeof useGetNotificationsQuery
>;
export type GetNotificationsLazyQueryHookResult = ReturnType<
  typeof useGetNotificationsLazyQuery
>;
export type GetNotificationsQueryResult = Apollo.QueryResult<
  GetNotificationsQuery,
  GetNotificationsQueryVariables
>;
export function refetchGetNotificationsQuery(
  variables: GetNotificationsQueryVariables,
) {
  return { query: GetNotificationsDocument, variables: variables };
}
export const GetPaymentDocument = gql`
  query getPayment($id: Float!) {
    getPayment(id: $id) {
      message
      payment {
        id
        totalPrice
        electricCounter
        waterPrice
        discount
        discountType
        status
        prePaidFee
        extraFee
        users {
          name
          id
          email
          avatar
        }
        roomId
        room {
          name
          floor
          basePrice
          thumbnail
        }
        locationReservationId
        locationReservation {
          totalCalculatedPrice
          totalReceivedPrice
        }
        locationId
        location {
          name
          electricCounterPrice
        }
      }
    }
  }
`;

/**
 * __useGetPaymentQuery__
 *
 * To run a query within a React component, call `useGetPaymentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPaymentQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPaymentQuery,
    GetPaymentQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPaymentQuery, GetPaymentQueryVariables>(
    GetPaymentDocument,
    options,
  );
}
export function useGetPaymentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPaymentQuery,
    GetPaymentQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPaymentQuery, GetPaymentQueryVariables>(
    GetPaymentDocument,
    options,
  );
}
export type GetPaymentQueryHookResult = ReturnType<typeof useGetPaymentQuery>;
export type GetPaymentLazyQueryHookResult = ReturnType<
  typeof useGetPaymentLazyQuery
>;
export type GetPaymentQueryResult = Apollo.QueryResult<
  GetPaymentQuery,
  GetPaymentQueryVariables
>;
export function refetchGetPaymentQuery(variables: GetPaymentQueryVariables) {
  return { query: GetPaymentDocument, variables: variables };
}
export const GetPaymentsDocument = gql`
  query getPayments($input: GetPaymentsInput!) {
    getPayments(input: $input) {
      page
      total
      totalPages
      message
      items {
        id
        totalPrice
        electricCounter
        waterPrice
        discount
        discountType
        status
        prePaidFee
        extraFee
        users {
          name
          id
          email
          avatar
        }
        roomId
        room {
          name
          floor
          thumbnail
          basePrice
        }
        locationReservationId
        locationReservation {
          totalCalculatedPrice
          totalReceivedPrice
        }
        locationId
        location {
          name
          electricCounterPrice
        }
        createdAt
        updatedAt
      }
    }
  }
`;

/**
 * __useGetPaymentsQuery__
 *
 * To run a query within a React component, call `useGetPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPaymentsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPaymentsQuery,
    GetPaymentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(
    GetPaymentsDocument,
    options,
  );
}
export function useGetPaymentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPaymentsQuery,
    GetPaymentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(
    GetPaymentsDocument,
    options,
  );
}
export type GetPaymentsQueryHookResult = ReturnType<typeof useGetPaymentsQuery>;
export type GetPaymentsLazyQueryHookResult = ReturnType<
  typeof useGetPaymentsLazyQuery
>;
export type GetPaymentsQueryResult = Apollo.QueryResult<
  GetPaymentsQuery,
  GetPaymentsQueryVariables
>;
export function refetchGetPaymentsQuery(variables: GetPaymentsQueryVariables) {
  return { query: GetPaymentsDocument, variables: variables };
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
        capacity
        basePrice
        location {
          id
          name
        }
        users {
          id
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
        capacity
        users {
          id
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
          description
        }
        roomId
        createdAt
        updatedAt
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
          stripeAccountId
          numOfFloor
          electricCounterPrice
          isActive
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
export type AuthorizeCodeMutationVariables = Exact<{
  code: Scalars['String'];
}>;

export type AuthorizeCodeMutation = { authorizeCode: string };

export type ChangeLocationReservationStatusMutationVariables = Exact<{
  input: ChangeLocationReservationStatusInput;
}>;

export type ChangeLocationReservationStatusMutation = {
  changeLocationReservationStatus: {
    message?: string | null;
    locationReservation?: { id: string; status: string } | null;
  };
};

export type CreateInstallationMutationVariables = Exact<{
  input: CreateInstallationInput;
}>;

export type CreateInstallationMutation = { createInstallation: string };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;

export type CreateUserMutation = {
  createUser: { message?: string | null; user?: { id: string } | null };
};

export type DeleteAmenityMutationVariables = Exact<{
  id: Scalars['Float'];
}>;

export type DeleteAmenityMutation = { deleteAmenity: string };

export type DeleteEquipmentMutationVariables = Exact<{
  id: Scalars['Float'];
}>;

export type DeleteEquipmentMutation = { deleteEquipment: string };

export type DeleteLocationReservationMutationVariables = Exact<{
  id: Scalars['Float'];
}>;

export type DeleteLocationReservationMutation = {
  deleteLocationReservation: string;
};

export type DeleteRoomMutationVariables = Exact<{
  id: Scalars['Float'];
}>;

export type DeleteRoomMutation = { deleteRoom: string };

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

export type ManuallyPayMutationVariables = Exact<{
  id: Scalars['Float'];
}>;

export type ManuallyPayMutation = {
  manuallyPay: {
    message?: string | null;
    payment?: { id: string; status: PaymentStatus } | null;
  };
};

export type ReadNotificationMutationVariables = Exact<{
  id: Scalars['Float'];
}>;

export type ReadNotificationMutation = { readNotification: string };

export type RegisterMutationVariables = Exact<{
  input: RegisterLoginInput;
}>;

export type RegisterMutation = { register: { message?: string | null } };

export type UpdateAmenityStatusMutationVariables = Exact<{
  input: UpdateAmenityStatusInput;
}>;

export type UpdateAmenityStatusMutation = {
  updateAmenityStatus: {
    message?: string | null;
    amenity?: { id: string } | null;
  };
};

export type UpdateEquipmentStatusMutationVariables = Exact<{
  input: UpdateEquipmentStatusInput;
}>;

export type UpdateEquipmentStatusMutation = {
  updateEquipmentStatus: {
    message?: string | null;
    equipment?: { id: string } | null;
  };
};

export type UpdateIncidentForEmployeeMutationVariables = Exact<{
  input: UpdateIncidentForEmployeeInput;
}>;

export type UpdateIncidentForEmployeeMutation = {
  updateIncidentForEmployee: {
    message?: string | null;
    incident?: { id: string } | null;
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

export type UpsertAmenityMutationVariables = Exact<{
  input: UpsertAmenityInput;
}>;

export type UpsertAmenityMutation = {
  upsertAmenity: { message?: string | null; amenity?: { id: string } | null };
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

export type UpsertIncidentMutationVariables = Exact<{
  input: UpsertIncidentInput;
}>;

export type UpsertIncidentMutation = {
  upsertIncident: { message?: string | null; incident?: { id: string } | null };
};

export type UpsertIncidentCategoryMutationVariables = Exact<{
  input: UpsertIncidentCategoriesInput;
}>;

export type UpsertIncidentCategoryMutation = {
  upsertIncidentCategory: {
    message?: string | null;
    incidentCategory?: { id: string } | null;
  };
};

export type UpsertLocationMutationVariables = Exact<{
  input: UpsertLocationInput;
}>;

export type UpsertLocationMutation = {
  upsertLocation: { message?: string | null; location?: { id: string } | null };
};

export type UpsertLocationReservationMutationVariables = Exact<{
  input: UpsertLocationReservationInput;
}>;

export type UpsertLocationReservationMutation = {
  upsertLocationReservation: {
    message?: string | null;
    locationReservation?: { id: string } | null;
  };
};

export type UpsertPaymentMutationVariables = Exact<{
  input: UpsertPaymentInput;
}>;

export type UpsertPaymentMutation = {
  upsertPayment: { message?: string | null; payment?: { id: string } | null };
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

export type GetAmenitiesQueryVariables = Exact<{
  input: GetAmenitiesInput;
}>;

export type GetAmenitiesQuery = {
  getAmenities: {
    page?: number | null;
    total?: number | null;
    totalPages?: number | null;
    message?: string | null;
    items: Array<{
      id: string;
      name: string;
      description?: string | null;
      image?: string | null;
      isActive: boolean;
      amenityTypeId: number;
      locationId: number;
      createdAt: any;
      updatedAt: any;
      amenityType: { id: string; name: string; description?: string | null };
      location: { name: string };
    }>;
  };
};

export type GetAmenityTypesQueryVariables = Exact<{
  input: GetAmenityTypesInput;
}>;

export type GetAmenityTypesQuery = {
  getAmenityTypes: {
    page?: number | null;
    total?: number | null;
    totalPages?: number | null;
    message?: string | null;
    items: Array<{
      id: string;
      name: string;
      icon?: string | null;
      description?: string | null;
      isActive: boolean;
      createdAt: any;
      updatedAt: any;
    }>;
  };
};

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
      room: { id: string; name?: string | null; description?: string | null };
      location: { id: string; name: string; description?: string | null };
    }>;
  };
};

export type GetIncidentQueryVariables = Exact<{
  id: Scalars['Float'];
}>;

export type GetIncidentQuery = {
  getIncident: {
    message?: string | null;
    incident?: {
      id: string;
      title: string;
      description?: string | null;
      fromCustomer?: boolean | null;
      dueDate?: any | null;
      priority?: IncidentPriority | null;
      images?: string | null;
      reportImages?: string | null;
      reportMessage?: string | null;
      status?: IncidentStatus | null;
      employeeId?: number | null;
      reporterId: number;
      roomId: number;
      incidentCategoryId: number;
      locationId: number;
      createdAt: any;
      employee?: {
        id: string;
        name: string;
        email: string;
        avatar?: string | null;
      } | null;
      reporter: {
        id: string;
        name: string;
        email: string;
        avatar?: string | null;
      };
      room: {
        id: string;
        name?: string | null;
        floor?: number | null;
        thumbnail?: string | null;
      };
      incidentCategory: {
        id: string;
        name: string;
        description?: string | null;
      };
      location: { name: string; address: string; thumbnail?: string | null };
    } | null;
  };
};

export type GetIncidentCategoriesQueryVariables = Exact<{
  input: GetIncidentCategoriesInput;
}>;

export type GetIncidentCategoriesQuery = {
  getIncidentCategories: {
    page?: number | null;
    total?: number | null;
    totalPages?: number | null;
    message?: string | null;
    items: Array<{
      id: string;
      name: string;
      description?: string | null;
      icon?: string | null;
      createdAt: any;
    }>;
  };
};

export type GetIncidentsQueryVariables = Exact<{
  input: GetIncidentsInput;
}>;

export type GetIncidentsQuery = {
  getIncidents: {
    page?: number | null;
    total?: number | null;
    totalPages?: number | null;
    message?: string | null;
    items: Array<{
      id: string;
      title: string;
      description?: string | null;
      fromCustomer?: boolean | null;
      dueDate?: any | null;
      priority?: IncidentPriority | null;
      images?: string | null;
      reportImages?: string | null;
      reportMessage?: string | null;
      status?: IncidentStatus | null;
      employeeId?: number | null;
      reporterId: number;
      roomId: number;
      incidentCategoryId: number;
      locationId: number;
      createdAt: any;
      updatedAt: any;
      employee?: {
        id: string;
        name: string;
        email: string;
        avatar?: string | null;
      } | null;
      reporter: {
        id: string;
        name: string;
        email: string;
        avatar?: string | null;
      };
      room: {
        id: string;
        name?: string | null;
        floor?: number | null;
        thumbnail?: string | null;
        description?: string | null;
      };
      incidentCategory: {
        id: string;
        name: string;
        description?: string | null;
      };
      location: { name: string; address: string; thumbnail?: string | null };
    }>;
  };
};

export type GetLocationQueryVariables = Exact<{
  id: Scalars['Float'];
}>;

export type GetLocationQuery = {
  getLocation: {
    message?: string | null;
    location?: {
      id: string;
      name: string;
      address: string;
      long?: number | null;
      lat?: number | null;
      images?: string | null;
      thumbnail?: string | null;
      description?: string | null;
      numOfFloor?: number | null;
      income: number;
      isActive: boolean;
      createdAt: any;
      minPrice?: number | null;
      totalRevenue?: number | null;
      locationServices: Array<{
        id: string;
        name: string;
        description?: string | null;
      }>;
      contactInformations?: Array<{
        address?: string | null;
        name?: string | null;
        id: string;
        phoneNumber?: string | null;
        email?: string | null;
      }> | null;
    } | null;
  };
};

export type GetLocationReservationQueryVariables = Exact<{
  id: Scalars['Float'];
}>;

export type GetLocationReservationQuery = {
  getLocationReservation: {
    message?: string | null;
    locationReservation?: {
      id: string;
      totalCalculatedPrice: number;
      status: string;
      totalReceivedPrice: number;
      startDate: any;
      createdById: number;
      locationId: number;
      createdAt: any;
      updatedAt: any;
      createdBy: {
        id: string;
        name: string;
        avatar?: string | null;
        email: string;
      };
      location: { name: string; images?: string | null };
    } | null;
  };
};

export type GetLocationReservationsQueryVariables = Exact<{
  input: GetLocationReservationsInput;
}>;

export type GetLocationReservationsQuery = {
  getLocationReservations: {
    page?: number | null;
    total?: number | null;
    totalPages?: number | null;
    message?: string | null;
    items: Array<{
      id: string;
      totalCalculatedPrice: number;
      status: string;
      totalReceivedPrice: number;
      startDate: any;
      createdById: number;
      locationId: number;
      createdAt: any;
      updatedAt: any;
      createdBy: {
        id: string;
        name: string;
        avatar?: string | null;
        email: string;
      };
      location: { name: string; images?: string | null };
    }>;
  };
};

export type GetLocationServicesQueryVariables = Exact<{
  input: GetLocationServicesInput;
}>;

export type GetLocationServicesQuery = {
  getLocationServices: {
    page?: number | null;
    total?: number | null;
    totalPages?: number | null;
    message?: string | null;
    items: Array<{
      id: string;
      name: string;
      description?: string | null;
      isActive: boolean;
      createdAt: any;
      updatedAt: any;
    }>;
  };
};

export type GetMyNotificationStatusQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetMyNotificationStatusQuery = {
  getMyNotificationStatus: { message: string; total: number };
};

export type GetNotificationsQueryVariables = Exact<{
  input: GetNotificationsInput;
}>;

export type GetNotificationsQuery = {
  getNotifications: {
    page?: number | null;
    total?: number | null;
    totalPages?: number | null;
    message?: string | null;
    items: Array<{
      id: string;
      content?: string | null;
      title?: string | null;
      dataId?: number | null;
      isRead?: boolean | null;
      image?: string | null;
      type?: string | null;
      userId: number;
      createdAt: any;
    }>;
  };
};

export type GetPaymentQueryVariables = Exact<{
  id: Scalars['Float'];
}>;

export type GetPaymentQuery = {
  getPayment: {
    message?: string | null;
    payment?: {
      id: string;
      totalPrice?: number | null;
      electricCounter?: number | null;
      waterPrice?: number | null;
      discount?: number | null;
      discountType?: DiscountType | null;
      status: PaymentStatus;
      prePaidFee?: number | null;
      extraFee?: number | null;
      roomId: number;
      locationReservationId: number;
      locationId: number;
      users?: Array<{
        name: string;
        id: string;
        email: string;
        avatar?: string | null;
      }> | null;
      room: {
        name?: string | null;
        floor?: number | null;
        basePrice: number;
        thumbnail?: string | null;
      };
      locationReservation: {
        totalCalculatedPrice: number;
        totalReceivedPrice: number;
      };
      location: { name: string; electricCounterPrice?: number | null };
    } | null;
  };
};

export type GetPaymentsQueryVariables = Exact<{
  input: GetPaymentsInput;
}>;

export type GetPaymentsQuery = {
  getPayments: {
    page?: number | null;
    total?: number | null;
    totalPages?: number | null;
    message?: string | null;
    items: Array<{
      id: string;
      totalPrice?: number | null;
      electricCounter?: number | null;
      waterPrice?: number | null;
      discount?: number | null;
      discountType?: DiscountType | null;
      status: PaymentStatus;
      prePaidFee?: number | null;
      extraFee?: number | null;
      roomId: number;
      locationReservationId: number;
      locationId: number;
      createdAt: any;
      updatedAt: any;
      users?: Array<{
        name: string;
        id: string;
        email: string;
        avatar?: string | null;
      }> | null;
      room: {
        name?: string | null;
        floor?: number | null;
        thumbnail?: string | null;
        basePrice: number;
      };
      locationReservation: {
        totalCalculatedPrice: number;
        totalReceivedPrice: number;
      };
      location: { name: string; electricCounterPrice?: number | null };
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
      capacity?: number | null;
      basePrice: number;
      floor?: number | null;
      createdAt: any;
      updatedAt: any;
      location?: { id: string; name: string } | null;
      users?: Array<{
        id: string;
        name: string;
        email: string;
        avatar?: string | null;
      }> | null;
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
      capacity?: number | null;
      createdAt: any;
      updatedAt: any;
      users?: Array<{
        id: string;
        name: string;
        email: string;
        avatar?: string | null;
      }> | null;
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
      updatedAt: any;
      location?: { id: string } | null;
      room?: { name?: string | null; description?: string | null } | null;
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
      location?: {
        name: string;
        stripeAccountId?: string | null;
        numOfFloor?: number | null;
        electricCounterPrice?: number | null;
        isActive: boolean;
      } | null;
      room?: { name?: string | null } | null;
    } | null;
  };
};
