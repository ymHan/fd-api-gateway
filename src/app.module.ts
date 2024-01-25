import { Module } from '@nestjs/common';

import { MemberModule } from './member/member.module';
import { BackofficeModule } from './backoffice/backoffice.module';

import { FDtionModule } from '@root/fdtion/fdtion.module';
import { FDistModule } from '@root/4dist/fdist.module';

import { RouterModule } from '@nestjs/core';
import { EventsModule } from '@root/websocket/events.module';

@Module({
  imports: [
    MemberModule,
    BackofficeModule,
    FDtionModule,
    EventsModule,
    RouterModule.register([
      {
        path: 'v1',
        module: MemberModule,
      },
      {
        path: 'v1',
        module: BackofficeModule,
      },
      {
        path: 'v1',
        module: FDtionModule,
      },
      {
        path: 'v1',
        module: FDistModule,
      },
    ]),
  ],
})
export class AppModule {}
