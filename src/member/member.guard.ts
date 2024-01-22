import { Injectable, CanActivate, ExecutionContext, HttpStatus, UnauthorizedException, Inject } from '@nestjs/common';
import { Request } from 'express';
import { ValidateResponse } from '@proto/member.pb';
import { MemberService } from './member.service';

@Injectable()
export class MemberGuard implements CanActivate {
  @Inject(MemberService)
  public readonly service: MemberService;

  public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
    const req: Request = ctx.switchToHttp().getRequest();
    const authorization: string = req.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const bearer: string[] = authorization.split(' ');

    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException();
    }

    const token: string = bearer[1];

    const { result, status, message, data }: ValidateResponse = await this.service.validate(token);
    console.log(data);
    //req['user'] = data.email;

    //console.log(req);

    if (status !== HttpStatus.OK) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
