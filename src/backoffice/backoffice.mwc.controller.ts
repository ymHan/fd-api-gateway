import { Controller, Inject, OnModuleInit, Get, Query } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MWC_SERVICE_NAME, MwcServiceClient, ListMwcResponse, AddHtmlResponse } from '@proto/backoffice.pb';
import { ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('BackOffice - mwc')
@Controller()
export class MwcController implements OnModuleInit {
  private svc: MwcServiceClient;

  @Inject(MWC_SERVICE_NAME)
  private readonly client: ClientGrpc;

  onModuleInit() {
    this.svc = this.client.getService<MwcServiceClient>(MWC_SERVICE_NAME);
  }

  @Get('mwc')
  @ApiOperation({ summary: 'MWC 리스트', description: 'MWC 목록' })
  public listMwc(): Observable<ListMwcResponse> {
    return this.svc.listMwc({});
  }

  @Get('mwc/html')
  @ApiOperation({ summary: 'MWC HTML 추가', description: 'MWC HTML 추가' })
  @ApiQuery({ name: 'filename', required: true, type: String })
  public addHtml(@Query('filename') filename: string): Observable<AddHtmlResponse> {
    return this.svc.addHtml({ filename });
  }
}
