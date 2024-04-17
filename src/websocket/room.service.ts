import { Injectable } from '@nestjs/common';
import { ListRoomDto } from './list-room.dto';
import { Socket } from 'socket.io';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';

dotenv.config();
const FDITION_UPLOAD_DONE_URL = process.env.FDITION_UPLOAD_DONE_URL;

@Injectable()
export class RoomService {
  private roomList: any;
  constructor(
    private readonly httpService: HttpService,
  ) {
    this.roomList = [
      {
        roomId: 'lobby',
        hostId: null,
        roomStatus: null,
        recordTypes: [],
        userList: [],
        uploadCnt: 0,
        uploadDone: false,
      },
    ];
  }

  makeRoom(client: Socket, roomId: string): void {
    client.data.roomId = roomId;
    client.data.category = this.getSportsCategory(roomId);
    client.data.recordTypes = this.getRecordType(roomId);

    this.roomList.push({
      roomId,
      hostId: client.id,
      roomStatus: 'ready',
      recordTypes: this.getRecordType(roomId),
      uploadCnt: this.getUploadCnt(roomId),
      userList: [],
    });

    client.rooms.clear();
    client.join(roomId);
  }

  joinRoom(client: Socket, data: any) {
    client.data.roomId = data.roomId;
    client.rooms.clear();
    client.join(client.data.roomId);
    //this.roomList[this.findIndex(client.data.roomId)].userList.push(client.id)
  }

  exitRoom(roomId: string, clients) {
    const users = this.roomList[this.arrFindIndex('roomId', roomId)].userList;
    users.forEach((user) => {
      clients.sockets.get(user).leave(roomId);
      clients.sockets.get(user).data.roomId = 'lobby';
      clients.sockets.get(user).rooms.clear();
      clients.sockets.get(user).join('lobby');
    });
  }

  findRoom(nodeId: string): any {
    const condition = new RegExp(nodeId);
    const result = this.roomList.filter((el) => {
      return condition.test(el.roomId);
    });

    if (result) {
      return result[0];
    } else {
      return false;
    }
  }

  arrFindIndex(propertyName: string, value: string): number {
    for (let i = 0; i < this.roomList.length; i++) {
      if (this.roomList[i][propertyName] === value) {
        return i;
      }
    }

    return -1;
  }

  deleteRoom(roomId: string) {
    this.roomList.splice(this.arrFindIndex('roomId', roomId), 1);
  }

  findHostId(roomId: string) {
    return this.roomList[this.arrFindIndex('roomId', roomId)].hostId;
  }

  getRoomStatus(roomId: string): string {
    const index = this.arrFindIndex('roomId', roomId);
    return this.roomList[index].roomStatus;
  }

  getRoomList(): Array<ListRoomDto> {
    return this.roomList;
  }

  addUserList(roomId: string, userEmail: string) {
    this.roomList[this.arrFindIndex('roomId', roomId)].userList.push(userEmail);
  }

  updateRoomStatus(roomId: string, status: string) {
    this.roomList[this.arrFindIndex('roomId', roomId)].roomStatus = status;
  }

  getRecordType(roomId: string): string[] {
    const id = parseInt(roomId.split('::')[0].substring(5, 6), 10);
    const tmpAr = ['ASSIST', 'SHORTS', 'SHORTS+'];
    switch (id) {
      case 1: // only assist
        tmpAr.splice(1, 2);
        break;
      case 2: // only shorts
        tmpAr.splice(0, 1).splice(2, 1);
        break;
      case 3: // only shorts+
        tmpAr.splice(0, 2);
        break;
      case 4: // assist && shorts
        tmpAr.splice(2, 1);
        break;
      case 5: // assist && shorts+
        tmpAr.splice(1, 1);
        break;
      case 6: // shorts && shorts+
        tmpAr.splice(0, 1);
        break;
      case 7: // all
        break;
    }
    return tmpAr;
  }

  getUploadCnt(roomId: string): number {
    const id = parseInt(roomId.split('::')[0].substring(5, 6), 10);
    let result = 0;

    switch (id) {
      case 1:
        result = 1;
        break;
      case 2:
        result = 1;
        break;
      case 3:
        result = 1;
        break;
      case 4:
        result = 2;
        break;
      case 5:
        result = 2;
        break;
      case 6:
        result = 2;
        break;
      case 7:
        result = 3;
        break;
    }
    return result;
  }

  getSportsCategory(nodeId: string): string {
    return nodeId.split('::')[0].substring(0, 5);
  }

  uploadDone(payload) {
    const { tempId, category, type, contents } = payload;

    this.httpService.post(FDITION_UPLOAD_DONE_URL, {
      tempId,
      type,
      contents,
    });
  }

  makeCategory(nodeId: string): string {
    const str = nodeId.substring(0, 1).toLowerCase();
    let result = '';
    switch (str) {
      case 's':
        result = 'SPORTS';
        break;
      case 'e':
        result = 'ENTERTAINMENTS';
        break;
      case 'p':
        result = 'PROMOTION';
        break;
    }
    return result;
  }

  makeStatusReady(roomId: string) {
    console.log('makeStatusReady', this.roomList[this.arrFindIndex('roomId', roomId)])
  }
}
