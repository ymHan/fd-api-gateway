import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { F_DIST_SERVICE_NAME, FDIST_PACKAGE_NAME, MWC_SERVICE_NAME, VIDEO_SERVICE_NAME } from '@proto/fdist.pb';

import { FDistController } from './fdist.controller';
import { FDistService } from './fdist.service';
import { MwcFDistController } from './mwc-fdist.controller';
import { MwcFDistService } from './mwc-fdist.service';

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
      {
        name: MWC_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: FDIST_PACKAGE_NAME,
          protoPath: 'node_modules/fd-proto/proto/fdist.proto',
        },
      },
      {
        name: VIDEO_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: FDIST_PACKAGE_NAME,
          protoPath: 'node_modules/fd-proto/proto/fdist.proto',
        },
      },
    ]),
  ],
  controllers: [FDistController, MwcFDistController],
  providers: [FDistService,MwcFDistService],
  exports: [FDistService, MwcFDistService],
})
export class FDistModule {}
