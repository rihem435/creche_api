import { Document } from "mongoose";


export interface IUser extends Document{
    readonly role:string;
    readonly fullName:string;
    readonly email:string;
    readonly phone:number;
    readonly adress:string;
    readonly password:string;
    readonly userName:string;
    readonly refreshToken:string
}