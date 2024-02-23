import { Controller, Inject, OnModuleInit, Get, Param, Res, Header } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MWC_SERVICE_NAME, MwcServiceClient, ListMwcResponse, ListMwcRequest, FileDownloadRequest } from '@proto/backoffice.pb';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('BackOffice - mwc')
@Controller()
export class MwcController implements OnModuleInit {
  private svc: MwcServiceClient;

  @Inject(MWC_SERVICE_NAME)
  private readonly client: ClientGrpc;

  onModuleInit() {
    this.svc = this.client.getService<MwcServiceClient>(MWC_SERVICE_NAME);
  }

  @Get('mwc/:path')
  @ApiOperation({ summary: 'MWC 리스트', description: 'MWC 목록' })
  @ApiParam({
    name: 'path',
    description: 'path',
    required: false,
    type: 'string',
  })
  public listMwc(@Param() params: ListMwcRequest): Observable<ListMwcResponse> {
    return this.svc.listMwc({ path: params.path });
  }
}
