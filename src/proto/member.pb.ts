/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Timestamp } from "./google/protobuf/timestamp.pb";

export const protobufPackage = "member";

export interface UpdateEmailReceiveRequest {
  id: number;
  emailreceive: boolean;
}

export interface UpdateEmailReceiveResponse {
  result: string;
  status: number;
  message: string;
  data: UpdateEmailReceiveResponse_DATA[];
}

export interface UpdateEmailReceiveResponse_DATA {
  result?: boolean | undefined;
  error?: string | undefined;
}

export interface UpdatePushReceiveRequest {
  id: number;
  pushreceive: boolean;
}

export interface UpdatePushReceiveResponse {
  result: string;
  status: number;
  message: string;
  data: UpdatePushReceiveResponse_DATA[];
}

export interface UpdatePushReceiveResponse_DATA {
  result?: boolean | undefined;
  error?: string | undefined;
}

export interface UpdateNicknameRequest {
  id: number;
  nickname: string;
}

export interface UpdateNicknameResponse {
  result: string;
  status: number;
  message: string;
  data: UpdateNicknameResponse_DATA[];
}

export interface UpdateNicknameResponse_DATA {
  result?: boolean | undefined;
  error?: string | undefined;
}

export interface FindEmailRequest {
  email: string;
}

export interface FindEmailResponse {
  result: string;
  status: number;
  message: string;
  data: FindEmailResponse_DATA[];
}

export interface FindEmailResponse_DATA {
  email?: string | undefined;
  error?: string | undefined;
}

export interface FindPasswordRequest {
  email: string;
  code: string;
}

export interface FindPasswordResponse {
  result: string;
  status: number;
  message: string;
  data: FindPasswordResponse_DATA[];
}

export interface FindPasswordResponse_DATA {
  token?: string | undefined;
  error?: string | undefined;
}

export interface EmailVerificationCodeRequest {
  email: string;
}

export interface EmailVerificationCodeResponse {
  result: string;
  status: number;
  message: string;
  data: EmailVerificationCodeResponse_DATA[];
}

export interface EmailVerificationCodeResponse_DATA {
  code?: string | undefined;
  error?: string | undefined;
}

export interface ResetPasswordResponse {
  result: string;
  status: number;
  message: string;
  data: ResetPasswordResponse_DATA[];
}

export interface ResetPasswordResponse_DATA {
  token?: string | undefined;
  error?: string | undefined;
}

export interface ResetPasswordRequest {
  email: string;
  password: string;
}

export interface UpdatePasswordRequest {
  token: string;
  password: string;
}

export interface UpdatePasswordResponse {
  result: string;
  status: number;
  message: string;
  data: string[];
}

export interface UpdatePasswordResponse_DATA {
  result?: boolean | undefined;
  error?: string | undefined;
}

export interface CheckNicknameDuplicationRequest {
  nickname: string;
}

export interface CheckNicknameDuplicationResponse {
  result: string;
  status: number;
  message: string;
  data: CheckNicknameDuplicationResponse_DATA[];
}

export interface CheckNicknameDuplicationResponse_DATA {
  result?: boolean | undefined;
  error?: string | undefined;
}

export interface CheckEmailDuplicationRequest {
  email: string;
}

export interface CheckEmailDuplicationResponse {
  result: string;
  status: number;
  message: string;
  data: CheckEmailDuplicationResponse_DATA[];
}

