import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDTOGoogle {
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
  email: string;

  @ApiProperty({
    description: 'The UID of the user',
    required: true,
  })
  @IsString()
  uid: string;
}
