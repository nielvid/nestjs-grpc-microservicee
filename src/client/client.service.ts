import {
  //   BadRequestException,
  Inject,
  Injectable,
  //   Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthUser, UserParams, UserServiceClient } from '../proto/user';
import { lastValueFrom } from 'rxjs';

// import { lastValueFrom } from 'rxjs';

@Injectable()
export class ClientService implements OnModuleInit {
  //   private logger = new Logger(UserService.name);

  private userServiceClient: UserServiceClient;

  constructor(
    @Inject('USER_PACKAGE')
    private grpcClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userServiceClient =
      this.grpcClient.getService<UserServiceClient>('UserService');
  }

  async createUser(data: UserParams) {
    const user: AuthUser = await lastValueFrom(
      this.userServiceClient.createUser(data),
    );

    console.log(user, 'user');

    return user;
  }
}
