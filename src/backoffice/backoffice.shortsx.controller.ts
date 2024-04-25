import { Param, Controller, Inject, OnModuleInit, Get, Delete } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { BACKOFFICE__SHORTS_X__SERVICE_NAME, Backoffice_ShortsX_ServiceClient } from '@proto/backoffice.pb';

import { ApiParam, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('BackOffice - Shorts Plus')
@Controller({ path: 'bo' })
export class ShortsXController implements OnModuleInit {
  private svc: Backoffice_ShortsX_ServiceClient;

  @Inject(BACKOFFICE__SHORTS_X__SERVICE_NAME)
  private readonly client: ClientGrpc;

  onModuleInit() {
    this.svc = this.client.getService<Backoffice_ShortsX_ServiceClient>(BACKOFFICE__SHORTS_X__SERVICE_NAME);
  }

  @Get('shortsx')
  @ApiOperation({ summary: 'shorts+ 목록' })
  public listShortSx(): Observable<any> {
    return this.svc.listShortSx({});
  }

  @Delete('shortsx/:id')
  @ApiOperation({ summary: '삭제' })
  @ApiOperation({ summary: '영상 삭제' })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'video id',
  })
  public deleteShortSx(@Param() payload: { id: number }): Observable<any> {
    return this.svc.deleteShortSx(payload);
  }
}
