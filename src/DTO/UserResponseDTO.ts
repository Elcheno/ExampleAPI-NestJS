import { ApiProperty } from "@nestjs/swagger";


export class UserResponseDTO {

    @ApiProperty({
        description: 'The id of the user'
    })
    id?: string;

    @ApiProperty({
        description: 'The email of the user',
    })
    email: string;

    @ApiProperty({
        description: 'The name of the user',
    })
    name?: string;

    @ApiProperty({
        description: 'The username of the user',
    })
    username?: string;

    @ApiProperty({
        description: 'The picture of the user',
    })
    picture?: string;

    @ApiProperty({
        description: 'The state of the user',
    })
    state?: string;
}