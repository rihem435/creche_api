import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { SchemaTypes, Types } from "mongoose"

@Schema({timestamps:true})
export class Activity {

    @Prop({required: true})
    title :string

    @Prop({required: true})
    description:string

    @Prop({required: true})
    duration:string

    @Prop({required: true})
    photo:string

    @Prop([{type: SchemaTypes.ObjectId, ref:"activitychild"}])
    activitychild: Types.ObjectId[]
}

export const activitychema = SchemaFactory.createForClass(Activity)
