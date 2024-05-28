import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";


@Schema({timestamps:true})
export class Activitieschild {
    @Prop({type:SchemaTypes.ObjectId,ref:'activities', required:true})
    activity!:Types.ObjectId;

    @Prop({type:SchemaTypes.ObjectId,ref:'activities', required:true})
    child!:Types.ObjectId;


}
export const activitiesChildrenSchema=SchemaFactory.createForClass(Activitieschild)
