import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from 'src/DTO/CreateUserDTO';
import { CreateUserDTOGoogle } from 'src/DTO/CreateUserDTOGoogle';
import { User as UserModel } from '../../prisma/generated/client';

// import crypto from 'node:crypto';
const crypto = require('node:crypto');
const bcrypt = require('bcrypt');

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserModel | null> {
    return this.userService.getUserById({ id: id });
  }

  @Get('page/:page')
  async getAllUser(@Param('page') page: number): Promise<UserModel[]> {
    return this.userService.getAllUser({
      skip: page * 10,
      take: 2,
    });
  }

  @Get('filterUser/:searchString')
  async filterUser(
    @Param('searchString') searchString: string,
  ): Promise<UserModel[]> {
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
  async createUser(@Body() data: CreateUserDTO): Promise<UserModel> {;
    try {
      const id = crypto.randomUUID();

      const salt = await bcrypt.genSaltSync(10);
      const password = bcrypt.hashSync(data.password, salt);
      
      if (password) {
        data.password = password;
        return this.userService.createUser({ id, ...data });

      } else {
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);

      }

    } catch {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);

    }

  }

  @Post('google')
  async createUserGoogle(@Body() data: CreateUserDTOGoogle): Promise<UserModel> {
    try {
      const id = crypto.randomUUID();
      return this.userService.createUser({ id, ...data });

    } catch {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);

    }

  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: CreateUserDTO,
  ): Promise<UserModel> {
    return this.userService.updateUser({ id: id }, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: id });
  }
}
