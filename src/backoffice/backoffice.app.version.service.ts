import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AppVersionServiceClient, APP_VERSION_SERVICE_NAME } from '@proto/backoffice.pb';

@Injectable()
export class AppVersionService {
  private svc: AppVersionServiceClient;

  @Inject(APP_VERSION_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit() {
    this.svc = this.client.getService<AppVersionServiceClient>(APP_VERSION_SERVICE_NAME);
  }
}
