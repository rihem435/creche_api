import { Document } from "mongoose";

export interface ISituations extends Document{

    readonly type:string;
    readonly name:string;
    readonly treatment:string;
    readonly description:string;
    readonly child:string
}