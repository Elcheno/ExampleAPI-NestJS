import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty({
    description: 'The name of the user',
    required: false,
  })
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The email of the user',
    required: true,
    format: 'email',
  })
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'The picture of the user',
    required: false,
  })
  @IsString()
  picture?: string;
}
