
import { Document } from "mongoose"; 

export interface IPresence extends Document{
readonly status:string;
readonly time:string;
readonly child:string

}