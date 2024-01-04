import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Note as NoteModel } from '../../prisma/generated/client';
import { NoteService } from './note.service';
import { CreateNoteDTO } from 'src/DTO/CreateNoteDTO';

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) { }

  @Get(':id')
  async getNoteById(@Param('id') id: string): Promise<NoteModel | null> {
    return this.noteService.getNoteById({ id: Number(id) });
  }

  @Get('page/:page')
  async getAllNotes(
    @Param('page') page: number,
    @Headers() headers: any
  ): Promise<NoteModel[]> {
    const userId = headers['authorization'].id;
    console.log(page)
    if (page < 0) {
      console.log("page -1")

      return this.noteService.getAllNote({
        skip: 0,
        take: 20,
        where: { userId: userId },
      });
    }
    return this.noteService.getAllNote({
      skip: page * 10,
      take: 10,
      where: { userId: userId },
      orderBy: { date: 'desc' },
    });
  }

  @Get('filterNote/:searchString')
  async filterUser(@Param('searchString') searchString: string) {
    return this.noteService.getAllNote({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            description: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post()
  async createNote(@Headers() headers: any, @Body() data: CreateNoteDTO): Promise<NoteModel> {
    const { title, description, date } = data;

    const userId = headers['authorization'].id;

    return this.noteService.createNote({
      title,
      description,
      date,
      user: {
        connect: {
          id: userId,
        },
      },
    });
  }

  @Put(':id')
  async updateNote(@Param('id') id: string, @Body() data: CreateNoteDTO) {
    return this.noteService.updateNote({ id: Number(id) }, data);
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string): Promise<NoteModel> {
    return this.noteService.deleteUser({ id: Number(id) });
  }
}