export interface CheckEmailDuplicationResponse_DATA {
  result?: boolean | undefined;
  error?: string | undefined;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface VerifyEmailResponse {
  result: string;
  status: number;
  message: string;
  data: VerifyEmailResponse_DATA[];
}

export interface VerifyEmailResponse_DATA {
  result?: boolean | undefined;
  error?: string | undefined;
}

export interface LeaveMemberRequest {
  email: string;
}

export interface LeaveMemberResponse {
  result: string;
  status: number;
  message: string;
  data: LeaveMemberResponse_DATA[];
}

export interface LeaveMemberResponse_DATA {
  result?: boolean | undefined;
  error?: string | undefined;
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
  nickname?: string | undefined;
  usertype?: string | undefined;
  state?: string | undefined;
  isVerifiedEmail?: boolean | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  error?: string | undefined;
}

export interface GetUserResponse {
  result: string;
  status: number;
  message: string;
  data: GetUserResult[];
}

export interface GetUserRequest {
  id: number;
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
  nickname: string;
  email: string;
  password: string;
  pushreceive: boolean;
  emailreceive: boolean;
  usertype: string;
}

export interface SignUpResult {
  id: number;
  name: string;
  nickname: string;
  email: string;
  usertype: string;
  state: string;
  emailreceive: boolean;
  pushreceive: boolean;
  createdAt: string;
}

export interface SignUpResponse {
  result: string;
  status: number;
  message: string;
  data: SignUpResult[];
}

export interface UpdateRequest {
  id: number;
  name: string;
  nickname: string;
  pushreceive: string;
  emailreceive: string;
}

export interface UpdateResult {
  id: number;
  email: string;
}

export interface UpdateResponse {
  result: string;
  status: number;
  message: string;
  data: UpdateResult[];
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResult {
  id?: number | undefined;
  email?: string | undefined;
  name?: string | undefined;
  nickname?: string | undefined;
  pushreceive?: boolean | undefined;
  emailreceive?: boolean | undefined;
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

  /** rpc Delete(DeleteRequest) returns (DeleteResponse) {} // 멤버 탈퇴 / 삭제 등 백오피스 기능 */

  signIn(request: SignInRequest): Observable<SignInResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;

  getUser(request: GetUserRequest): Observable<GetUserResponse>;

  updateRole(request: UpdateRoleRequest): Observable<UpdateRoleResponse>;

  updateState(request: UpdateStateRequest): Observable<UpdateStateResponse>;

  leaveMember(request: LeaveMemberRequest): Observable<LeaveMemberResponse>;

  verifyEmail(request: VerifyEmailRequest): Observable<VerifyEmailResponse>;

  checkEmailDuplication(request: CheckEmailDuplicationRequest): Observable<CheckEmailDuplicationResponse>;

  checkNicknameDuplication(request: CheckNicknameDuplicationRequest): Observable<CheckNicknameDuplicationResponse>;

  updatePassword(request: UpdatePasswordRequest): Observable<UpdatePasswordResponse>;

  resetPassword(request: ResetPasswordRequest): Observable<ResetPasswordResponse>;

  emailVerificationCode(request: EmailVerificationCodeRequest): Observable<EmailVerificationCodeResponse>;

  findEmail(request: FindEmailRequest): Observable<FindEmailResponse>;

  findPassword(request: FindPasswordRequest): Observable<FindPasswordResponse>;

  updatePushReceive(request: UpdatePushReceiveRequest): Observable<UpdatePushReceiveResponse>;

  updateEmailReceive(request: UpdateEmailReceiveRequest): Observable<UpdateEmailReceiveResponse>;

  updateNickname(request: UpdateNicknameRequest): Observable<UpdateNicknameResponse>;
}

export interface MemberServiceController {
  signUp(request: SignUpRequest): Promise<SignUpResponse> | Observable<SignUpResponse> | SignUpResponse;

  update(request: UpdateRequest): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;

  /** rpc Delete(DeleteRequest) returns (DeleteResponse) {} // 멤버 탈퇴 / 삭제 등 백오피스 기능 */

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

  verifyEmail(
    request: VerifyEmailRequest,
  ): Promise<VerifyEmailResponse> | Observable<VerifyEmailResponse> | VerifyEmailResponse;

  checkEmailDuplication(
    request: CheckEmailDuplicationRequest,
  ): Promise<CheckEmailDuplicationResponse> | Observable<CheckEmailDuplicationResponse> | CheckEmailDuplicationResponse;

  checkNicknameDuplication(
    request: CheckNicknameDuplicationRequest,
  ):
    | Promise<CheckNicknameDuplicationResponse>
    | Observable<CheckNicknameDuplicationResponse>
    | CheckNicknameDuplicationResponse;

  updatePassword(
    request: UpdatePasswordRequest,
  ): Promise<UpdatePasswordResponse> | Observable<UpdatePasswordResponse> | UpdatePasswordResponse;

  resetPassword(
    request: ResetPasswordRequest,
  ): Promise<ResetPasswordResponse> | Observable<ResetPasswordResponse> | ResetPasswordResponse;

  emailVerificationCode(
    request: EmailVerificationCodeRequest,
  ): Promise<EmailVerificationCodeResponse> | Observable<EmailVerificationCodeResponse> | EmailVerificationCodeResponse;

  findEmail(request: FindEmailRequest): Promise<FindEmailResponse> | Observable<FindEmailResponse> | FindEmailResponse;

  findPassword(
    request: FindPasswordRequest,
  ): Promise<FindPasswordResponse> | Observable<FindPasswordResponse> | FindPasswordResponse;

  updatePushReceive(
    request: UpdatePushReceiveRequest,
  ): Promise<UpdatePushReceiveResponse> | Observable<UpdatePushReceiveResponse> | UpdatePushReceiveResponse;

  updateEmailReceive(
    request: UpdateEmailReceiveRequest,
  ): Promise<UpdateEmailReceiveResponse> | Observable<UpdateEmailReceiveResponse> | UpdateEmailReceiveResponse;

  updateNickname(
    request: UpdateNicknameRequest,
  ): Promise<UpdateNicknameResponse> | Observable<UpdateNicknameResponse> | UpdateNicknameResponse;
}

export function MemberServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "signUp",
      "update",
      "signIn",
      "validate",
      "getUser",
      "updateRole",
      "updateState",
      "leaveMember",
      "verifyEmail",
      "checkEmailDuplication",
      "checkNicknameDuplication",
      "updatePassword",
      "resetPassword",
      "emailVerificationCode",
      "findEmail",
      "findPassword",
      "updatePushReceive",
      "updateEmailReceive",
      "updateNickname",
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
