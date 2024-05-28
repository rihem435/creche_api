import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"


@Schema({timestamps:true})
export class Personel {
    
    @Prop({required: true})
    firstName:string

    @Prop({required: true})
    lastName:string

    @Prop({required: true})
    phone:number

    @Prop({required: true})
    adress:string

    @Prop({required: true})
    cin:number

}

export const personelchema = SchemaFactory.createForClass(Personel)