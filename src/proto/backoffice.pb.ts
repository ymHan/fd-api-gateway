/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "backoffice";

export interface DeleteCustomerRequest {
  /** 거래처코드번호 */
  id: string;
}

export interface DeleteCustomerResponse {
  status: number;
  error: string[];
}

/** 거래처 테이블 */
export interface Customer {
  /** 거래처코드번호 */
  id: string;
  /** 거래처명 */
  name: string;
  /** 거래처설명 */
  description: string;
  /** 생성일 */
  createdAt: string;
  /** 수정일 */
  updatedAt: string;
}

/** 1. 거래처 등록 */
export interface CreateCustomerRequest {
  /** 거래처명 */
  name: string;
  /** 거래처설명 */
  description: string;
}

/** 1-1. 거래처 등록 결과 */
export interface CreateCustomerResponse {
  status: number;
  error: string[];
  result: CreateCustomerResponse_Result | undefined;
}

export interface CreateCustomerResponse_Result {
  id: string;
}

/** 2. 거래처 정보 가져오기 요청 */
export interface GetCustomerRequest {
  /** 거래처코드번호 */
  id: string;
}

/** 2-1. 거래처 정보 가져오기 결과 */
export interface GetCustomerResponse {
  status: number;
  result: GetCustomerResponse_Result | undefined;
  error: string[];
}

export interface GetCustomerResponse_Result {
  customer: Customer | undefined;
}

/** 3. 거래처 목록 가져오기 요청 */
export interface ListCustomerRequest {
  /** 페이지 번호 */
  page: number;
  /** 페이지 사이즈 */
  pagesize: number;
  /** 정렬 - field 명 */
  sort: string;
  /** 정렬 방식 asc / desc */
  order: string;
}

/** 3-1. 거래처 목록 가져오기 결과 */
export interface ListCustomerResponse {
  /** 상태 정보 */
  status: number;
  /** 전체 Customer 수 */
  totalCount: number;
  /** 페이지 번호 */
  page: number;
  /** 마지막 페이지 번호 */
  lastPage: number;
  /** 결과 정보 */
  result:
    | ListCustomerResponse_Result
    | undefined;
  /** 에러 정보 */
  error: string[];
}

export interface ListCustomerResponse_Result {
  /** Customer 목록 */
  customers: Customer[];
}

/** 4. 거래처 정보 수정 요청 */
export interface UpdateCustomerRequest {
  /** 거래처코드번호 */
  id: string;
  /** 거래처명 */
  name: string;
  /** 거래처설명 */
  description: string;
}

/** 4-1. 거래처 정보 수정 결과 */
export interface UpdateCustomerResponse {
  status: number;
  error: string[];
}

export interface Venue {
  /** 장소코드번호 */
  id: string;
  /** 거래처코드번호 */
  customerId: string;
  /** 종목코드번호 */
  sportsId: string;
  /** 국가코드번호 */
  countryId: number;
  /** 주코드번호 */
  stateId: number;
  /** 도시코드번호 */
  cityId: number;
  /** 장소명 */
  name: string;
  /** 장소설명 */
  description: string;
}

export interface GetVenueResponse {
  status: number;
  result: GetVenueResponse_Result | undefined;
  error: string[];
}

export interface GetVenueResponse_Result {
  venue: Venue | undefined;
}

export interface GetVenueRequest {
  /** 장소코드번호 */
  id: string;
}

export interface ListVenueResponse {
  status: number;
  totalCount: number;
  page: number;
  lastPage: number;
  result: ListVenueResponse_Result | undefined;
  error: string[];
}

export interface ListVenueResponse_Result {
  venues: Venue[];
}

export interface ListVenueRequest {
  /** 페이지 번호 */
  page: number;
  /** 페이지 사이즈 */
  pagesize: number;
  /** 정렬 - field 명 */
  sort: string;
  /** 정렬 방식 asc / desc */
  order: string;
}

export interface UpdateVenueResponse {
  status: number;
  error: string[];
}

export interface UpdateVenueRequest {
  /** 장소코드번호 */
  id: string;
  /** 거래처코드번호 */
  customerId: string;
  /** 종목코드번호 */
  sportsId: string;
  /** 국가코드번호 */
  countryId: number;
  /** 주코드번호 */
  stateId: number;
  /** 도시코드번호 */
  cityId: number;
  /** 장소명 */
  name: string;
  /** 장소설명 */
  description: string;
}

