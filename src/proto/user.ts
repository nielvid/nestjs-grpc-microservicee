/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user_service";

/** import "anotherprotofile.proto"; //can import another proto file */

export interface UserParams {
  firstname: string;
  lastname: string;
  phoneNumber?: string | undefined;
  email: string;
  password: string;
}

export interface NoParams {
}

export interface Params {
  id: string;
}

export interface VerificationResponse {
  message: string;
}

export interface ChatMessage {
  message: string;
}

export interface AuthUser {
  id: string;
  firstname: string;
  lastname: string;
  phoneNumber?: string | undefined;
  email: string;
  accessToken: string;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  phoneNumber?: string | undefined;
  email: string;
}

export interface Users {
  users: User[];
}

export interface UserId {
  id: string;
}

export const USER_SERVICE_PACKAGE_NAME = "user_service";

export interface UserServiceClient {
  createUser(request: UserParams): Observable<AuthUser>;

  findUsers(request: NoParams): Observable<Users>;

  fetchUsers(request: NoParams): Observable<User>;

  verifyUsers(request: Observable<Params>): Observable<VerificationResponse>;

  findUser(request: UserId): Observable<User>;

  deleteUser(request: UserId): Observable<User>;

  chat(request: Observable<ChatMessage>): Observable<ChatMessage>;
}

export interface UserServiceController {
  createUser(request: UserParams): Promise<AuthUser> | Observable<AuthUser> | AuthUser;

  findUsers(request: NoParams): Promise<Users> | Observable<Users> | Users;

  fetchUsers(request: NoParams): Observable<User>;

  verifyUsers(
    request: Observable<Params>,
  ): Promise<VerificationResponse> | Observable<VerificationResponse> | VerificationResponse;

  findUser(request: UserId): Promise<User> | Observable<User> | User;

  deleteUser(request: UserId): Promise<User> | Observable<User> | User;

  chat(request: Observable<ChatMessage>): Observable<ChatMessage>;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "findUsers", "fetchUsers", "findUser", "deleteUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["verifyUsers", "chat"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
