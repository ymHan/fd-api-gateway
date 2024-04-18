import { HttpService } from '@nestjs/axios';
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
import { v4 as uuidv4 } from 'uuid';
import { lastValueFrom, map } from 'rxjs';

@WebSocketGateway()
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  constructor(
    private readonly roomService: RoomService,
    private readonly httpService: HttpService,
  ) {}

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    const { roomId } = socket.data;
    if (roomId !== 'lobby' && !this.server.sockets.adapter.rooms.get(roomId)) {
      this.roomService.deleteRoom(roomId);
    }
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    socket.leave(socket.id);
    socket.data.roomId = 'lobby';
    socket.join('lobby');
    socket.emit('get-message', {
      result: 'ok',
      status: 'success',
      message: `Your Socket ID's ${socket.id}`,
      data: [{ socket: socket.id }],
    });
  }

  afterInit() {
    // 바로 실행해야 하는 경우 여기다 때려 박는다...
  }

  @SubscribeMessage('makeRoom') //4dition
  makeRoom(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    if (Object.keys(data).length === 0 || Object.keys(data)[0] !== 'nodeId') {
      socket.emit('room-message', {
        result: 'ok',
        status: 'fail',
        message: 'Failed to make room. Invalid data',
      });
      return;
    }

    const { nodeId } = data;
    const roomId = `${nodeId}::${socket.id}`;
    if (socket.data.roomId !== 'lobby' && this.server.sockets.adapter.rooms.get(socket.data.roomId).size) {
      this.roomService.deleteRoom(socket.data.roomId);
    }

    this.roomService.makeRoom(socket, roomId);

    socket.emit('room-message', {
      result: 'ok',
      status: 'success',
      message: 'Shooting is ready',
      data: [
        {
          roomId,
        },
      ],
    });

    return {
      roomId: socket.data.roomId,
    };
  }

  @SubscribeMessage('joinRoom') //4dist
  joinRoom(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    const { nodeId, userEmail } = data;
    const roomExists = this.roomService.findRoom(nodeId);
    // 룸이 존재하지 않는다면,
    if (!roomExists) {
      socket.emit('get-message::joinRoom', {
        result: 'ok',
        status: 'fail',
        message: 'Failed to join room. Room is not exist',
      });
    } else {
      // 이미 접속해 있는 경우 재접속 차단
      if (socket.rooms.has(roomExists.roomId)) {
        socket.emit('get-message::joinRoom', {
          result: 'ok',
          status: 'fail',
          message: 'You are already in the room',
        });
        return;
      }

      const roomReady = roomExists.roomStatus;
      // 룸이 촬영 준비가 되지 않았다면,
      if (roomReady !== 'ready') {
        socket.emit('get-message::joinRoom', {
          result: 'ok',
          status: 'fail',
          message: 'Failed to join room. Shooting is not ready',
        });
      }

      if (roomExists && roomReady === 'ready') {
        const { roomId, hostId } = roomExists;

        if (socket.data.roomId !== 'lobby' && this.server.sockets.adapter.rooms.get(socket.data.roomId).size) {
          this.roomService.deleteRoom(socket.data.roomId);
        }
        this.roomService.joinRoom(socket, { nodeId, userEmail, roomId });
        this.roomService.addUserList(roomId, userEmail);

        socket.emit('get-message::joinRoom', {
          result: 'ok',
          status: 'success',
          message: 'Joined room. Shooting is ready',
          data: [
            {
              roomId,
              hostId,
            },
          ],
        });
      }
    }
  }

  // 촬영 가능 여부 판단
  @SubscribeMessage('checkShooting')
  checkShooting(@ConnectedSocket() socket: Socket) {
    if (socket.data.roomId === 'lobby') {
      socket.emit('get-message::checkShooting', {
        result: 'ok',
        status: 'fail',
        message: 'Failed to check shooting. You are not in the room',
      });
    }

    const { roomId } = socket.data;
    const roomExists = this.roomService.findRoom(roomId);
    const roomReady = this.roomService.getRoomStatus(roomExists.roomId);
    let result;
    if (roomExists && roomReady === 'ready') {
      result = {
        result: 'ok',
        status: 'success',
        message: 'Shooting is ready',
      };
    } else {
      result = {
        result: 'ok',
        status: 'fail',
        message: 'Shooting is not ready',
      };
    }

    socket.emit('get-message::checkShooting', result);
  }

  // 촬영 명령어 전달
  @SubscribeMessage('shooting')
  async shooting(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    const { nodeId, userEmail, command, hostId } = data;
    const roomId = `${nodeId}::${hostId}`;
    if (socket.data.roomId !== roomId) {
      socket.emit('get-message::shooting', {
        result: 'ok',
        status: 'fail',
        message: 'Failed to shoot. You are not in the room',
      });
      return;
    }

    if (this.roomService.getRoomStatus(roomId) !== 'ready') {
      socket.emit('get-message::shooting', {
        result: 'ok',
        status: 'fail',
        message: 'Currently in preparation for shooting. Please wait a moment.',
      });
    } else {
      // 룸의 상태 정보를 filming으로 변경
      this.roomService.updateRoomStatus(roomId, 'filming');
      const taskId = uuidv4();
      const tempId = uuidv4();
      const payload = {
        tempId,
        nodeId,
        ownerEmail: userEmail,
      };

      socket.except(hostId).emit('cmd-message', {
        task_id: taskId,
        record_id: tempId,
        user_email: userEmail,
        command,
        upload_url: 'http://file.4dist.com/oss',
        category: this.roomService.getSportsCategory(nodeId),
        types: this.roomService.getRecordType(nodeId),
      });

      socket.emit('get-message::shooting', {
        result: 'ok',
        status: 'success',
        message: 'Filming is progress',
      });

      await this.addTempVideo(payload);
    }
  }

  @SubscribeMessage('ack-message')
  ackMessage(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    const { task_id, record_id, command, status } = data;

    socket.to(socket.data.roomId).emit('get-message::shooting', {
      task_id,
      record_id,
      command,
      status,
    });

    this.roomService.exitRoom(socket.data.roomId, this.server.sockets);
  }

  async addTempVideo(payload) {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const request = this.httpService
      .post(process.env.FDITION_UPLOAD_TEMP_URL, JSON.stringify(payload), options)
      .pipe(map((res) => res.data));
    await lastValueFrom(request);
  }

  @SubscribeMessage('makeReady')
  makeReady(@ConnectedSocket() socket: Socket) {
    const nodeId = socket.data.roomId.split('::')[0];
    const roomExists = this.roomService.findRoom(nodeId);

    roomExists.roomStatus = 'ready';

    socket.emit('ready-message', {
      result: 'ok',
      status: 'success',
    });
  }

  @SubscribeMessage('makeAlarm')
  makeAlarm(@MessageBody() data, @ConnectedSocket() socket: Socket) {
    const { record_id, command, type, contents, result, category } = data;
    socket.emit('get-message', {
      result: 'ok',
      status: 'success',
    });

    if (result === 'success') {
      switch (command) {
        case 'makemovie': // 일단 아무것도 하지 않는다.
          console.log('make movie');
          break;
        case 'uploadfile':
          const options = {
            headers: {
              'Content-Type': 'application/json',
            },
          };

          const request = this.httpService
            .post(
              process.env.FDITION_UPLOAD_DONE_URL,
              JSON.stringify({
                tempId: record_id,
                category,
                recordType: type,
                contents,
              }),
              options,
            )
            .pipe(
              map((res) => {
                this.sendPush(res.data);
                /*this.roomService.getRoomList[this.roomService.arrFindIndex('roomId', socket.data.roomId)].uploadCnt -= 1;
                if (this.roomService.getRoomList[this.roomService.arrFindIndex('roomId', socket.data.roomId)].uploadDone) {
                  this.roomService.updateRoomStatus(socket.data.roomId, 'ready');
                  this.roomService.getRoomList[this.roomService.arrFindIndex('roomId', socket.data.roomId)].uploadCnt =
                    this.roomService.getUploadCnt(socket.data.roomId);
                  this.roomService.getRoomList[this.roomService.arrFindIndex('roomId', socket.data.roomId)].uploadDone = false;
                }*/
              }),
            );
          lastValueFrom(request).then((res) => console.log(res));
          break;
      }
    }
  }

  sendPush(payload: any) {
    const sendData = {
      userId: payload.userId,
      data: {
        video: payload.recordType,
      },
    };
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const request = this.httpService
      .post(process.env.FDIST_PUSH_NOTIFICATION_URL, JSON.stringify(sendData), options)
      .pipe(map((res) => res.data));
    lastValueFrom(request).then((res) => console.log(res));
  }
}
