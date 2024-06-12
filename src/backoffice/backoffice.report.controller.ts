import { Controller, OnModuleInit, Inject, Get, Param, Headers, Query } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  REPORT_SERVICE_NAME,
  ReportServiceClient,
  GetReportRequest,
  GetReportsRequest,
  GetReportsResponse,
} from '@proto/backoffice.pb';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('BackOffice - Report')
@Controller({ path: 'bo/reports' })
export class ReportController implements OnModuleInit {
  private svc: ReportServiceClient;

  @Inject(REPORT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  onModuleInit() {
    this.svc = this.client.getService<ReportServiceClient>(REPORT_SERVICE_NAME);
  }

  @Get()
  public getReports(@Query() params: GetReportsRequest, @Headers() header): Observable<GetReportsResponse> {
    const authorization = header?.authorization;
    const payload = { ...params, authorization };
    return this.svc.getReports(payload);
  }

  @Get(':id')
  public getReport(@Param() params: GetReportRequest, @Headers() header): Observable<GetReportsResponse> {
    const authorization = header?.authorization;
    const payload = { ...params, authorization };
    return this.svc.getReport(payload);
  }
}
