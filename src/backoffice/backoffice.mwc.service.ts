import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { MwcServiceClient, MWC_SERVICE_NAME } from '@proto/backoffice.pb';

@Injectable()
export class MwcService {
  private svc: MwcServiceClient;

  @Inject(MWC_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit() {
    this.svc = this.client.getService<MwcServiceClient>(MWC_SERVICE_NAME);
  }
}
