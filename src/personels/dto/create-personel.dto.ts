import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"


export class CreatePersonelDto {

    @ApiProperty({
        type:String,
        description: 'this is a required filed'
    })

    @IsString()
    @IsNotEmpty()
    firstName:string

    @ApiProperty({
        type:String,
        description: 'this is a required filed'
    })

    @IsString()
    @IsNotEmpty()
    lastName:string

    @ApiProperty({
        type:Number,
        description: 'this is a required filed'
    })

    @IsString()
    @IsNotEmpty()
    phone:number

    @ApiProperty({
        type:String,
        description: 'this is a required filed'
    })

    @IsString()
    @IsNotEmpty()
    adress:string

    @ApiProperty({
        type:String,
        description: 'this is a required filed'
    })

    @IsString()
    @IsNotEmpty()
    cin:number
}
