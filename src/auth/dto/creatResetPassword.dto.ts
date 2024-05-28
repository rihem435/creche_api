import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";





export class CreateEmailDto{
    @ApiProperty({
        type: String,
        description: 'this is a required filed'
    })
    @IsString()
    @IsNotEmpty()
    email: string
}