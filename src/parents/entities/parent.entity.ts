import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";


export type parentDocument=HydratedDocument<Parent>
@Schema({timestamps: true})
export class Parent {
    role: string
}
export const parentschema=SchemaFactory.createForClass(Parent)
