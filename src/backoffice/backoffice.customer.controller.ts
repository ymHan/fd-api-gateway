import { Body, Controller, Inject, OnModuleInit, Post, Get, Patch, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  BO_Customer_ServiceClient,
  B_O__CUSTOMER__SERVICE_NAME,
  CreateCustomerRequest,
  CreateCustomerResponse,
  GetCustomerRequest,
  GetCustomerResponse,
  ListCustomerRequest,
  ListCustomerResponse,
  UpdateCustomerRequest,
  UpdateCustomerResponse,
} from '@proto/backoffice.pb';

@Controller()
export class CustomerController implements OnModuleInit {
  private svc: BO_Customer_ServiceClient;

  @Inject(B_O__CUSTOMER__SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit() {
    this.svc = this.client.getService<BO_Customer_ServiceClient>(B_O__CUSTOMER__SERVICE_NAME);
  }

  @Post('customer')
  public createCustomer(@Body() req: CreateCustomerRequest): Observable<CreateCustomerResponse> {
    return this.svc.createCustomer(req);
  }

  @Get('customer/:id')
  public getCustomer(@Param() params: GetCustomerRequest): Observable<GetCustomerResponse> {
    return this.svc.getCustomer(params);
  }

  @Post('customers')
  public listCustomer(@Body() req: ListCustomerRequest): Observable<ListCustomerResponse> {
    return this.svc.listCustomer(req);
  }

  @Patch('customer')
  public updateCustomer(@Body() req: UpdateCustomerRequest): Observable<UpdateCustomerResponse> {
    return this.svc.updateCustomer(req);
  }
}
