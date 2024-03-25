import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MemberController } from './member.controller';
import { MEMBER_SERVICE_NAME, MEMBER_PACKAGE_NAME } from '../proto/member.pb';
import { MemberService } from './member.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { AppleStrategy } from './strategy/apple.strategy';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: MEMBER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: MEMBER_PACKAGE_NAME,
          protoPath: 'node_modules/fd-proto/proto/member.proto',
        },
      },
    ]),
  ],
  controllers: [MemberController],
  providers: [MemberService, GoogleStrategy, AppleStrategy],
  exports: [MemberService],
})
export class MemberModule {}
