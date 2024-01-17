/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "member";

export interface UpdateRoleRequest {
  userId: number;
  rolesId: number;
}

export interface UpdateRoleResponse {
  status: number;
  error: string[];
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface SignUpResponse {
  status: number;
  message: string;
  error: string[];
}

export interface UpdateRequest {
  id: number;
}

export interface UpdateResponse {
  status: number;
  error: string[];
}

export interface DeleteRequest {
  userId: number;
}

export interface DeleteResponse {
  status: number;
  error: string[];
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  status: number;
  message: string;
  token: string;
  error: string[];
}

export interface ValidateRequest {
  token: string;
}

export interface ValidateResponse {
  status: number;
  message: string;
  userId: number;
  error: string[];
}

export const MEMBER_PACKAGE_NAME = "member";

export interface MemberServiceClient {
  signUp(request: SignUpRequest): Observable<SignUpResponse>;

  update(request: UpdateRequest): Observable<UpdateResponse>;

  delete(request: DeleteRequest): Observable<DeleteResponse>;

  signIn(request: SignInRequest): Observable<SignInResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;

  updateRole(request: UpdateRoleRequest): Observable<UpdateRoleResponse>;
}

export interface MemberServiceController {
  signUp(request: SignUpRequest): Promise<SignUpResponse> | Observable<SignUpResponse> | SignUpResponse;

  update(request: UpdateRequest): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;

  delete(request: DeleteRequest): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;

  signIn(request: SignInRequest): Promise<SignInResponse> | Observable<SignInResponse> | SignInResponse;

  validate(request: ValidateRequest): Promise<ValidateResponse> | Observable<ValidateResponse> | ValidateResponse;

  updateRole(
    request: UpdateRoleRequest,
  ): Promise<UpdateRoleResponse> | Observable<UpdateRoleResponse> | UpdateRoleResponse;
}

export function MemberServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["signUp", "update", "delete", "signIn", "validate", "updateRole"];
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
