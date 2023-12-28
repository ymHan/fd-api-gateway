import { Module } from '@nestjs/common';

import { MemberModule } from './member/member.module';
import { BackofficeModule } from './backoffice/backoffice.module';

import { FDtionModule } from '@root/fdtion/fdtion.module';
import { RouterModule } from '@nestjs/core';
@Module({
  imports: [
    MemberModule,
    BackofficeModule,
    FDtionModule,
    RouterModule.register([
      {
        path: 'api/v1',
        module: MemberModule,
      },
      {
        path: 'api/v1',
        module: BackofficeModule,
      },
      {
        path: 'api/v1',
        module: FDtionModule,
      },
    ]),
  ],
})
export class AppModule {}
