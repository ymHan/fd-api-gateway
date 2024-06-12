import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CommonCodeServiceClient, COMMON_CODE_SERVICE_NAME } from '@proto/backoffice.pb';

@Injectable()
export class CommonCodeService {
  private svc: CommonCodeServiceClient;

  @Inject(COMMON_CODE_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit() {
    this.svc = this.client.getService<CommonCodeServiceClient>(COMMON_CODE_SERVICE_NAME);
  }
}
