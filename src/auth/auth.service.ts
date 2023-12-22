import { Injectable } from '@nestjs/common';
import { Prisma, User } from '../../prisma/generated/client';
import { PrismaService } from 'src/prisma.service';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService) {}

    async login(email: Prisma.UserWhereUniqueInput, password: string): Promise<any | null> {
        const user: User = await this.prisma.user.findUnique({ where: email });
        
        const passwordCorrect: boolean = user === null
            ? false
            : await bcrypt.compare(password, user.password);

        if (!(user && passwordCorrect)) return null;

        const userForToken = {
            id: user.id,
            name: user.name,           
        }

        const token = jwt.sign(userForToken, process.env.SECRET);

        return {
            name: user.name,
            email: user.email,
            token: token
        };
    }
}
