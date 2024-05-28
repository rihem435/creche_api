import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateUserDto {
    @ApiProperty({
        type:String,
        description: 'this is a required filed'
    })

    @IsString()
    @IsNotEmpty()
    role:string

    @ApiProperty({
        type:String,
        description: 'this is a required filed'
    })

    @IsString()
    @IsNotEmpty()
    fullName:string

    @ApiProperty({
        type:String,
        description: 'this is a required filed'
    })

    @IsString()
    @IsNotEmpty()
    email:string

    @ApiProperty({
        type:Number,
        description: 'this is a required filed'
    })

    @IsNumber()
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
    password:string


    @ApiProperty({
        type:String,
        description: 'this is a required filed'
    })
    @IsString()
    @IsNotEmpty()
    userName:string


}
