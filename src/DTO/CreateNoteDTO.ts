import { IsDateString, IsString, IsNotEmpty } from 'class-validator';

export class CreateNoteDTO {
  @IsNotEmpty() title: string;
  @IsString() description?: string;
  @IsDateString() date: string;
}
