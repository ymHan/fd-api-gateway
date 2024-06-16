import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AccountServiceClient, ACCOUNT_SERVICE_NAME } from '@proto/backoffice.pb';

@Injectable()
export class AccountService {
  private svc: AccountServiceClient;

  @Inject(ACCOUNT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit() {
    this.svc = this.client.getService<AccountServiceClient>(ACCOUNT_SERVICE_NAME);
  }
}
