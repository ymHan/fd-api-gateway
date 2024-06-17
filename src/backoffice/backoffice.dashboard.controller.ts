import { Controller, OnModuleInit, Inject, Get, Headers, Query } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  DASH_BOARD_SERVICE_NAME,
  DashBoardServiceClient,
  GetDashBoardAllRequest,
  GetDashBoardAllResponse,
} from '@proto/backoffice.pb';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('BackOffice - dashboard')
@Controller({ path: 'bo/dashboard' })
export class DashBoardController implements OnModuleInit {
  private svc: DashBoardServiceClient;

  @Inject(DASH_BOARD_SERVICE_NAME)
  private readonly client: ClientGrpc;

  onModuleInit() {
    this.svc = this.client.getService<DashBoardServiceClient>(DASH_BOARD_SERVICE_NAME);
  }

  @Get()
  public getDashBoardAll(@Query() params: GetDashBoardAllRequest, @Headers() header): Observable<GetDashBoardAllResponse> {
    const authorization = header?.authorization;
    const payload = { ...params, authorization };
    return this.svc.getDashBoardAll(payload);
  }
}
