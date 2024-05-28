import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateChildDto {

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
    photo:string

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
    sex: string

    @ApiProperty({
        type:String,
        description: 'this is a required filed'
    })

    @IsString()
    @IsNotEmpty()
    program: string

    @ApiProperty({
        type:Date,
        description: 'this is a required filed'
    })

   
    @IsNotEmpty()
    birthdate: Date



    @ApiProperty({
        type:String,
        description: 'this is a required filed'
    })

    @IsString()
    @IsNotEmpty()
    category: string

    @ApiProperty({
        type:String,
        description: 'this is a required filed'
    })

    @IsString()
    @IsNotEmpty()
    parent: string
    
    @IsString()
    @IsNotEmpty()
    etablissement: string


}

