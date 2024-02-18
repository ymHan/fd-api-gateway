import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CategoryServiceClient, CATEGORY_SERVICE_NAME } from '@proto/backoffice.pb';

@Injectable()
export class CategoryService {
  private svc: CategoryServiceClient;

  @Inject(CATEGORY_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit() {
    this.svc = this.client.getService<CategoryServiceClient>(CATEGORY_SERVICE_NAME);
  }
}
