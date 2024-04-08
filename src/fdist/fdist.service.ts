import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { FDistServiceClient, F_DIST_SERVICE_NAME, VIDEO_SERVICE_NAME, VideoServiceClient } from '@proto/fdist.pb';

@Injectable()
export class FDistService {
  private svc: FDistServiceClient;
  private videoService: VideoServiceClient;

  @Inject(F_DIST_SERVICE_NAME)
  private readonly client: ClientGrpc;

  @Inject(VIDEO_SERVICE_NAME)
  private readonly videoClient: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<FDistServiceClient>(F_DIST_SERVICE_NAME);
    this.videoService = this.videoClient.getService<VideoServiceClient>(VIDEO_SERVICE_NAME);
  }
}
