import { Injectable } from '@nestjs/common';
import { Note, Prisma } from '../../prisma/generated/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  async getNoteById(id: Prisma.NoteWhereUniqueInput): Promise<Note | null> {
    return this.prisma.note.findUnique({ where: id });
  }

  async getAllNote(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.NoteWhereUniqueInput;
    where?: Prisma.NoteWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<Note[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.note.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createNote(data: Prisma.NoteCreateInput): Promise<Note> {
    return this.prisma.note.create({ data });
  }

  async deleteUser(id: Prisma.NoteWhereUniqueInput): Promise<Note> {
    return this.prisma.note.delete({ where: id });
  }

  async updateNote(
    id: Prisma.NoteWhereUniqueInput,
    data: Prisma.NoteUpdateInput,
  ): Promise<Note> {
    return this.prisma.note.update({ where: id, data });
  }
}
