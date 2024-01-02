import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LoginDTO } from 'src/DTO/LoginDTO';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/DTO/CreateUserDTO';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        ) {}

    @Post('login')
    async login(@Body() data: LoginDTO): Promise<any> {
        const response = await this.authService.login( { email: data.email }, data.password);

        if(response === null) throw new HttpException('Unauthorized Access', HttpStatus.UNAUTHORIZED);

        return response;
    }

    @Post('register')
    async register(@Body() data: CreateUserDTO): Promise<any> {
        const response = await this.authService.register(data);

        if (response === null) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

        return response;
    }

    @Post()
    async checkToken(@Body() data: any): Promise<any> {
        if (!data.token) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        let token = data.token;

        const { decodedToken, picture } = await this.authService.checkToken(token);

        if (decodedToken === null) throw new HttpException('Invalid Token Access', HttpStatus.UNAUTHORIZED);
        console.log(decodedToken);
        return {
            name: decodedToken.name,
            email: decodedToken.email,
            picture: picture,
            token: data.token
        }
    }

}
