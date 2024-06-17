import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { DashBoardServiceClient, DASH_BOARD_SERVICE_NAME } from '@proto/backoffice.pb';

@Injectable()
export class DashBoardService {
  private svc: DashBoardServiceClient;

  @Inject(DASH_BOARD_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit() {
    this.svc = this.client.getService<DashBoardServiceClient>(DASH_BOARD_SERVICE_NAME);
  }
}