export interface DeleteVenueRequest {
  /** 장소코드번호 */
  id: string;
}

export interface DeleteVenueResponse {
  status: number;
  error: string[];
}

export interface CreateVenueRequest {
  /** 거래처코드번호 */
  customerId: string;
  /** 종목코드번호 */
  sportsId: string;
  /** 국가코드번호 */
  countryId: number;
  /** 주코드번호 */
  stateId: number;
  /** 도시코드번호 */
  cityId: number;
  /** 장소명 */
  name: string;
  /** 장소설명 */
  description: string;
}

export interface CreateVenueResponse {
  status: number;
  error: string[];
  result: CreateVenueResponse_Result | undefined;
}

export interface CreateVenueResponse_Result {
  id: string;
}

export interface UpdateSectorResponse {
  status: number;
  error: string[];
}

export interface UpdateSectorRequest {
  /** 구역코드번호 */
  id: string;
  /** 고객코드번호 */
  customerId: string;
  /** 장소코드번호 */
  venueId: string;
  /** 구역명 */
  name: string;
  /** 구역설명 */
  description: string;
}

export interface ListSectorResponse {
  status: number;
  totalCount: number;
  page: number;
  lastPage: number;
  result: ListSectorResponse_Result | undefined;
  error: string[];
}

export interface ListSectorResponse_Result {
  sectors: Sector[];
}

export interface ListSectorRequest {
  /** 페이지 번호 */
  page: number;
  /** 페이지 사이즈 */
  pagesize: number;
  /** 정렬 - field 명 */
  sort: string;
  /** 정렬 방식 asc / desc */
  order: string;
}

export interface GetSectorResponse {
  status: number;
  result: GetSectorResponse_Result | undefined;
  error: string[];
}

export interface GetSectorResponse_Result {
  sector: Sector2 | undefined;
}

export interface GetSectorRequest {
  /** sector id */
  id: string;
}

export interface DeleteSectorRequest {
  /** 구역코드번호 */
  id: string;
}

export interface DeleteSectorResponse {
  status: number;
  error: string[];
}

export interface Sector {
  /** 구역코드번호 */
  id: string;
  /** 고객코드번호 */
  customerId: string;
  /** 장소코드번호 */
  venueId: string;
  /** 구역명 */
  name: string;
  /** 구역설명 */
  description: string;
}

export interface Sector2 {
  /** 구역코드번호 */
  id: string;
  /** 고객코드번호 */
  customerId: string;
  /** 장소코드번호 */
  venueId: string;
  /** 구역명 */
  name: string;
  /** 구역설명 */
  description: string;
  /** 종목코드번호 */
  sportsId: string;
  /** 구장코드번호 */
  fId: string;
}

export interface CreateSectorRequest {
  /** 고객코드번호 */
  customerId: string;
  /** 장소코드번호 */
  venueId: string;
  /** 구역명 */
  name: string;
  /** 구역설명 */
  description: string;
}

export interface CreateSectorResponse {
  status: number;
  error: string[];
  result: CreateSectorResponse_Result | undefined;
}

export interface CreateSectorResponse_Result {
  id: string;
}

export interface CreateMemberRequest {
  name: string;
  email: string;
  password: string;
  roles: number;
}

export interface CreateMemberResponse {
  status: number;
  error: string[];
}

export interface ItemCategory {
  /** 카테고리명 */
  name: string;
  /** 카테고리 깊이 1: 최상위 */
  depth: number;
  /** 카테고리설명 */
  description: string;
}

export interface CreateCategoryRequest {
  /** 카테고리명 */
  name: string;
  /** 카테고리 깊이 1: 최상위 */
  depth: number;
  /** 카테고리설명 */
  description: string;
}

export interface CreateCategoryResponse {
  status: number;
  error: string[];
  result: CreateCategoryResponse_Result | undefined;
}

export interface CreateCategoryResponse_Result {
  id: string;
}

export interface GetCategoryRequest {
  /** 카테고리코드번호 */
  id: string;
}

export interface GetCategoryResponse {
  status: number;
  result: GetCategoryResponse_Result | undefined;
  error: string[];
}

export interface GetCategoryResponse_Result {
  category: ItemCategory | undefined;
}

export interface ListCategoryRequest {
  /** 페이지 번호 */
  page: number;
  /** 페이지 사이즈 */
  pagesize: number;
  /** 정렬 - field 명 */
  sort: string;
  /** 정렬 방식 asc / desc */
  order: string;
}

