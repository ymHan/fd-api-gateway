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
  addTmpVideoRequest,
  VIDEO_SERVICE_NAME,
  VideoServiceClient,
  IvpVideoResponse,
} from '@proto/fdist.pb';

import { ApiTags, ApiParam, ApiOperation, ApiQuery, ApiBody, ApiConsumes, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';

import { RealIP } from 'nestjs-real-ip';

@ApiTags('FDist - Video')
@Controller({ path: 'video' })
export class FDistController implements OnModuleInit {
  private svc: FDistServiceClient;
  private videoService: VideoServiceClient;

  @Inject(F_DIST_SERVICE_NAME)
  private readonly client: ClientGrpc;

  @Inject(VIDEO_SERVICE_NAME)
  private readonly videoClient: ClientGrpc;

  onModuleInit() {
    this.svc = this.client.getService<FDistServiceClient>(F_DIST_SERVICE_NAME);
    this.videoService = this.videoClient.getService<VideoServiceClient>(VIDEO_SERVICE_NAME);
  }

  @ApiOperation({ summary: '임시 영상 추가' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        tempId: {
          type: 'string',
          description: '임시 영상 ID',
        },
        nodeId: {
          type: 'string',
          description: '노드 ID',
        },
        ownerEmail: {
          type: 'string',
          description: '소유자 이메일',
        },
      },
    },
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @Post('shooting')
  public addTmpVideo(@Body() addTmpVideoRequest: addTmpVideoRequest): Observable<any> {
    return this.videoService.shootingVideo(addTmpVideoRequest);
  }

  @ApiOperation({ summary: '영상 등록' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        tempId: {
          type: 'string',
          description: '임시 영상 ID',
        },
        category: {
          type: 'string',
          description: '카테고리',
        },
        type: {
          type: 'string',
          description: '레코드 타입',
        },
        contents: {
          type: 'array',
          description: '작업결과물',
        },
      },
    },
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @Post('Upload')
  public videoUpload(@Body() payload: any): Observable<any> {
    return this.videoService.videoUpload(payload);
  }

  @ApiOperation({ summary: '영상 목록' })
  @ApiQuery({
    name: 'cat',
    description: 'category',
    type: 'string',
  })
  @ApiQuery({
    name: 'page',
    description: '가져올 페이지. default 1',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: '페이지 당 가져올 영상 갯수. default 10',
    type: 'number',
    required: false,
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
    description: '가져올 페이지. default 1',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: '페이지 당 가져올 영상 갯수. default 10',
    type: 'number',
    required: false,
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
  public getVideoById(@Req() req: Request, @Param() params: GetVideoByIdRequest, @RealIP() ip: string): Observable<any> {
    return this.svc.getVideoById(params);
  }

  @Get('category')
  @ApiOperation({ summary: '카테고리 조회' })
  public getCategory(): Observable<GetCategoryResponse> {
    return this.svc.getCategory({});
  }

  @Get('categories')
  @ApiOperation({ summary: '서브 카테고리 조회' })
  @ApiHeader({
    name: 'lang',
    description: '언어선택, kr | en | jp. default en',
  })
  public getCategories(@Req() request: Request): Observable<GetCategorySubResponse> {
    const { lang } = request.headers;
    return this.svc.getCategorySub({ "lang": lang as string });
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
    description: 'user email',
    type: 'string',
  })
  @ApiQuery({
    name: 'page',
    description: 'page number. default 1',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: 'get count per page. default 10',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'sort',
    description: 'sort column name [createdAt etc]. default "createdAt"',
    type: 'string',
    required: false,
  })
  @ApiQuery({
    name: 'order',
    description: 'Sort Method [asc | desc]. default "desc"',
    type: 'string',
    required: false,
  })
  public myVideoList(
    @Query('userEmail') userEmail: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: string,
    @Query('order') order: string,
  ): Observable<any> {
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

  @Get('/video/ivp/:id')
  @ApiOperation({ summary: 'IVP 메이킹 결과 통보' })
  @ApiParam({
    name: 'id',
    description: '영상 ID',
    required: true,
    type: 'number',
  })
  public ivpVideo(@Param() params: GetVideoByIdRequest): Observable<any> {
    return this.svc.ivpVideo(params);
  }
}