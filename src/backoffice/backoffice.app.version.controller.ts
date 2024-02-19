import { Controller, OnModuleInit, Inject, Get, Body, Patch, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  APP_VERSION_SERVICE_NAME,
  AppVersionCreateRequest,
  AppVersionServiceClient,
  AppVersionUpdateRequest,
} from '@proto/backoffice.pb';

import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('BackOffice - AppVersion')
@Controller({ path: 'app' })
export class AppVersionController implements OnModuleInit {
  private svc: AppVersionServiceClient;

  @Inject(APP_VERSION_SERVICE_NAME)
  private readonly client: ClientGrpc;

  onModuleInit() {
    this.svc = this.client.getService<AppVersionServiceClient>(APP_VERSION_SERVICE_NAME);
  }

  @Get('version/ios')
  @ApiOperation({ summary: 'Get IOS App Version' })
  public getIosVersion(): Observable<any> {
    return this.svc.getIosVersion({});
  }

  @Get('version/android')
  @ApiOperation({ summary: 'Get Android App Version' })
  public getAndroidVersion(): Observable<any> {
    return this.svc.getAndroidVersion({});
  }

  @Post('create')
  @ApiOperation({ summary: 'Create App Version' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        appName: { type: 'string' },
        version: { type: 'string' },
        description: { type: 'string' },
        platform: { type: 'string' },
      },
    },
  })
  public createVersion(@Body() payload: AppVersionCreateRequest): Observable<any> {
    return this.svc.createVersion(payload);
  }

  @Patch('update')
  @ApiOperation({ summary: 'Update App Version' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        appName: { type: 'string' },
        version: { type: 'string' },
        description: { type: 'string' },
        platform: { type: 'string' },
      },
    },
  })
  public updateVersion(@Body() payload: AppVersionUpdateRequest): Observable<any> {
    return this.svc.updateVersion(payload);
  }
}
