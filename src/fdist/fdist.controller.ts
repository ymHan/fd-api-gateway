import { Controller, Inject, OnModuleInit, Get, Param, Query, Body, Post, Req } from '@nestjs/common';
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
  GetRecordTypeResponse,
  GetVideoRecordTypeResponse,
  GetLikeCheckRequest,
  GetLikeCheckResponse,
  MyVideoListRequest,
  MyVideoListResponse,
  MyVideoExistsRequest,
  MyVideoExistsResponse,
} from '@proto/fdist.pb';

import { ApiTags, ApiParam, ApiOperation, ApiQuery, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Request } from 'express';
import * as requestIp from 'request-ip';
import * as requestPromise from 'request-promise';

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

  @ApiOperation({ summary: '영상 레코드 타입 별 목록' })
  @ApiQuery({
    name: 'type',
    description: 'type',
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
  @Get('videos/recordType')
  public getVideoRecordType(
    @Query('type') type: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Observable<GetVideoRecordTypeResponse> {
    const payload = { type, page, limit };
    return this.svc.getVideoRecordType(payload);
  }

  @ApiOperation({ summary: '영상 정보 조회' })
  @ApiParam({
    name: 'id',
    description: '영상 ID',
    required: true,
    type: 'number',
  })
  @Get('videos/:id')
  public getVideoById(@Req() req: Request, @Param() params: GetVideoByIdRequest): Observable<any> {
    this.getCountryCode(req).then((result) => {
      console.log(req.ip);
      console.log(result);
    });

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

  @Get('recordType')
  @ApiOperation({ summary: '레코드 타입 조회' })
  public getRecordType(): Observable<GetRecordTypeResponse> {
    return this.svc.getRecordType({});
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

  @Get('like')
  @ApiOperation({ summary: '좋아요 여부 조회' })
  @ApiQuery({
    name: 'userId',
    description: '사용자 아이디',
    type: 'number',
  })
  @ApiQuery({
    name: 'videoId',
    description: '영상 아이디',
    type: 'number',
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  public getLikeCheck(@Query() payload: GetLikeCheckRequest): Observable<GetLikeCheckResponse> {
    return this.svc.getLikeCheck(payload);
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

  @Get('/my')
  @ApiOperation({ summary: '내 영상 목록' })
  @ApiQuery({
    name: 'userEmail',
    description: '사용자 이메일',
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
  @ApiQuery({
    name: 'sort',
    description: 'sort',
    type: 'string',
  })
  @ApiQuery({
    name: 'order',
    description: 'order',
    type: 'string',
  })
  public myVideoList(
    @Query('userEmail') userEmail: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: string,
    @Query('order') order: string,
  ): Observable<MyVideoListResponse> {
    const payload: MyVideoListRequest = { userEmail, page, limit, sort, order };
    return this.svc.myVideoList(payload);
  }

  @Get('/my/exists')
  @ApiOperation({ summary: '내 영상 존재 여부' })
  @ApiQuery({
    name: 'userEmail',
    description: '사용자 이메일',
    type: 'string',
  })
  public myVideoExists(@Query('userEmail') userEmail: string): Observable<MyVideoExistsResponse> {
    const payload: MyVideoExistsRequest = { userEmail };
    return this.svc.myVideoExists(payload);
  }

  async getCountryCode(req): Promise<string | null> {
    const ip = requestIp.getClientIp(req);
    if (!ip) {
      return null;
    }

    try {
      const response = await requestPromise({
        uri: `https://ipapi.co/${ip}/country/`,
        json: true,
      });

      return response.country;
    } catch (error) {
      console.error('Error getting country code', error.message);
      return null;
    }
  }
}
