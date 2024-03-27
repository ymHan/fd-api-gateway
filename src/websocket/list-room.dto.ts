import { IsArray } from 'class-validator';
export class ListRoomDto {
  roomId: string;
  hostId: string;
  @IsArray()
  userList: string[];
}
