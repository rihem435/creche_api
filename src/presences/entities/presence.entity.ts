import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";




@Schema({timestamps:true})
    export class Presence{
        @Prop({required:true})
        status:string

        @Prop({required:true})
        time:string

        @Prop({type:SchemaTypes.ObjectId, ref:"children" , required:true})
        child: Types.ObjectId
    }

    export const PresenceSchema=SchemaFactory.createForClass(Presence) 