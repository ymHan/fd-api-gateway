import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { MemberServiceClient, MEMBER_SERVICE_NAME } from '@proto/member.pb';

@Injectable()
export class MemberService {
  private svc: MemberServiceClient;

  @Inject(MEMBER_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<MemberServiceClient>(MEMBER_SERVICE_NAME);
  }
}
