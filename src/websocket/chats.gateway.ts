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
import { RoomService } from './room.service';
import { ListRoomDto } from './list-room.dto';
import { v4 as uuidv4 } from 'uuid';

@WebSocketGateway()
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private logger = new Logger('chat');
  constructor(private readonly roomService: RoomService) {}

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    const { roomId } = socket.data;
    if ( roomId !== 'lobby' && !this.server.sockets.adapter.rooms.get(roomId)) {
      this.roomService.deleteRoom(roomId);
    }
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    socket.leave(socket.id)
    socket.data.roomId = 'lobby';
    socket.join('lobby');
  }

  afterInit() {
    // 바로 실행해야 하는 경우 여기다 때려 박는다...
  }

  @SubscribeMessage('makeRoom') //4dition
  makeRoom(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    const { venueId } = data
    const roomId = venueId + '::' + socket.id;
    if ((socket.data.roomId !== 'lobby') && this.server.sockets.adapter.rooms.get(socket.data.roomId).size) {
      this.roomService.deleteRoom(socket.data.roomId)
    }

    this.roomService.makeRoom(socket, roomId);

    socket.emit('get-message', {
      result: 'ok',
      status: 'success',
      message: 'Shooting is ready',
      data: [{
        roomId,
      }]
    });

    return {
      roomId: socket.data.roomId
    }
  }

  @SubscribeMessage('joinRoom') //4dist
  joinRoom(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    const { venueId, userEmail } = data;
    const { roomId, hostId } = this.roomService.findRoom(venueId);

    if (socket.rooms.has(roomId)) { return; }

    if (socket.data.roomId !== 'lobby' && this.server.sockets.adapter.rooms.get(socket.data.roomId).size) {
      this.roomService.deleteRoom(socket.data.roomId);
    }
    this.roomService.joinRoom(socket, { venueId, userEmail, roomId });
    socket.emit('get-message', {
      result: 'ok',
      status: 'success',
      message: 'Shooting is ready',
      data: [{
        roomId,
        hostId,
      }]
    });
  }

  @SubscribeMessage('shooting')
  shooting(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    const { venueId, userEmail, command, roomId, hostId } = data;
    socket.except(hostId).emit('cmd-message', {
      task_id: uuidv4(),
      record_id: uuidv4(),
      command,
      upload_url: 'http://file.4dist.com/oss'
    })
  }
}
