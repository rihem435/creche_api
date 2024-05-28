import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";




export class CreateActivityDto{

    @ApiProperty({
        type:String,
        description: 'this is a required filed'
    })
    @IsString()
    @IsNotEmpty()
    title :string


    @ApiProperty({
        type:String,
        description: 'this is a required filed'
    })
    @IsString()
    @IsNotEmpty()
    description:string

    @ApiProperty({
        type:String,
        description: 'this is a required filed'
    })
    @IsString()
    @IsNotEmpty()
    duration:string
    

    @ApiProperty({
        type:String,
        description: 'this is a required filed'
    })

    @IsString()
    @IsNotEmpty()
    photo:string



}