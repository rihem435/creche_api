import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateActivitieschildDto {


    @ApiProperty({
        type:String,
        description: 'this is a required filed'
    })

    @IsString()
    @IsNotEmpty()
    activity!:Types.ObjectId;

    @ApiProperty({
        type:String,
        description: 'this is a required filed'
    })

    @IsString()
    @IsNotEmpty()
    child!:Types.ObjectId


}
