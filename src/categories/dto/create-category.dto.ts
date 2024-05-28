import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {

    @ApiProperty({
        type:String,
        description: 'this is a required filed'
    })
    @IsString()
    @IsNotEmpty()
    name:string

}
