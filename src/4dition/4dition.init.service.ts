import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { FditionServiceClient, FDITION_SERVICE_NAME } from '../proto/fdition.pb';

@Injectable()
export class InitService {
  private svc: FditionServiceClient;

  @Inject(FDITION_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit() {
    this.svc = this.client.getService<FditionServiceClient>(FDITION_SERVICE_NAME);
  }
}
