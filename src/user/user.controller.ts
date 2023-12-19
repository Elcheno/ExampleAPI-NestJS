import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from 'src/DTO/CreateUserDTO';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById({ id: Number(id) });
  }

  @Post()
  async createUser(@Body() data: CreateUserDTO) {
    return this.userService.createUser(data);
  }
}
