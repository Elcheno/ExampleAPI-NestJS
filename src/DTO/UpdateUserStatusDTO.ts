import { ApiProperty } from "@nestjs/swagger";


export class UpdateUserStatusDTO {
    @ApiProperty({
        description: 'The id of the user',
        required: true,
    })
    id: string;

    @ApiProperty({
        description: 'The status of the user',
        required: true,
    })
    state: string;
}