import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from 'src/DTO/CreateUserDTO';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById({ id: Number(id) });
  }

  @Get('page/:page')
  async getAllUser(@Param('page') page: number) {
    return this.userService.getAllUser({
      skip: page * 10,
      take: 2,
    });
  }

  @Get('filterUser/:searchString')
  async filterUser(@Param('searchString') searchString: string) {
    return this.userService.getAllUser({
      where: {
        OR: [
          {
            name: { contains: searchString },
          },
          {
            email: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post()
  async createUser(@Body() data: CreateUserDTO) {
    return this.userService.createUser(data);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: CreateUserDTO) {
    return this.userService.updateUser({ id: Number(id) }, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
