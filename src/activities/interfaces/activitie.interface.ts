import { Document } from "mongoose";


export interface IActivitie extends Document{

    readonly title :string;
    readonly description:string;
    readonly duration:string;
    readonly photo:string;
}