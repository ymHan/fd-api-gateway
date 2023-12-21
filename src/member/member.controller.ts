import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MemberServiceClient, SignInResponse, SignUpResponse, SignInRequest, SignUpRequest, MEMBER_SERVICE_NAME } from '../proto/member.pb';

@Controller('member')
export class MemberController implements OnModuleInit {
  private svc: MemberServiceClient;

  @Inject(MEMBER_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<MemberServiceClient>(MEMBER_SERVICE_NAME);
  }

  @Post('signup')
  public signUp(@Body() body: SignUpRequest): Observable<SignUpResponse> {
    return this.svc.signUp(body);
  }

  @Post('signin')
  public signIn(@Body() body: SignInRequest): Observable<SignInResponse> {
    return this.svc.signIn(body);
  }
}
