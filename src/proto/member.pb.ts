/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Timestamp } from "./google/protobuf/timestamp.pb";

export const protobufPackage = "member";

export interface LeaveMemberRequest {
  email: string;
}

export interface LeaveMemberResponse {
  result: string;
  status: number;
  message: string;
  data: string[];
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  state: string;
  isVerifiedEmail: boolean;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
  deletedAt: Timestamp | undefined;
}

export interface GetUserResult {
  id?: number | undefined;
  email?: string | undefined;
  name?: string | undefined;
  role?: string | undefined;
  state?: string | undefined;
  isVerifiedEmail?: boolean | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
}

export interface GetUserResponse {
  result: string;
  status: number;
  message: string;
  data: GetUserResult[];
}

export interface GetUserRequest {
  email: string;
}

export interface UpdateStateRequest {
  status: string;
  message: string;
}

export interface UpdateStateResponse {
  result: string;
  status: number;
  message: string;
  data: User[];
}

export interface UpdateRoleRequest {
  email: string;
  role: string;
}

export interface UpdateRoleResponse {
  result: string;
  status: number;
  message: string;
  data: User[];
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface SignUpResponse {
  result: string;
  status: number;
  message: string;
  data: SignUpResponse_DATA[];
}

export interface SignUpResponse_DATA {
  id: number;
  name: string;
  email: string;
  role: string;
  state: string;
  isVerifiedEmail: boolean;
  createdAt: string;
}

export interface UpdateRequest {
  id: number;
}

export interface UpdateResponse {
  result: string;
  status: number;
  message: string;
  data: User[];
}

export interface DeleteRequest {
  userId: number;
}

export interface DeleteResponse {
  result: string;
  status: number;
  message: string;
  data: string[];
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResult {
  token?: string | undefined;
  error?: string | undefined;
}

export interface SignInResponse {
  result: string;
  status: number;
  message: string;
  data: SignInResult[];
}

export interface ValidateRequest {
  token: string;
}

export interface ValidateResult {
  id?: number | undefined;
  email?: string | undefined;
  error?: string | undefined;
}

export interface ValidateResponse {
  result: string;
  status: number;
  message: string;
  data: ValidateResult[];
}

export const MEMBER_PACKAGE_NAME = "member";

export interface MemberServiceClient {
  signUp(request: SignUpRequest): Observable<SignUpResponse>;

  update(request: UpdateRequest): Observable<UpdateResponse>;

  delete(request: DeleteRequest): Observable<DeleteResponse>;

  signIn(request: SignInRequest): Observable<SignInResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;

  getUser(request: GetUserRequest): Observable<GetUserResponse>;

  updateRole(request: UpdateRoleRequest): Observable<UpdateRoleResponse>;

  updateState(request: UpdateStateRequest): Observable<UpdateStateResponse>;

  leaveMember(request: LeaveMemberRequest): Observable<LeaveMemberResponse>;
}

export interface MemberServiceController {
  signUp(request: SignUpRequest): Promise<SignUpResponse> | Observable<SignUpResponse> | SignUpResponse;

  update(request: UpdateRequest): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;

  delete(request: DeleteRequest): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;

  signIn(request: SignInRequest): Promise<SignInResponse> | Observable<SignInResponse> | SignInResponse;

  validate(request: ValidateRequest): Promise<ValidateResponse> | Observable<ValidateResponse> | ValidateResponse;

  getUser(request: GetUserRequest): Promise<GetUserResponse> | Observable<GetUserResponse> | GetUserResponse;

  updateRole(
    request: UpdateRoleRequest,
  ): Promise<UpdateRoleResponse> | Observable<UpdateRoleResponse> | UpdateRoleResponse;

  updateState(
    request: UpdateStateRequest,
  ): Promise<UpdateStateResponse> | Observable<UpdateStateResponse> | UpdateStateResponse;

  leaveMember(
    request: LeaveMemberRequest,
  ): Promise<LeaveMemberResponse> | Observable<LeaveMemberResponse> | LeaveMemberResponse;
}

export function MemberServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "signUp",
      "update",
      "delete",
      "signIn",
      "validate",
      "getUser",
      "updateRole",
      "updateState",
      "leaveMember",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("MemberService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("MemberService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const MEMBER_SERVICE_NAME = "MemberService";
