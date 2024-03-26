import { Module } from '@nestjs/common';
import { ChatsGateway } from '@root/websocket/chats.gateway';
import { RoomService } from '@root/websocket/room.service';

@Module({
  providers: [ ChatsGateway, RoomService ]
})
export class WebsocketModule {}