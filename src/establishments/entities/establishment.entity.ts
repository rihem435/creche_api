import {Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { timestamp } from "rxjs";



export type establishmentDocument=HydratedDocument<Establishment>
@Schema({timestamps: true})
export class Establishment {
    role: string
}
export const establishmentSchema=SchemaFactory.createForClass(Establishment)