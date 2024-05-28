import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { SchemaTypes, Types } from "mongoose"


@Schema({timestamps:true})
export class Category {
   
   

    
    @Prop({required: true})
    name:string
    @Prop([{type:SchemaTypes.ObjectId, ref:"children"}])
    children: Types.ObjectId[]
}

export const Categorychema = SchemaFactory.createForClass(Category)

