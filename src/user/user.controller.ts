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
      email: user.email
    }

    return response;
  }

  @Put()
  async updateUser(
    @Headers() headers: any,
    @Body() data: CreateUserDTO,
  ): Promise<UserResponseDTO> {
    const id = headers['authorization'].id;
    const user: UserModel = await this.userService.updateUser({ id: id }, data);
    
    if (!user) throw new HttpException('Resource Not Found', HttpStatus.NOT_FOUND);

    const response: UserResponseDTO = {
      name: user.name,
      email: user.email
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
      email: user.email
    }

    return response; 
  }

  // @Get('page/:page')
  // async getAllUser(@Param('page') page: number): Promise<UserModel[]> {
  //   return this.userService.getAllUser({
  //     skip: page * 10,
  //     take: 2,
  //   });
  // }

  // @Get('filterUser/:searchString')
  // async filterUser(
  //   @Param('searchString') searchString: string,
  // ): Promise<UserModel[]> {
  //   return this.userService.getAllUser({
  //     where: {
  //       OR: [
  //         {
  //           name: { contains: searchString },
  //         },
  //         {
  //           email: { contains: searchString },
  //         },
  //       ],
  //     },
  //   });
  // }

  // @Post()
  // async createUser(@Body() data: CreateUserDTO): Promise<UserModel> {;
  //   try {
  //     const id = crypto.randomUUID();

  //     const salt = await bcrypt.genSaltSync(10);
  //     const password = bcrypt.hashSync(data.password, salt);
      
  //     if (password) {
  //       data.password = password;
  //       return this.userService.createUser({ id, ...data });

  //     } else {
  //       throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);

  //     }

  //   } catch {
  //     throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);

  //   }

  // }

  // @Post('google')
  // async createUserGoogle(@Body() data: CreateUserDTOGoogle): Promise<UserModel> {
  //   try {
  //     const id = crypto.randomUUID();
  //     return this.userService.createUser({ id, ...data });

  //   } catch {
  //     throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);

  //   }

  // }

}
