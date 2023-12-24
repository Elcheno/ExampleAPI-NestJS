import { ApiProperty } from "@nestjs/swagger";


export class UserResponseDTO {
    @ApiProperty({
        description: 'The email of the user',
    })
    email: string;

    @ApiProperty({
        description: 'The name of the user',
    })
    name?: string;

}