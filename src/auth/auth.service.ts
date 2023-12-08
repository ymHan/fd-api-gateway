import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthServiceClient, AUTH_SERVICE_NAME, ValidateResponse } from './auth.pb';

@Injectable()
export class AuthService {
  private svc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    // 1
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  public validate(token: string): Promise<ValidateResponse> {
    // 2
    return firstValueFrom(this.svc.validate({ token }));
  }
}
