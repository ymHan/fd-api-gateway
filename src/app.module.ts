import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { BackofficeModule } from './backoffice/backoffice.module';

@Module({
  imports: [MemberModule, BackofficeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
