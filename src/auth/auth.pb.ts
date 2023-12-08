/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  rolesId: number;
}

export interface SignUpResponse {
  status: number;
  error: string[];
}

export interface UpdateRequest {
  userId: number;
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
  error: string[];
  token: string;
}

export interface ValidateRequest {
  token: string;
}

export interface ValidateResponse {
  status: number;
  error: string[];
  userId: number;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  signUp(request: SignUpRequest): Observable<SignUpResponse>;

  update(request: UpdateRequest): Observable<UpdateResponse>;

  delete(request: DeleteRequest): Observable<DeleteResponse>;

  signIn(request: SignInRequest): Observable<SignInResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;
}

export interface AuthServiceController {
  signUp(request: SignUpRequest): Promise<SignUpResponse> | Observable<SignUpResponse> | SignUpResponse;

  update(request: UpdateRequest): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;

  delete(request: DeleteRequest): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;

  signIn(request: SignInRequest): Promise<SignInResponse> | Observable<SignInResponse> | SignInResponse;

  validate(request: ValidateRequest): Promise<ValidateResponse> | Observable<ValidateResponse> | ValidateResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["signUp", "update", "delete", "signIn", "validate"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
