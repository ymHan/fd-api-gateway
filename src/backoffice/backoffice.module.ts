import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  B_O__CUSTOMER__SERVICE_NAME,
  B_O__VENUE__SERVICE_NAME,
  B_O__MEMBER__SERVICE_NAME,
  B_O__SECTOR__SERVICE_NAME,
  CATEGORY_SERVICE_NAME,
  BACKOFFICE_PACKAGE_NAME,
  MWC_SERVICE_NAME,
  VIDEO_SERVICE_NAME,
  APP_VERSION_SERVICE_NAME,
} from '@proto/backoffice.pb';

import { CustomerController } from './backoffice.customer.controller';
import { VenueController } from './backoffice.venue.controller';
import { SectorController } from './backoffice.sector.controller';
import { CategoryController } from './backoffice.category.controller';
import { MwcController } from './backoffice.mwc.controller';
import { VideoController } from './backoffice.video.controller';
import { AppVersionController } from './backoffice.app.version.controller';

import { CustomerService } from './backoffice.customer.service';
import { VenueService } from './backoffice.venue.service';
import { SectorService } from './backoffice.sector.service';
import { CategoryService } from './backoffice.category.service';
import { MwcService } from './backoffice.mwc.service';
import { VideoService } from './backoffice.video.service';
import { AppVersionService } from './backoffice.app.version.service';
import { CommonService } from '@root/common/common.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: B_O__CUSTOMER__SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50054',
          package: BACKOFFICE_PACKAGE_NAME,
          protoPath: 'node_modules/fd-proto/proto/backoffice.proto',
        },
      },
      {
        name: B_O__VENUE__SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50054',
          package: BACKOFFICE_PACKAGE_NAME,
          protoPath: 'node_modules/fd-proto/proto/backoffice.proto',
        },
      },
      {
        name: B_O__SECTOR__SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50054',
          package: BACKOFFICE_PACKAGE_NAME,
          protoPath: 'node_modules/fd-proto/proto/backoffice.proto',
        },
      },
      {
        name: B_O__MEMBER__SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50054',
          package: BACKOFFICE_PACKAGE_NAME,
          protoPath: 'node_modules/fd-proto/proto/backoffice.proto',
        },
      },
      {
        name: CATEGORY_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50054',
          package: BACKOFFICE_PACKAGE_NAME,
          protoPath: 'node_modules/fd-proto/proto/backoffice.proto',
        },
      },
      {
        name: MWC_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50054',
          package: BACKOFFICE_PACKAGE_NAME,
          protoPath: 'node_modules/fd-proto/proto/backoffice.proto',
        },
      },
      {
        name: VIDEO_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50054',
          package: BACKOFFICE_PACKAGE_NAME,
          protoPath: 'node_modules/fd-proto/proto/backoffice.proto',
        },
      },
      {
        name: APP_VERSION_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50054',
          package: BACKOFFICE_PACKAGE_NAME,
          protoPath: 'node_modules/fd-proto/proto/backoffice.proto',
        },
      },
    ]),
  ],
  controllers: [
    CustomerController,
    VenueController,
    SectorController,
    CategoryController,
    MwcController,
    VideoController,
    AppVersionController,
  ],
  providers: [
    CustomerService,
    VenueService,
    SectorService,
    CategoryService,
    MwcService,
    VideoService,
    AppVersionService,
    CommonService,
  ],
  exports: [
    CustomerService,
    VenueService,
    SectorService,
    CategoryService,
    MwcService,
    VideoService,
    AppVersionService,
    CommonService,
  ],
})
export class BackofficeModule {}
