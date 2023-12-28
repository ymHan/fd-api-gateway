import { Body, Controller, Inject, OnModuleInit, Post, Get, Patch, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  BO_Sector_ServiceClient,
  B_O__SECTOR__SERVICE_NAME,
  CreateSectorRequest,
  CreateSectorResponse,
  GetSectorRequest,
  GetSectorResponse,
  ListSectorRequest,
  ListSectorResponse,
  UpdateSectorRequest,
  UpdateSectorResponse,
} from '@proto/backoffice.pb';

@Controller()
export class SectorController implements OnModuleInit {
  private svc: BO_Sector_ServiceClient;

  @Inject(B_O__SECTOR__SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit() {
    this.svc = this.client.getService<BO_Sector_ServiceClient>(B_O__SECTOR__SERVICE_NAME);
  }

  @Post('sector')
  public createSector(@Body() req: CreateSectorRequest): Observable<CreateSectorResponse> {
    return this.svc.createSector(req);
  }

  @Get('sector/:id')
  public getSector(@Param() params: GetSectorRequest): Observable<GetSectorResponse> {
    return this.svc.getSector(params);
  }

  @Post('sectors')
  public listSector(@Body() req: ListSectorRequest): Observable<ListSectorResponse> {
    return this.svc.listSector(req);
  }

  @Patch('sector')
  public updateSector(@Body() req: UpdateSectorRequest): Observable<UpdateSectorResponse> {
    return this.svc.updateSector(req);
  }
}
