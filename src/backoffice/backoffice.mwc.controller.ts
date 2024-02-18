import { Controller, Inject, OnModuleInit, Get, Param, Query } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MWC_SERVICE_NAME, MwcServiceClient, ListMwcResponse, GetMwcRequest, GetMwcResponse } from '@proto/backoffice.pb';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

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

  @Get('mwc/:index')
  @ApiOperation({ summary: 'MWC 상세', description: 'MWC 상세' })
  @ApiParam({
    name: 'index',
    description: 'file index',
    required: true,
    type: 'number',
  })
  @ApiQuery({
    name: 'filename',
    description: '파일명(확장자 제외)',
    required: true,
    type: 'string',
  })
  public getMwc(@Param() params: any, @Query('filename') filename: string): Observable<GetMwcResponse> {
    Object.assign(params, {filename});
    params['index'] = parseInt(params['index'], 10);

    return this.svc.getMwc(params);
  }
}
