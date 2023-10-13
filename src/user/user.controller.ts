// import { Metadata, ServerDuplexStream } from '@grpc/grpc-js';
import { Controller, Logger } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import {
  AuthUser,
  ChatMessage,
  NoParams,
  Params,
  User,
  UserId,
  UserParams,
  UserServiceController,
  UserServiceControllerMethods,
  Users,
  VerificationResponse,
} from 'src/proto/user';

const user = {
  id: '1',
  firstname: 'XXXX',
  lastname: 'XXXX',
  email: 'XXXX',
  phoneNumber: 'XXXX',
  accessToken: 'XXXX',
};
@Controller()
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  private readonly logger = new Logger(UserController.name);
  createUser(
    request: UserParams,
  ): AuthUser | Promise<AuthUser> | Observable<AuthUser> {
    this.logger.log(request, 'received from client');
    //implement logic, e.g save to db and return response
    return Promise.resolve(user);
  }

  findUsers(
    request: NoParams,
    // metadata: Metadata,
    // ...rest: any
  ): Users | Promise<Users> | Observable<Users> {
    console.log(request);
    // console.log({ metadata, rest }, 'additional data');
    const response: Users = {
      users: [user],
    };

    return response;
  }

  fetchUsers(
    request: NoParams,
    // metadata: Metadata,
    // ...rest: any
  ): Observable<User> {
    console.log(request);
    // console.log({ metadata, rest }, 'additional data');
    // const response: Users = {
    //   users: [user],
    // };
    const subject = new Subject<User>();
    subject.next({
      ...user,
    });

    subject;
    return subject.asObservable();
  }

  findUser(
    request: UserId,
    // metadata: Metadata,
    // ...rest: any
  ): User | Promise<User> | Observable<User> {
    console.log(request);
    // console.log({ metadata, rest }, 'additional data');

    return user;
  }

  deleteUser(
    request: UserId,
    // metadata: Metadata,
    // ...rest: any
  ): User | Promise<User> | Observable<User> {
    console.log(request);
    // console.log({ metadata, rest }, 'additional data');

    return user;
  }
  chat(
    request: Observable<ChatMessage>,
    // metadata: Metadata,
    // call: ServerDuplexStream<any, any>,
  ): Observable<ChatMessage> {
    const subject = new Subject<ChatMessage>();
    console.log(request);
    // console.log({ metadata, call }, 'additional data');

    const onNext = (data) => {
      console.log(data);
      subject.next({
        message: 'Hello from server',
      });
    };
    const onComplete = () => subject.complete();
    request.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }
  verifyUsers(
    request: Observable<Params>,
    // metadata: Metadata,
    // ...rest: any
  ):
    | VerificationResponse
    | Promise<VerificationResponse>
    | Observable<VerificationResponse> {
    console.log(request);
    // console.log({ metadata, rest }, 'additional data');

    const subject = new Subject<VerificationResponse>();
    const onNext = (data) => {
      console.log(data);
      subject.next({
        message: 'Hello from server',
      });
    };
    const onComplete = () => subject.complete();

    request.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }
}
