import { Controller, Inject, OnModuleInit, Delete, Body, Post, Put } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  MWC_SERVICE_NAME,
  MwcServiceClient,
  VIDEO_SERVICE_NAME,
  VideoServiceClient,
  UpdateVideoMetaInfoRequest,
  DeleteVideoRequest,
  DeleteVideoResponse,
  AddMwcRequest,
  AddMwcResponse,
  UpdateVideoMetaInfoResponse,
} from '@proto/fdist.pb';

import { ApiTags, ApiOperation, ApiBody, ApiConsumes } from '@nestjs/swagger';

@ApiTags('FDist - MWC')
@Controller({ path: 'mwc' })
export class MwcController implements OnModuleInit {
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

  @Put('video')
  @ApiOperation({ summary: '영상 정보 수정' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userEmail: {
          type: 'string',
          description: '사용자 이메일',
        },
        videoId: {
          type: 'number',
          description: '영상 아이디',
        },
        title: {
          type: 'string',
          description: '영상 제목',
        },
        subTitle: {
          type: 'string',
          description: '영상 부 제목',
        },
        description: {
          type: 'string',
          description: '영상 설명',
        },
      },
    },
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  public updateVideoMetaInfo(@Body() payload: UpdateVideoMetaInfoRequest): Observable<UpdateVideoMetaInfoResponse> {
    return this.mwcSvc.updateVideoMetaInfo(payload);
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
  public deleteVideo(@Body() payload: DeleteVideoRequest): Observable<DeleteVideoResponse> {
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
  public addMwc(@Body() payload: AddMwcRequest): Observable<AddMwcResponse> {
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
