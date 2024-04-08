import { IsArray } from 'class-validator';
export class ListRoomDto {
  roomId: string;
  hostId: string;
  roomStatus: string;
  recordTypes: string[];
  @IsArray()
  userList: string[];
}
