import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class TokenBearer implements NestMiddleware {

    constructor(
      private authService: AuthService
      ) {}

    async use(req: Request, _res: Response, next: NextFunction) {

      console.log('middleware init');

      const authorization = req.headers['authorization'];
      if (!authorization || !authorization.toLowerCase().startsWith('bearer')) throw new HttpException('Unauthorized Access', HttpStatus.UNAUTHORIZED);
      const token = authorization.substring(7);

      let decodedToken = await this.authService.checkToken(token);

      if (decodedToken === null) throw new HttpException('Invalid Token Access', HttpStatus.UNAUTHORIZED);

      req.headers['authorization'] = decodedToken;

      console.log("middleware complete")
      
      next();
    }

}
  