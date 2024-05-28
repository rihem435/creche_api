import { Document } from "mongoose";



export interface Ichildren extends Document{

    readonly firstName:string;
    readonly lastName:string;
    readonly phone:number;
    readonly photo:string;
    readonly adress:string;
    readonly parent: string;
    readonly etablissement: string;


}