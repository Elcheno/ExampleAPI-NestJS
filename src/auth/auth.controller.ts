import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LoginDTO } from 'src/DTO/LoginDTO';
import { AuthService } from './auth.service';
import { User as UserModel } from '../../prisma/generated/client';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() data: LoginDTO): Promise<any> {
        const response = await this.authService.login( { email: data.email }, data.password);

        if(response === null) {
            throw new HttpException('Unauthorized Access', HttpStatus.UNAUTHORIZED);
        
        }

        return response;
    }

}
