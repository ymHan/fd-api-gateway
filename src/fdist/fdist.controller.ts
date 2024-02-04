import { Controller, Inject, OnModuleInit, Get, Param, Query } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { F_DIST_SERVICE_NAME, FDistServiceClient, GetVideoByIdRequest, GetVideoListResponse } from '@proto/fdist.pb';

import {
  ApiTags,
  ApiParam,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('FDist - Video')
@Controller({ path: 'video' })
export class FDistController implements OnModuleInit {
  private svc: FDistServiceClient;

  @Inject(F_DIST_SERVICE_NAME)
  private readonly client: ClientGrpc;

  onModuleInit() {
    this.svc = this.client.getService<FDistServiceClient>(F_DIST_SERVICE_NAME);
  }

  @ApiOperation({ summary: '영상 목록' })
  @ApiQuery({
    name: 'cat',
    description: 'category',
    type: 'string',
  })
  @ApiQuery({
    name: 'page',
    description: 'page',
    type: 'number',
  })
  @ApiQuery({
    name: 'limit',
    description: 'limit',
    type: 'number',
  })

  @Get('videos')
  public getVideos(
    @Query('cat') cat: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Observable<GetVideoListResponse> {
    const payload = { cat, page, limit };
    return this.svc.getVideos(payload);
  }
  @ApiOperation({ summary: '영상 정보 조회' })
  @ApiParam({
    name: 'id',
    description: '영상 ID',
    required: true,
    type: 'number',
  })
  @Get('videos/:id')
  public getVideoById(@Param() params: GetVideoByIdRequest): Observable<any> {
    return this.svc.getVideoById(params);
  }
}
