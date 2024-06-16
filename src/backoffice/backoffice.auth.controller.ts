import { Controller, OnModuleInit, Inject, Body, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AUTH_SERVICE_NAME, AuthServiceClient, SignInRequest, SignInResponse } from '@proto/backoffice.pb';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('BackOffice - Auth')
@Controller({ path: 'bo/auth' })
export class AuthController implements OnModuleInit {
  private svc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  onModuleInit() {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('signin')
  @ApiOperation({ summary: '' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  public signIn(@Body() payload: SignInRequest): Observable<SignInResponse> {
    return this.svc.signIn(payload);
  }
}
