import { Controller, Inject, OnModuleInit, Get } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { F_DIST_SERVICE_NAME, FDistServiceClient, GetVideoListResponse } from '@proto/fdist.pb';

import { ApiTags } from '@nestjs/swagger';
@ApiTags('FDist - Video')
@Controller({ path: 'video' })
export class FDistController implements OnModuleInit {
  private svc: FDistServiceClient;

  @Inject(F_DIST_SERVICE_NAME)
  private readonly client: ClientGrpc;

  onModuleInit() {
    this.svc = this.client.getService<FDistServiceClient>(F_DIST_SERVICE_NAME);
  }
  @Get('videos')
  public getVideos(): Observable<GetVideoListResponse> {
    console.log('getVideos');
    return this.svc.getVideos({});
  }
}