export interface ListCategoryResponse {
  status: number;
  totalCount: number;
  page: number;
  lastPage: number;
  result: ListCategoryResponse_Result | undefined;
  error: string[];
}

export interface ListCategoryResponse_Result {
  categories: ItemCategory[];
}

export interface UpdateCategoryRequest {
  /** 카테고리코드번호 */
  id: string;
  /** 카테고리명 */
  name: string;
  /** 카테고리 깊이 1: 최상위 */
  depth: number;
  /** 카테고리설명 */
  description: string;
}

export interface UpdateCategoryResponse {
  status: number;
  error: string[];
}

export interface DeleteCategoryRequest {
  /** 카테고리코드번호 */
  id: string;
}

export interface DeleteCategoryResponse {
  status: number;
  error: string[];
}

export const BACKOFFICE_PACKAGE_NAME = "backoffice";

/**
 * ******************************************************************************
 * 거래처 관련 시작
 * ******************************************************************************
 */

export interface BO_Customer_ServiceClient {
  createCustomer(request: CreateCustomerRequest): Observable<CreateCustomerResponse>;

  updateCustomer(request: UpdateCustomerRequest): Observable<UpdateCustomerResponse>;

  deleteCustomer(request: DeleteCustomerRequest): Observable<DeleteCustomerResponse>;

  getCustomer(request: GetCustomerRequest): Observable<GetCustomerResponse>;

  listCustomer(request: ListCustomerRequest): Observable<ListCustomerResponse>;
}

/**
 * ******************************************************************************
 * 거래처 관련 시작
 * ******************************************************************************
 */

export interface BO_Customer_ServiceController {
  createCustomer(
    request: CreateCustomerRequest,
  ): Promise<CreateCustomerResponse> | Observable<CreateCustomerResponse> | CreateCustomerResponse;

  updateCustomer(
    request: UpdateCustomerRequest,
  ): Promise<UpdateCustomerResponse> | Observable<UpdateCustomerResponse> | UpdateCustomerResponse;

  deleteCustomer(
    request: DeleteCustomerRequest,
  ): Promise<DeleteCustomerResponse> | Observable<DeleteCustomerResponse> | DeleteCustomerResponse;

  getCustomer(
    request: GetCustomerRequest,
  ): Promise<GetCustomerResponse> | Observable<GetCustomerResponse> | GetCustomerResponse;

  listCustomer(
    request: ListCustomerRequest,
  ): Promise<ListCustomerResponse> | Observable<ListCustomerResponse> | ListCustomerResponse;
}

