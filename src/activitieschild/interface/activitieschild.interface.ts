import { Document, Types } from "mongoose";


export interface IActivitieschild extends Document {

    readonly activity:string;
    readonly  child:string;
}