import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MemberModule } from './member/member.module';
import { BackofficeModule } from './backoffice/backoffice.module';
import { FDtionModule } from '@root/fdtion/fdtion.module';
import { FDistModule } from '@root/fdist/fdist.module';
import { ChatsGateway } from '@root/websocket/chats.gateway'
import { RouterModule } from '@nestjs/core';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MemberModule,
    BackofficeModule,
    FDtionModule,
    FDistModule,
    ChatsGateway,
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
