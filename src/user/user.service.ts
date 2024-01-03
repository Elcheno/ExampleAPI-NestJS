import { Injectable } from '@nestjs/common';
import { Prisma, User } from '../../prisma/generated/client';
import { PrismaService } from 'src/prisma.service';

const crypto = require('node:crypto');

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({ where: id });
  }

  async getAllUser(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async getUserByEmail(email: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({ where: email });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async deleteUser(id: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where: id });
  }

  async updateUser(
    id: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: id });
    if (!user) throw new Error('User not found');
    return this.prisma.user.update({ where: id, data });
  }

}
