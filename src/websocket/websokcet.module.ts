import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { VIDEO_SERVICE_NAME, FDIST_PACKAGE_NAME } from '@proto/fdist.pb';

import { ChatsGateway } from '@root/websocket/chats.gateway';
import { RoomService } from '@root/websocket/room.service';

@Global()
@Module({
  imports: [
    ClientsModule.register([
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
  providers: [ChatsGateway, RoomService],
})
export class WebsocketModule {}
