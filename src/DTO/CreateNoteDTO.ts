import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString, IsNotEmpty } from 'class-validator';

export class CreateNoteDTO {
  @ApiProperty({
    description: 'Note title',
    minLength: 4,
    required: true,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Note description',
    required: false,
  })
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Date in ISO 8601 format',
    format: 'ISO 8601',
    required: true,
  })
  @IsDateString()
  date: string;
}
