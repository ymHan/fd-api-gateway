import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Observable } from 'rxjs';

@WebSocketGateway()
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger = new Logger('chat');
  constructor() {
    this.logger.log('constructor');
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`Client disconnected: ${socket.id} ${socket.nsp.name}`);
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`Client connected: ${socket.id} ${socket.nsp.name}`);
  }

  afterInit() {
    // 바로 실행해야 하는 경우 여기다 때려 박는다...
  }

  @SubscribeMessage('makeRoom')
  OnMakeRoom(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    const { venueId } = data
    socket.join(`${socket.id}_room`);
    return {
      "msg": "방 만들어짐"
    }
  }
}
