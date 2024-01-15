import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MemberServiceClient, MEMBER_SERVICE_NAME, ValidateResponse } from '@proto/member.pb';

@Injectable()
export class MemberService {
  private svc: MemberServiceClient;

  @Inject(MEMBER_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    // 1
    this.svc = this.client.getService<MemberServiceClient>(MEMBER_SERVICE_NAME);
  }

  public validate(token: string): Promise<ValidateResponse> {
    // 2
    return firstValueFrom(this.svc.validate({ token }));
  }
}
