import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { MwcServiceClient, MWC_SERVICE_NAME, VIDEO_SERVICE_NAME, VideoServiceClient } from '@proto/fdist.pb';

@Injectable()
export class MwcService {
  private videoSvc: VideoServiceClient;
  private mwcSvc: MwcServiceClient;

  @Inject(MWC_SERVICE_NAME)
  private readonly mwcClient: ClientGrpc;

  @Inject(VIDEO_SERVICE_NAME)
  private readonly videoClient: ClientGrpc;

  public onModuleInit(): void {
    this.videoSvc = this.videoClient.getService<VideoServiceClient>(VIDEO_SERVICE_NAME);
    this.mwcSvc = this.mwcClient.getService<MwcServiceClient>(MWC_SERVICE_NAME);
  }
}
