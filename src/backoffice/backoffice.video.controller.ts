import { Body, Controller, Inject, OnModuleInit, Post, Get, Req, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  VideoServiceClient,
  VIDEO_SERVICE_NAME,
  V1CreateVideoRequest,
  V1CreateVideoResponse,
  V1GetVideoRequest,
  V1GetVideoResponse,
} from '@proto/backoffice.pb';
import { Category, CategorySubEnum, CategorySubCodeEnum, RecordType } from '@root/models/enum';
import { ApiConsumes, ApiTags, ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('BackOffice - Video')
@Controller({ path: 'bo' })
export class VideoController implements OnModuleInit {
  private svc: VideoServiceClient;

  @Inject(VIDEO_SERVICE_NAME)
  private readonly client: ClientGrpc;

  onModuleInit() {
    this.svc = this.client.getService<VideoServiceClient>(VIDEO_SERVICE_NAME);
  }

  @Post('video')
  @ApiOperation({ summary: 'Create a video', description: 'Create a video' })
  @ApiConsumes('application/json')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        title: { type: 'string' },
        subTitle: { type: 'string' },
        description: { type: 'string' },
        ownerName: { type: 'string' },
        ownerNickName: { type: 'string' },
        ownerChannelName: { type: 'string' },
        ownerProfileIconUrl: { type: 'string' },
        thumbnailUrl: { type: 'string' },
        duration: { type: 'string' },
        category: {
          type: 'string',
          items: {
            enum: Object.values(Category),
          },
        },
        categorySub: {
          type: 'string',
          items: {
            enum: Object.values(CategorySubEnum),
          },
        },
        categorySubCode: {
          type: 'string',
          items: {
            enum: Object.values(CategorySubCodeEnum),
          },
        },
        recordType: {
          type: 'string',
          items: {
            enum: Object.values(RecordType),
          },
        },
        contentUrlList: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        poseIndicatorList: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        nodeId: { type: 'string'},
      },
    },
  })
  public createVideo(@Req() req: Request, @Body() payload: V1CreateVideoRequest): Observable<V1CreateVideoResponse> {
    return this.svc.v1CreateVideo(payload);
  }

  @Get('video/:id')
  @ApiOperation({ summary: 'Get a video', description: 'Get a video' })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'video id',

  })
  public getVideo(@Param() params: V1GetVideoRequest): Observable<V1GetVideoResponse> {
    return this.svc.v1GetVideo(params);
  }
}
