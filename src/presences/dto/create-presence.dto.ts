import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePresenceDto {

    @ApiProperty({
        type:String,
        description: 'this is a required filed'
    })
    @IsString()
    @IsNotEmpty()
    status:string

    @ApiProperty({
        type:String,
        description: 'this is a required filed'
    })
    @IsString()
    @IsNotEmpty()
    time:string

    
    @ApiProperty({
        type:String,
        description: 'this is a required filed'
    })

    
    @IsString()
    @IsNotEmpty()
    child: string

}
