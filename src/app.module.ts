import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MemberModule } from './member/member.module';
import { BackofficeModule } from './backoffice/backoffice.module';

import { FditionModule } from './4dition/4dition.module';
@Module({
  imports: [MemberModule, BackofficeModule, FditionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
