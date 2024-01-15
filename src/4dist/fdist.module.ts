import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FDITION_SERVICE_NAME, FDITION_PACKAGE_NAME } from '@proto/fdition.pb';

import { FDtionController } from './fdist.controller';
import { FDtionService } from './fdist.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: FDITION_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50053',
          package: FDITION_PACKAGE_NAME,
          protoPath: 'node_modules/fd-proto/proto/fdition.proto',
        },
      },
    ]),
  ],
  controllers: [FDtionController],
  providers: [FDtionService],
  exports: [FDtionService],
})
export class FDistModule {}
