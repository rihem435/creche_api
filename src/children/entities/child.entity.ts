
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { SchemaTypes, Types } from "mongoose"

@Schema({timestamps:true})

export class Child {

    @Prop({required: true})
    firstName:string

    @Prop({required: true})
    lastName:string

    @Prop({required: true})
    phone:number

    @Prop({required: true})
    photo:string

    
    @Prop({required: true})
    sex:string

      
    @Prop({required: true})
    program:string
    
    @Prop({required: true})
    birthdate:Date
    @Prop({required: true})
    adress:string

    @Prop({type: SchemaTypes.ObjectId, ref:"categories", required: true})
    category: Types.ObjectId

    @Prop([{type: SchemaTypes.ObjectId, ref:"situations"}])
    situations: Types.ObjectId[]

    @Prop([{type: SchemaTypes.ObjectId, ref:"presences"}])
    presences: Types.ObjectId

    @Prop({type: SchemaTypes.ObjectId,required:false, ref:"users"})
    parent: Types.ObjectId
    @Prop({type: SchemaTypes.ObjectId,required:false, ref:"users"})
    etablissement: Types.ObjectId
    @Prop([{type: SchemaTypes.ObjectId, ref:"activitychild"}])
    activitychild: Types.ObjectId[]




}

export const childrenSchema = SchemaFactory.createForClass(Child)
