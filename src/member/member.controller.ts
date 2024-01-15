import { Body, Controller, Inject, OnModuleInit, Post, UseGuards, Get, Patch } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  MemberServiceClient,
  SignInResponse,
  SignUpResponse,
  SignInRequest,
  SignUpRequest,
  MEMBER_SERVICE_NAME,
  ValidateRequest,
  ValidateResponse,
} from '@proto/member.pb';
import { ApiTags, ApiParam, ApiOperation } from '@nestjs/swagger';
import { AccountRoles } from '@root/models/enum';
import { MemberGuard } from './member.guard';

@ApiTags('Account')
@Controller('account')
export class MemberController implements OnModuleInit {
  private svc: MemberServiceClient;

  @Inject(MEMBER_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<MemberServiceClient>(MEMBER_SERVICE_NAME);
  }

  @Post('signup')
  @ApiParam({ name: 'role', enum: AccountRoles })
  @ApiParam({ name: 'password', type: String })
  @ApiParam({ name: 'email', type: String })
  @ApiParam({ name: 'name', type: String })
  @ApiOperation({ summary: '회원가입' })
  public signUp(@Body() body: SignUpRequest): Observable<SignUpResponse> {
    return this.svc.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('signin')
  public signIn(@Body() body: SignInRequest): Observable<SignInResponse> {
    return this.svc.signIn(body);
  }

  @UseGuards(MemberGuard)
  @Post('validate')
  public validate(@Body() body: ValidateRequest): Observable<ValidateResponse> {
    return this.svc.validate(body);
  }

  @ApiOperation({ summary: '내 정보 조회' })
  @Get(':id')
  public getUser(): string {
    return 'ok';
  }

  @ApiOperation({ summary: '사용자 활성화 / 비활성화 toggle' })
  @Get('activation/:id')
  public activeUser(): string {
    return 'ok';
  }

  @ApiOperation({ summary: '사용자 상태 변경' })
  @Patch('state/:id')
  public changeUserState(): string {
    return 'ok';
  }
}
