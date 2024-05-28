import { Document } from "mongoose"; 

export interface Ipersonels extends Document{

    readonly firstName:string;
    readonly lastName:string;
    readonly phone:number;
    readonly adress:string;
    readonly cin:number;
}