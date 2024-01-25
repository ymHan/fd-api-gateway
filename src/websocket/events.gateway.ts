import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'ws';

@WebSocketGateway(3001)
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('record')
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
    const event = 'record';
    const response = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return from(response).pipe(map((data) => ({ event, data })));
  }
}
