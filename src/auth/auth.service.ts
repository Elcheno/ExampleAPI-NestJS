import { Injectable } from '@nestjs/common';
import { Prisma, User } from '../../prisma/generated/client';
import { UserService } from 'src/user/user.service';
import { CreateUserDTO } from 'src/DTO/CreateUserDTO';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('node:crypto');

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService
        ) {}

    async login(email: Prisma.UserWhereUniqueInput, password: string): Promise<any | null> {
        const user: User = await this.userService.getUserByEmail(email);
        
        const passwordCorrect: boolean = user === null
            ? false
            : await bcrypt.compare(password, user.password);


        if (!(user && passwordCorrect)) return null;

        const expPlus = Number(process.env.EXP);
        let expToken = null;

        if (expPlus) expToken = Math.round(Date.now() / 1000 + expPlus);

        const userForToken = {
            id: user.id,
            name: user.name,
            exp: expToken           
        }

        const token = jwt.sign(userForToken, process.env.SECRET);

        return {
            name: user.name,
            email: user.email,
            token: token
        };
    }

    async register(data: CreateUserDTO): Promise<any | null> {
        try {
            const id = crypto.randomUUID();

            let { password, ...userWithoudPassw } = data;
      
            const salt = await bcrypt.genSaltSync(10);
            password = bcrypt.hashSync(password, salt);
                   
            if (password) {
              const user = await this.userService.createUser({ id, password, ...userWithoudPassw });

              if (!user) return null;

              const response = await this.login( { email: data.email }, data.password);

              return response;
      
            } else {
              return null;
      
            }
      
          } catch {
            return null;
      
          }
    }
}
