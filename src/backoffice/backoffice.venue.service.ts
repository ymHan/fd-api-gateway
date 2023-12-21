import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BO_Venue_ServiceClient, B_O__VENUE__SERVICE_NAME } from '../proto/backoffice.pb';

@Injectable()
export class VenueService {
  private svc: BO_Venue_ServiceClient;

  @Inject(B_O__VENUE__SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit() {
    this.svc = this.client.getService<BO_Venue_ServiceClient>(B_O__VENUE__SERVICE_NAME);
  }
}
