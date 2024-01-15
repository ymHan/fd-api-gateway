import { Controller, Inject, OnModuleInit, Req, RawBodyRequest, Put, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  FditionServiceClient,
  FDITION_SERVICE_NAME,
  InitBasicRequest,
  InitBasicResponse,
  InputStatusRequest,
  InputStatusResponse,
} from '@proto/fdition.pb';

import { Util } from '@tools/api.util';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('FDist - Member')
@Controller({ path: 'user' })
export class FDtionController implements OnModuleInit {
  private svc: FditionServiceClient;

  @Inject(FDITION_SERVICE_NAME)
  private readonly client: ClientGrpc;

  onModuleInit() {
    this.svc = this.client.getService<FditionServiceClient>(FDITION_SERVICE_NAME);
  }

  @Put('register') //init
  initBasic(@Req() req: RawBodyRequest<InitBasicRequest>): Observable<InitBasicResponse> {
    const raw: Buffer = req.rawBody;
    const data = JSON.parse(Util.toCamel(raw.toString()));

    return this.svc.initBasic(data);
  }

  @Post('info') //status
  initStatus(@Req() req: RawBodyRequest<InputStatusRequest>): Observable<InputStatusResponse> {
    const raw: Buffer = req.rawBody;
    const data = JSON.parse(Util.toCamel(raw.toString()));

    return this.svc.initStatus(data);
  }
}
