import { Controller, OnModuleInit, Inject, Get, Body, Patch, Param, Delete, Headers, Query } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  ACCOUNT_SERVICE_NAME,
  AccountServiceClient,
  GetUsersRequest,
  GetUsersResponse,
  GetUserRequest,
  GetUserResponse,
  UpdateRequest,
  UpdateResponse,
  UpdateChannelRequest,
  UpdateChannelResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  UserUpdateVideoRequest,
  UserDeleteVideoRequest,
  UserVideoResponse,
  UpdateSocialRequest,
  UpdateSocialResponse,
} from '@proto/backoffice.pb';
import { ApiTags } from '@nestjs/swagger';
import { AxiosRequestHeaders } from 'axios';

@ApiTags('BackOffice - Account')
@Controller({ path: 'bo/account' })
export class AccountController implements OnModuleInit {
  private svc: AccountServiceClient;

  @Inject(ACCOUNT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  onModuleInit() {
    this.svc = this.client.getService<AccountServiceClient>(ACCOUNT_SERVICE_NAME);
  }

  @Get('users')
  public getUsers(@Query() params: GetUsersRequest, @Headers() header): Observable<GetUsersResponse> {
    const authorization = header?.authorization;
    const payload = { ...params, authorization };
    return this.svc.getUsers(payload);
  }

  @Get('user/:id')
  public getUser(@Param() params, @Headers() header): Observable<GetUserResponse> {
    const authorization = header?.authorization;
    const payload = { ...params, authorization };
    return this.svc.getUser(payload);
  }

  @Patch('user/:id')
  public updateUser(@Param() params, @Body() req: UpdateRequest, @Headers() header): Observable<UpdateResponse> {
    const authorization = header?.authorization;
    const payload = { ...params, ...req, authorization };
    return this.svc.updateUser(payload);
  }

  @Delete('user/:id')
  public deleteUser(@Param() params: GetUserRequest, @Headers() header): Observable<UpdateResponse> {
    const authorization = header?.authorization;
    const payload = { ...params, authorization };
    return this.svc.deleteUser(payload);
  }

  @Patch('user/:id/profile')
  public updateProfile(
    @Param() params,
    @Body() req: UpdateProfileRequest,
    @Headers() header: AxiosRequestHeaders,
  ): Observable<UpdateProfileResponse> {
    const authorization = header?.authorization;
    const payload = { ...params, ...req, authorization };
    return this.svc.updateProfile(payload);
  }

  @Patch('user/:id/channel')
  public updateChannel(
    @Param() params,
    @Body() req: UpdateChannelRequest,
    @Headers() header: AxiosRequestHeaders,
  ): Observable<UpdateChannelResponse> {
    const authorization = header?.authorization;
    const payload = { ...params, ...req, authorization };
    return this.svc.updateChannel(payload);
  }

  @Patch('user/:userid/video/:id')
  public updateVideo(
    @Param() params,
    @Body() req: UserUpdateVideoRequest,
    @Headers() header: AxiosRequestHeaders,
  ): Observable<UserVideoResponse> {
    const authorization = header?.authorization;
    const payload = { ...params, ...req, authorization };
    return this.svc.updateVideo(payload);
  }

  @Delete('user/:userid/video/:videoid')
  public deleteVideo(
    @Param() params: UserDeleteVideoRequest,
    @Headers() header: AxiosRequestHeaders,
  ): Observable<UserVideoResponse> {
    const authorization = header?.authorization;
    const payload = { ...params, authorization };
    return this.svc.deleteVideo(payload);
  }

  @Patch('user/:userid/sns/:snsid')
  public UpdateSocial(
    @Param() params: UpdateSocialRequest,
    @Body() req: UpdateSocialRequest,
    @Headers() header: AxiosRequestHeaders,
  ): Observable<UpdateSocialResponse> {
    const authorization = header?.authorization;
    const payload = { ...params, ...req, authorization };
    return this.svc.updateSocial(payload);
  }
}
