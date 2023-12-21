import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BO_Sector_ServiceClient, B_O__SECTOR__SERVICE_NAME } from '../proto/backoffice.pb';

@Injectable()
export class SectorService {
  private svc: BO_Sector_ServiceClient;

  @Inject(B_O__SECTOR__SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit() {
    this.svc = this.client.getService<BO_Sector_ServiceClient>(B_O__SECTOR__SERVICE_NAME);
  }
}
