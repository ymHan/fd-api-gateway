import { Controller, Inject, OnModuleInit, Delete, Body, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  MWC_SERVICE_NAME,
  MwcServiceClient,
  VIDEO_SERVICE_NAME,
  VideoServiceClient,
} from '@proto/fdist.pb';

import { ApiTags, ApiOperation, ApiBody, ApiConsumes } from '@nestjs/swagger';

@ApiTags('FDist - MWC')
@Controller({ path: 'mwc' })
export class MwcFDistController implements OnModuleInit {
  private mwcSvc: MwcServiceClient;
  private videoSvc: VideoServiceClient;

  @Inject(MWC_SERVICE_NAME)
  private readonly mwcClient: ClientGrpc;

  @Inject(VIDEO_SERVICE_NAME)
  private readonly videoClient: ClientGrpc;

  onModuleInit() {
    this.mwcSvc = this.mwcClient.getService<MwcServiceClient>(MWC_SERVICE_NAME);
    this.videoSvc = this.videoClient.getService<VideoServiceClient>(VIDEO_SERVICE_NAME);
  }

  @Post('vide/publish')
  @ApiOperation({ summary: '영상 공개/비공개' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          description: '사용자 이메일',
        },
        videoId: {
          type: 'number',
          description: '영상 아이디',
        },
      },
    },
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  public togglePublished(@Body() payload: any): Observable<any> {
    return this.videoSvc.togglePublished(payload);
  }

  @Delete('video')
  @ApiOperation({ summary: '영상 삭제' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          description: '사용자 이메일',
        },
        videoId: {
          type: 'number',
          description: '영상 아이디',
        },
      },
    },
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  public deleteVideo(@Body() payload: any): Observable<any> {
    return this.videoSvc.deleteVideo(payload);
  }

  @Post('video')
  @ApiOperation({ summary: '영상 업로드' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          description: '사용자 이메일',
        },
        fileName: {
          type: 'string',
          description: '영상 파일',
        },
      },
    },
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  public addMwc(@Body() payload: any): Observable<any> {
    return this.mwcSvc.addMwc(payload);
  }

  @Post('video/exists')
  @ApiOperation({ summary: '영상 존재 여부' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          description: '사용자 이메일',
        },
        fileName: {
          type: 'string',
          description: '영상 파일',
        },
      },
    },
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  public existsMwc(@Body() payload: any): Observable<any> {
    return this.mwcSvc.existsMwc(payload);
  }
}
