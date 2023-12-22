import { Controller, Inject, OnModuleInit, Req, Post, RawBodyRequest } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  FditionServiceClient,
  FDITION_SERVICE_NAME,
  InitBasicAdd,
  InitBasicAddResponse
} from '../proto/fdition.pb';

@Controller({ path: 'fdition', version: '1' })
export class InitController implements OnModuleInit {
  private svc: FditionServiceClient;

  @Inject(FDITION_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit() {
    this.svc = this.client.getService<FditionServiceClient>(FDITION_SERVICE_NAME);
  }

  @Post('init')
  initBasic(@Req() req: RawBodyRequest<InitBasicAdd>): Observable<InitBasicAddResponse> {
    const raw: Buffer = req.rawBody;
    const data: InitBasicAdd = JSON.parse(raw.toString());
    console.log(data);
    return this.svc.initBasic(data);
  }
}
