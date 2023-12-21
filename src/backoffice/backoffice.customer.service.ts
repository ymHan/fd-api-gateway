import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BO_Customer_ServiceClient, B_O__CUSTOMER__SERVICE_NAME } from '../proto/backoffice.pb';

@Injectable()
export class CustomerService {
  private svc: BO_Customer_ServiceClient;

  @Inject(B_O__CUSTOMER__SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit() {
    this.svc = this.client.getService<BO_Customer_ServiceClient>(B_O__CUSTOMER__SERVICE_NAME);
  }
}
