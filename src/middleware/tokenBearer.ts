import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

@Injectable()
export class TokenBearer implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction) {
      const authorization = req.headers['authorization'];
      if (!authorization || !authorization.toLowerCase().startsWith('bearer')) throw new HttpException('Unauthorized Access', HttpStatus.UNAUTHORIZED);
      const token = authorization.split(' ')[1];

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      if(!token || !decodedToken.id) throw new HttpException('Unauthorized Access', HttpStatus.UNAUTHORIZED);

      next();
    }

}
  