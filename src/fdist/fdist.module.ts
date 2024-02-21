import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { F_DIST_SERVICE_NAME, FDIST_PACKAGE_NAME, MWC_SERVICE_NAME, VIDEO_SERVICE_NAME } from '@proto/fdist.pb';

import { FDistController } from './fdist.controller';
import { FDistService } from './fdist.service';
import { MwcController } from './mwc.controller';
import { MwcService } from './mwc.service';

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
  controllers: [FDistController, MwcController],
  providers: [FDistService,MwcService],
  exports: [FDistService, MwcService],
})
export class FDistModule {}
