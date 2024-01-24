import { Body, Controller, Inject, OnModuleInit, Post, UseGuards, Get, Param, Query } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  MemberServiceClient,
  SignInResponse,
  SignUpResponse,
  SignInRequest,
  SignUpRequest,
  ValidateRequest,
  ValidateResponse,
  GetUserRequest,
  GetUserResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  MEMBER_SERVICE_NAME,
} from '@proto/member.pb';
import {
  ApiTags,
  ApiParam,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiQuery,
} from '@nestjs/swagger';
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
  @ApiOperation({ summary: '회원가입', description: '회원가입' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: '사용자 계정 (이메일주소)',
        },
        name: {
          type: 'string',
          description: '이름',
        },
        password: {
          type: 'string',
          description: '비밀번호',
        },
        role: {
          type: 'array',
          items: {
            enum: [
              AccountRoles.ADMIN,
              AccountRoles.SUPERVISOR,
              AccountRoles.USER,
              AccountRoles.OPERATOR,
              AccountRoles.MODERATOR,
              AccountRoles.MANAGER,
              AccountRoles.MEMBER,
            ],
          },
          description: '사용자 권한',
        },
      },
    },
  })
  public signUp(@Body() body: SignUpRequest): Observable<SignUpResponse> {
    return this.svc.signUp(body);
  }

  @Post('signin')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({ summary: '로그인' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: '사용자 계정 (이메일주소)',
        },
        password: {
          type: 'string',
          description: '비밀번호',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: '로그인 성공',
    schema: {
      example: {
        result: 'ok',
        status: 200,
        message: 'OK',
        data: [
          {
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm5hbWUiOiLtlZzsmIHrr7wiLCJlbWFpbCI6Im9ueXhzYXJkQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNTkwNTM1MywiZXhwIjoxNzM3NDQxMzUzfQ.1DHBsyj7EBH4O4WCbJBlaCf2K-cpoOkmlcsR8IUMHcI',
          },
        ],
      },
    },
  })
  public signIn(@Body() body: SignInRequest): Observable<SignInResponse> {
    return this.svc.signIn(body);
  }

  @Post('validate')
  @UseGuards(MemberGuard)
  @ApiOperation({ summary: '사용자 확인' })
  @ApiBearerAuth()
  public validate(@Body() body: ValidateRequest): Observable<ValidateResponse> {
    return this.svc.validate(body);
  }

  //@UseGuards(MemberGuard)
  @ApiOperation({ summary: '내 정보 조회' })
  @ApiBearerAuth()
  @Get('/user/:id')
  @ApiParam({
    name: 'id',
    description: '사용자 ID',
    required: true,
    type: 'number',
  })
  public getUser(@Param() params: GetUserRequest): Observable<GetUserResponse> {
    return this.svc.getUser(params);
  }

  @Get('/email')
  @ApiOperation({ summary: '이메일 인증' })
  @ApiQuery({
    name: 'token',
    description: '이메일 인증 토큰',
    required: true,
    type: 'string',
  })
  public verifyEmail(@Query('token') token: string): Observable<VerifyEmailResponse> {
    return this.svc.verifyEmail({ token });
  }
}
