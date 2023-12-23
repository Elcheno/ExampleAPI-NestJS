import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';

// import { User as UserModel } from '../../prisma/generated/client';

const jwt = require('jsonwebtoken');

@Injectable()
export class TokenBearer implements NestMiddleware {

    constructor(private prisma: PrismaService) {}

    async use(req: Request, res: Response, next: NextFunction) {
      const authorization = req.headers['authorization'];
      if (!authorization || !authorization.toLowerCase().startsWith('bearer')) throw new HttpException('Unauthorized Access', HttpStatus.UNAUTHORIZED);
      const token = authorization.substring(7);

      let decodedToken = null;

      try {
        decodedToken = jwt.verify(token, process.env.SECRET);

      } catch(e) {
        console.error(e);
        throw new HttpException('Unauthorized Access', HttpStatus.UNAUTHORIZED);
      }

      if(!token || !decodedToken.id) throw new HttpException('Unauthorized Access', HttpStatus.UNAUTHORIZED);

      next();
    }

}
  