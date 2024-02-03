import { Controller, Inject, OnModuleInit, Get, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  F_DIST_SERVICE_NAME,
  FDistServiceClient,
  GetVideoByIdRequest,
  GetVideoByIdResponse,
  GetVideoListResponse,
} from '@proto/fdist.pb';

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
import { LeaveMemberRequest } from '@proto/member.pb';
@ApiTags('FDist - Video')
@Controller({ path: 'video' })
export class FDistController implements OnModuleInit {
  private svc: FDistServiceClient;

  @Inject(F_DIST_SERVICE_NAME)
  private readonly client: ClientGrpc;

  onModuleInit() {
    this.svc = this.client.getService<FDistServiceClient>(F_DIST_SERVICE_NAME);
  }
  
  @ApiOperation({ summary: '영상 전체 목록' })
  @Get('videos')
  public getVideos(): Observable<GetVideoListResponse> {
    return this.svc.getVideos({});
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
