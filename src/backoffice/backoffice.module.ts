import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  B_O__CUSTOMER__SERVICE_NAME,
  B_O__VENUE__SERVICE_NAME,
  B_O__MEMBER__SERVICE_NAME,
  B_O__SECTOR__SERVICE_NAME,
  BACKOFFICE_PACKAGE_NAME,
} from '../proto/backoffice.pb';

import { CustomerController } from './backoffice.customer.controller';
import { VenueController } from './backoffice.venue.controller';
import { SectorController } from './backoffice.sector.controller';

import { CustomerService } from './backoffice.customer.service';
import { VenueService } from './backoffice.venue.service';
import { SectorService } from './backoffice.sector.service';


@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: B_O__CUSTOMER__SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: BACKOFFICE_PACKAGE_NAME,
          protoPath: 'node_modules/fd-proto/proto/backoffice.proto',
        },
      },
      {
        name: B_O__VENUE__SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: BACKOFFICE_PACKAGE_NAME,
          protoPath: 'node_modules/fd-proto/proto/backoffice.proto',
        },
      },
      {
        name: B_O__SECTOR__SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: BACKOFFICE_PACKAGE_NAME,
          protoPath: 'node_modules/fd-proto/proto/backoffice.proto',
        },
      },
      {
        name: B_O__MEMBER__SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: BACKOFFICE_PACKAGE_NAME,
          protoPath: 'node_modules/fd-proto/proto/backoffice.proto',
        },
      }
    ]),
  ],
  controllers: [CustomerController, VenueController, SectorController],
  providers: [CustomerService, VenueService, VenueService],
  exports: [CustomerService, VenueService, VenueService],
})
export class BackofficeModule {}
