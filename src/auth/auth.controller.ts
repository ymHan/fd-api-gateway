import { Body, Controller, Inject, OnModuleInit, Post, Put } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthServiceClient, SignInResponse, SignUpResponse, SignInRequest, SignUpRequest, AUTH_SERVICE_NAME } from './auth.pb';

@Controller('auth')
export class AuthController implements OnModuleInit {
  private svc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('signup')
  public signUp(@Body() body: SignUpRequest): Observable<SignUpResponse> {
    return this.svc.signUp(body);
  }

  @Put('signin')
  public signIn(@Body() body: SignInRequest): Observable<SignInResponse> {
    return this.svc.signIn(body);
  }
}
