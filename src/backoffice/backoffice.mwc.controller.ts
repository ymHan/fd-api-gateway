import { Controller, Inject, OnModuleInit, Get, Param, Query, Res, UseInterceptors, HttpStatus } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MWC_SERVICE_NAME, MwcServiceClient, ListMwcResponse, GetMwcResponse } from '@proto/backoffice.pb';
import { ApiOperation, ApiParam, ApiQuery, ApiTags, ApiResponse, ApiProduces } from '@nestjs/swagger';

import { CommonService } from '@root/common/common.service';
import { Response } from 'express';
import { LoggingInterceptor } from '@root/common/logging.interceptor';

@UseInterceptors(LoggingInterceptor)
@ApiTags('BackOffice - mwc')
@Controller()
export class MwcController implements OnModuleInit {
  constructor(private readonly commonService: CommonService) {}

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
    Object.assign(params, { filename });
    params['index'] = parseInt(params['index'], 10);

    return this.svc.getMwc(params);
  }

  @Get('mwc/:filename')
  @ApiOperation({ summary: '파일 다운로드', description: '파일 다운로드' })
  @ApiParam({
    name: 'filename',
    description: 'file name',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    schema: {
      type: 'string',
      format: 'binary',
    },
    status: HttpStatus.OK,
  })
  @ApiProduces('application/octet-stream')
  public mp4Stream(@Res() response: Response, @Param('filename') filename: string) {
    const file = this.commonService.mp4Stream(filename);
    response.contentType('video/mp4')
    response.send(file);
  }
}
