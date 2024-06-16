import { Controller, OnModuleInit, Inject, Get, Body, Patch, Param, Delete, Headers, Query, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  COMMON_CODE_SERVICE_NAME,
  CommonCodeServiceClient,
  GetCommonCodesRequest,
  GetCommonCodeRequest,
  PutCommonCodeRequest,
  CommonCodeResponse,
  ModCommonCodeRequest,
  GetItemDetailResponse,
} from '@proto/backoffice.pb';
import { ApiTags } from '@nestjs/swagger';
import { AxiosRequestHeaders } from 'axios';

@ApiTags('BackOffice - CommonCode')
@Controller({ path: 'bo/commoncode' })
export class CommonCodeController implements OnModuleInit {
  private svc: CommonCodeServiceClient;

  @Inject(COMMON_CODE_SERVICE_NAME)
  private readonly client: ClientGrpc;

  onModuleInit() {
    this.svc = this.client.getService<CommonCodeServiceClient>(COMMON_CODE_SERVICE_NAME);
  }

  @Get('all')
  public getCommonCodes(
    @Query() params: GetCommonCodesRequest,
    @Headers() header: AxiosRequestHeaders,
  ): Observable<CommonCodeResponse> {
    const authorization = header?.authorization;
    const payload = { ...params, authorization };
    return this.svc.getCommonCodes(payload);
  }

  @Get(':groupCode/:code')
  public getCommonCode(
    @Param() params: GetCommonCodeRequest,
    @Headers() header: AxiosRequestHeaders,
  ): Observable<CommonCodeResponse> {
    const authorization = header?.authorization;
    const payload = { ...params, authorization };
    return this.svc.getCommonCode(payload);
  }

  @Post()
  public putCommonCode(
    @Body() req: PutCommonCodeRequest,
    @Headers() header: AxiosRequestHeaders,
  ): Observable<CommonCodeResponse> {
    const authorization = header?.authorization;
    const payload = { ...req, authorization };
    return this.svc.putCommonCode(payload);
  }

  @Delete(':grouCode/:code')
  public delCommonCode(
    @Param() params: GetCommonCodeRequest,
    @Headers() header: AxiosRequestHeaders,
  ): Observable<CommonCodeResponse> {
    const authorization = header?.authorization;
    const payload = { ...params, authorization };
    return this.svc.delCommonCode(payload);
  }

  @Patch(':groupCode/:code')
  public modCommonCode(
    @Param() params,
    @Body() req: ModCommonCodeRequest,
    @Headers() header: AxiosRequestHeaders,
  ): Observable<CommonCodeResponse> {
    const authorization = header?.authorization;
    const payload = { ...params, ...req, authorization };
    return this.svc.modCommonCode(payload);
  }

  @Get('detail')
  public getDetailCode(@Headers() header: AxiosRequestHeaders): Observable<GetItemDetailResponse> {
    const authorization = header?.authorization;
    const payload = { authorization };
    return this.svc.getDetailCode(payload);
  }
}
