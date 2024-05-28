import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { SchemaTypes, Types } from "mongoose"
import { Personel } from "src/personels/entities/personel.entity"


@Schema({timestamps:true})
export class Situation {
   

    
    @Prop({required: true})
    type:string 

    @Prop({required: true})
    name:string

    @Prop({required: true})
    treatment:string

    @Prop({required: true})
    description:string

    @Prop({type:SchemaTypes.ObjectId, ref:"children" , required:true})
    child: Types.ObjectId


}

export const situationchema = SchemaFactory.createForClass(Situation)

