import { Injectable } from '@nestjs/common';
import { ListRoomDto } from './list-room.dto';
import { Socket } from 'socket.io';

@Injectable()
export class RoomService {
  private roomList: Array<ListRoomDto>;
  constructor() {
    this.roomList = [
      {
        roomId: 'lobby',
        hostId: null,
        userList: [],
      }
    ];
  }

  makeRoom(client: Socket, roomId: string): void {
    this.roomList.push({
      roomId,
      hostId: client.id,
      userList: []
    });
    client.data.roomId = roomId;
    client.rooms.clear();
    client.join(roomId);
  }

  joinRoom(client: Socket, data: any) {
    client.data.roomId = data.roomId;
    client.rooms.clear();
    client.join(client.data.roomId);
    //this.roomList[this.findIndex(client.data.roomId)].userList.push(client.id)
  }

  exitRoom(client: Socket, roomId: string) {
    client.data.roomId = 'lobby';
    client.rooms.clear();
    client.join('lobby');
  }


  findRoom(venueId: string): any {
    const condition = new RegExp(venueId);
    const result = this.roomList.filter((el) => {
      return condition.test(el.roomId)
    });
    return result[0];
  }

  findIndex(roomId: string): number {
    return this.roomList.findIndex(obj => {
      obj.roomId === roomId;
    });
   }

   deleteRoom(roomId: string) {
    this.roomList.splice(this.findIndex(roomId), 1);
  }

  findHostId(roomId: string) {
    return this.roomList[this.findIndex(roomId)].hostId;
  }
}
