import { Controller, Inject, OnModuleInit, Get, Param, Query, Body, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  F_DIST_SERVICE_NAME,
  FDistServiceClient,
  GetCategorySubResponse,
  GetVideoByIdRequest,
  GetVideoListResponse,
  ReportVideoResponse,
  ToggleLikeRequest,
  ReportVideoRequest,
  GetCategoryResponse,
} from '@proto/fdist.pb';

import { ApiTags, ApiParam, ApiOperation, ApiQuery, ApiBody, ApiConsumes } from '@nestjs/swagger';

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

  @Get('category')
  @ApiOperation({ summary: '카테고리 조회' })
  public getCategory(): Observable<GetCategoryResponse> {
    return this.svc.getCategory({});
  }

  @Get('categories')
  @ApiOperation({ summary: '서브 카테고리 조회' })
  public getCategories(): Observable<GetCategorySubResponse> {
    return this.svc.getCategorySub({});
  }

  @Post('like')
  @ApiOperation({ summary: '좋아요 토글' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'number',
          description: '사용자 아이디',
        },
        videoId: {
          type: 'number',
          description: '영상 아이디',
        },
      },
    },
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  public toggleLike(@Body() toggleLikeRequest: ToggleLikeRequest): Observable<any> {
    return this.svc.toggleLike(toggleLikeRequest);
  }

  @Post('report')
  @ApiOperation({ summary: '영상 신고' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'number',
          description: '사용자 아이디',
        },
        videoId: {
          type: 'number',
          description: '영상 아이디',
        },
        reportType: {
          type: 'number',
          description: '신고 타입',
        },
        report: {
          type: 'string',
          description: '신고 내용',
        },
      },
    },
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  public reportVideo(@Body() reportVideoRequest: ReportVideoRequest): Observable<ReportVideoResponse> {
    return this.svc.reportVideo(reportVideoRequest);
  }
}
