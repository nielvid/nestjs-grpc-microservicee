// import { UserParams } from 'src/proto/user';;
import { ClientService } from './client.service';
import { Controller, Post, Body } from '@nestjs/common';

import { UserParams } from 'src/proto/user';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  createUser(@Body() data: UserParams) {
    const user = this.clientService.createUser(data);
    return user;
  }
}
