import { Body, Controller, Inject, OnModuleInit, Post, Get, Patch, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  BO_Venue_ServiceClient,
  B_O__VENUE__SERVICE_NAME,
  CreateVenueRequest,
  CreateVenueResponse,
  GetVenueRequest,
  GetVenueResponse,
  ListVenueRequest,
  ListVenueResponse,
  UpdateVenueRequest,
  UpdateVenueResponse,
} from '@proto/backoffice.pb';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('BackOffice - Venue')
@Controller({ path: 'bo' })
export class VenueController implements OnModuleInit {
  private svc: BO_Venue_ServiceClient;

  @Inject(B_O__VENUE__SERVICE_NAME)
  private readonly client: ClientGrpc;

  onModuleInit() {
    this.svc = this.client.getService<BO_Venue_ServiceClient>(B_O__VENUE__SERVICE_NAME);
  }

  @Post('venue')
  public createVenue(@Body() req: CreateVenueRequest): Observable<CreateVenueResponse> {
    return this.svc.createVenue(req);
  }

  @Get('venue/:id')
  public getVenue(@Param() params: GetVenueRequest): Observable<GetVenueResponse> {
    return this.svc.getVenue(params);
  }

  @Post('venues')
  public listVenue(@Body() req: ListVenueRequest): Observable<ListVenueResponse> {
    return this.svc.listVenue(req);
  }

  @Patch('venue')
  public updateVenue(@Body() req: UpdateVenueRequest): Observable<UpdateVenueResponse> {
    return this.svc.updateVenue(req);
  }
}
