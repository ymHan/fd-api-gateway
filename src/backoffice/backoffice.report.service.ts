import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ReportServiceClient, REPORT_SERVICE_NAME } from '@proto/backoffice.pb';

@Injectable()
export class ReportService {
  private svc: ReportServiceClient;

  @Inject(REPORT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit() {
    this.svc = this.client.getService<ReportServiceClient>(REPORT_SERVICE_NAME);
  }
}
