import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { VideoServiceClient, VIDEO_SERVICE_NAME } from '@proto/backoffice.pb';

@Injectable()
export class VideoService {
  private svc: VideoServiceClient;

  @Inject(VIDEO_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit() {
    this.svc = this.client.getService<VideoServiceClient>(VIDEO_SERVICE_NAME);
  }
}
