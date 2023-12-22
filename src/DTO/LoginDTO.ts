import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsString } from 'class-validator';

export class LoginDTO {
    @ApiProperty({
        description: 'The email of the user',
        required: true,
        format: 'email',
    })
    @IsEmail()
    email: string

    @ApiProperty({
        description: 'The password of the user',
        required: true,
    })
    @IsString()
    password: string;
}