import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { F_DIST_SERVICE_NAME, FDIST_PACKAGE_NAME } from '@proto/fdist.pb';

import { FDistController } from './fdist.controller';
import { FDistService } from './fdist.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: F_DIST_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: FDIST_PACKAGE_NAME,
          protoPath: 'node_modules/fd-proto/proto/fdist.proto',
        },
      },
    ]),
  ],
  controllers: [FDistController],
  providers: [FDistService],
  exports: [FDistService],
})
export class FDistModule {}
