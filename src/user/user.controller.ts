import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Headers,
  HttpStatus,
  HttpException
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from 'src/DTO/CreateUserDTO';
import { User as UserModel } from '../../prisma/generated/client';
import { UserResponseDTO } from 'src/DTO/UserResponseDTO';

const bcrypt = require('bcrypt');

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUserById(@Headers() headers: any): Promise<UserResponseDTO> {
    const id = headers['authorization'].id;
    const user: UserModel = await this.userService.getUserById({ id: id });

    if (!user) throw new HttpException('Resource Not Found', HttpStatus.NOT_FOUND);

    const response: UserResponseDTO = {
      name: user.name,
      email: user.email,
      picture: user.picture
    }

    return response;
  }

  @Put()
  async updateUser(@Headers() headers: any, @Body() data: CreateUserDTO): Promise<UserResponseDTO> {
    const id = headers['authorization'].id;

    if (data?.password) {
      const salt = await bcrypt.genSaltSync(10);
      const password = bcrypt.hashSync(data.password, salt);
      data.password = password
    }

    const user: UserModel = await this.userService.updateUser({ id: id }, data);

    if (!user) throw new HttpException('Resource Not Found', HttpStatus.NOT_FOUND);

    const response: UserResponseDTO = {
      name: user.name,
      email: user.email,
      picture: user.picture
    }

    return response;
  }

  @Delete()
  async deleteUser(@Headers() headers: any): Promise<UserResponseDTO> {
    const id = headers['authorization'].id;

    const user: UserModel = await this.userService.deleteUser({ id: id });

    if (!user) throw new HttpException('Resource Not Found', HttpStatus.NOT_FOUND);

    const response: UserResponseDTO = {
      name: user.name,
      email: user.email,
      picture: user.picture,
    }

    return response; 
  }

}