export function BO_Customer_ServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createCustomer", "updateCustomer", "deleteCustomer", "getCustomer", "listCustomer"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BO_Customer_Service", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("BO_Customer_Service", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const B_O__CUSTOMER__SERVICE_NAME = "BO_Customer_Service";

/**
 * ******************************************************************************
 * 거래처 소속 - 베뉴 정보 시작
 * ******************************************************************************
 */

export interface BO_Venue_ServiceClient {
  createVenue(request: CreateVenueRequest): Observable<CreateVenueResponse>;

  getVenue(request: GetVenueRequest): Observable<GetVenueResponse>;

  listVenue(request: ListVenueRequest): Observable<ListVenueResponse>;

  updateVenue(request: UpdateVenueRequest): Observable<UpdateVenueResponse>;

  deleteVenue(request: DeleteVenueRequest): Observable<DeleteVenueResponse>;
}

/**
 * ******************************************************************************
 * 거래처 소속 - 베뉴 정보 시작
 * ******************************************************************************
 */

export interface BO_Venue_ServiceController {
  createVenue(
    request: CreateVenueRequest,
  ): Promise<CreateVenueResponse> | Observable<CreateVenueResponse> | CreateVenueResponse;

  getVenue(request: GetVenueRequest): Promise<GetVenueResponse> | Observable<GetVenueResponse> | GetVenueResponse;

  listVenue(request: ListVenueRequest): Promise<ListVenueResponse> | Observable<ListVenueResponse> | ListVenueResponse;

  updateVenue(
    request: UpdateVenueRequest,
  ): Promise<UpdateVenueResponse> | Observable<UpdateVenueResponse> | UpdateVenueResponse;

  deleteVenue(
    request: DeleteVenueRequest,
  ): Promise<DeleteVenueResponse> | Observable<DeleteVenueResponse> | DeleteVenueResponse;
}

export function BO_Venue_ServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createVenue", "getVenue", "listVenue", "updateVenue", "deleteVenue"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BO_Venue_Service", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("BO_Venue_Service", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const B_O__VENUE__SERVICE_NAME = "BO_Venue_Service";

/**
 * ******************************************************************************
 * customer - venue - sector
 * ******************************************************************************
 */

export interface BO_Sector_ServiceClient {
  createSector(request: CreateSectorRequest): Observable<CreateSectorResponse>;

  getSector(request: GetSectorRequest): Observable<GetSectorResponse>;

  listSector(request: ListSectorRequest): Observable<ListSectorResponse>;

  updateSector(request: UpdateSectorRequest): Observable<UpdateSectorResponse>;

  deleteSector(request: DeleteSectorRequest): Observable<DeleteSectorResponse>;
}

/**
 * ******************************************************************************
 * customer - venue - sector
 * ******************************************************************************
 */

export interface BO_Sector_ServiceController {
  createSector(
    request: CreateSectorRequest,
  ): Promise<CreateSectorResponse> | Observable<CreateSectorResponse> | CreateSectorResponse;

  getSector(request: GetSectorRequest): Promise<GetSectorResponse> | Observable<GetSectorResponse> | GetSectorResponse;

  listSector(
    request: ListSectorRequest,
  ): Promise<ListSectorResponse> | Observable<ListSectorResponse> | ListSectorResponse;

  updateSector(
    request: UpdateSectorRequest,
  ): Promise<UpdateSectorResponse> | Observable<UpdateSectorResponse> | UpdateSectorResponse;

  deleteSector(
    request: DeleteSectorRequest,
  ): Promise<DeleteSectorResponse> | Observable<DeleteSectorResponse> | DeleteSectorResponse;
}

export function BO_Sector_ServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createSector", "getSector", "listSector", "updateSector", "deleteSector"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BO_Sector_Service", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("BO_Sector_Service", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const B_O__SECTOR__SERVICE_NAME = "BO_Sector_Service";

/**
 * ******************************************************************************
 * customer - member
 * ******************************************************************************
 */

export interface BO_Member_ServiceClient {
  createMember(request: CreateMemberRequest): Observable<CreateMemberResponse>;
}

/**
 * ******************************************************************************
 * customer - member
 * ******************************************************************************
 */

export interface BO_Member_ServiceController {
  createMember(
    request: CreateMemberRequest,
  ): Promise<CreateMemberResponse> | Observable<CreateMemberResponse> | CreateMemberResponse;
}

export function BO_Member_ServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createMember"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("BO_Member_Service", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("BO_Member_Service", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const B_O__MEMBER__SERVICE_NAME = "BO_Member_Service";

export interface CategoryClient {
  createCategory(request: CreateCategoryRequest): Observable<CreateCategoryResponse>;

  getCategory(request: GetCategoryRequest): Observable<GetCategoryResponse>;

  listCategory(request: ListCategoryRequest): Observable<ListCategoryResponse>;

  updateCategory(request: UpdateCategoryRequest): Observable<UpdateCategoryResponse>;

  deleteCategory(request: DeleteCategoryRequest): Observable<DeleteCategoryResponse>;
}

export interface CategoryController {
  createCategory(
    request: CreateCategoryRequest,
  ): Promise<CreateCategoryResponse> | Observable<CreateCategoryResponse> | CreateCategoryResponse;

  getCategory(
    request: GetCategoryRequest,
  ): Promise<GetCategoryResponse> | Observable<GetCategoryResponse> | GetCategoryResponse;

  listCategory(
    request: ListCategoryRequest,
  ): Promise<ListCategoryResponse> | Observable<ListCategoryResponse> | ListCategoryResponse;

  updateCategory(
    request: UpdateCategoryRequest,
  ): Promise<UpdateCategoryResponse> | Observable<UpdateCategoryResponse> | UpdateCategoryResponse;

  deleteCategory(
    request: DeleteCategoryRequest,
  ): Promise<DeleteCategoryResponse> | Observable<DeleteCategoryResponse> | DeleteCategoryResponse;
}

export function CategoryControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createCategory", "getCategory", "listCategory", "updateCategory", "deleteCategory"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("Category", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("Category", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CATEGORY_SERVICE_NAME = "Category";
