import { Controller, Inject, OnModuleInit, Get, Param, Res, Header, StreamableFile } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MWC_SERVICE_NAME, MwcServiceClient, ListMwcResponse } from '@proto/backoffice.pb';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

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

  @Get('mwc/download/:filename')
  @Header('Content-type', 'video/mpeg')
  @ApiOperation({ summary: '파일 다운로드', description: '파일 다운로드' })
  @ApiParam({
    name: 'filename',
    description: 'file name',
    required: false,
    type: 'string',
  })
  public fileDownload(@Res({ passthrough: true }) res: Response, @Param('filename') filename: string): StreamableFile {
    const filePath = `${process.env.MWC_FILE_DOWNLOAD_PATH}${this.getDates()}${filename}`;
    const file = createReadStream(join(process.cwd(), filePath));
    res.set({
      'Content-Type': 'video/mp4',
      'Content-Diposition': `attachment; filename=${filename}`,
    });
    return new StreamableFile(file);
  }

  private getDates() {
    let months = '';
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    if (month < 10) {
      months = `0${month}`;
    }
    const day = date.getDate();
    return `${year}${months}${day}`;
  }
}
