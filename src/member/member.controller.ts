import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Post,
  Get,
  Param,
  Query,
  Delete,
  Patch,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  MEMBER_SERVICE_NAME,
  MemberServiceClient,
  SignInResponse,
  SignUpResponse,
  SignInRequest,
  SignUpRequest,
  ValidateResponse,
  GetUserRequest,
  GetUserResponse,
  VerifyEmailResponse,
  LeaveMemberRequest,
  LeaveMemberResponse,
  CheckEmailDuplicationResponse,
  CheckNicknameDuplicationResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
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
        nickname: {
          type: 'string',
          description: '닉네임',
        },
        password: {
          type: 'string',
          description: '비밀번호',
        },
        pushreceive: {
          type: 'boolean',
          description: '푸시알림 수신여부',
          default: true,
        },
        usertype: {
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
          description: '가입자 종류 및 권한',
        },
      },
    },
  })
  public signUp(@Req() req: Request, @Body() signUpRequest: SignUpRequest): Observable<SignUpResponse> {
    return this.svc.signUp(signUpRequest);
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
  @ApiOperation({ summary: '사용자 확인' })
  @ApiBearerAuth()
  public validate(@Req() request: Request): Observable<ValidateResponse> {
    const { authorization }: any = request.headers;

    if (!authorization || authorization.trim() === '') {
      throw new UnauthorizedException('Please provide token');
    }

    const token: string = authorization.replace(/bearer/gim, '').trim();

    return this.svc.validate({ token });
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

  @Delete('/user/:id')
  @ApiOperation({ summary: 'fdist 탈퇴' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: '사용자 ID',
    required: true,
    type: 'number',
  })
  public leaveMember(@Param() params: LeaveMemberRequest): Observable<LeaveMemberResponse> {
    return this.svc.leaveMember(params);
  }

  /*
  email 중복 체크
  * */
  @Get('/user/email/check')
  public CheckEmailDuplication(@Query('email') email: string): Observable<CheckEmailDuplicationResponse> {
    return this.svc.checkEmailDuplication({ email });
  }

  @Get('/user/nickname/check')
  @ApiOperation({ summary: '닉네임 중복 체크' })
  @ApiQuery({
    name: 'nickname',
    description: '닉네임',
    required: true,
    type: 'string',
  })
  public checkNicknameDuplication(@Query('nickname') nickname: string): Observable<CheckNicknameDuplicationResponse> {
    return this.svc.checkNicknameDuplication({ nickname });
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

  @Patch('/user/password/update')
  @ApiOperation({ summary: '비밀번호 변경' })
  @ApiBearerAuth()
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
  public updatePassword(@Body() body: UpdatePasswordRequest): Observable<UpdatePasswordResponse> {
    return this.svc.updatePassword(body);
  }

  @Post('/user/password/reset')
  @ApiOperation({ summary: '비밀번호 초기화' })
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: '사용자 계정 (이메일주소)',
        },
      },
    },
  })
  public resetPassword(@Body() body: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    return this.svc.resetPassword(body);
  }
}
