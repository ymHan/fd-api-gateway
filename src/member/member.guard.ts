import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject, ForbiddenException, } from '@nestjs/common';
import { MemberService } from './member.service';

@Injectable()
export class MemberGuard implements CanActivate {
  @Inject(MemberService)
  public readonly service: MemberService;

  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    try {
      const request = ctx.switchToHttp().getRequest();
      const { authorization }: any = request.headers;

      if (!authorization || authorization.trim() === '') {
        throw new UnauthorizedException('Please provide token');
      }

      const token: string = authorization.replace(/bearer/gim, '').trim();
      const response = await this.service.validate(token);
      request.decodeData = response.data[0];
      return true;
    } catch (error) {
      console.log('auth error - ', error.message);
      throw new ForbiddenException(error.message || 'session expired! Please sign In.');
    }
  }
}
