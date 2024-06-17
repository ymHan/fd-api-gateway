import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BACKOFFICE__SHORTS_X__SERVICE_NAME, Backoffice_ShortsX_ServiceClient } from '@proto/backoffice.pb';

@Injectable()
export class ShortsXService {
  private svc: Backoffice_ShortsX_ServiceClient;

  @Inject(BACKOFFICE__SHORTS_X__SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit() {
    this.svc = this.client.getService<Backoffice_ShortsX_ServiceClient>(BACKOFFICE__SHORTS_X__SERVICE_NAME);
  }
}
