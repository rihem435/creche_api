
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose'

import * as argon2 from 'argon2'
import { HydratedDocument, SchemaTypes, Types } from 'mongoose'
import { Establishment } from 'src/establishments/entities/establishment.entity'
import { Parent } from 'src/parents/entities/parent.entity'

export type UserDocument=HydratedDocument<User>
@Schema({ timestamps: true , discriminatorKey:'role'})
export class User {

    @Prop({ required: true, enum: [Parent.name, Establishment.name] })
    role: string
    @Prop({ required: true, })
    fullName: string

    @Prop({ required: true, unique:true })
    email: string

    @Prop({ required: true })
    phone: number

    @Prop({ required: true })
    adress: string

    @Prop({ required: true })
    password: string
    @Prop({ required: true })
    userName: string
    @Prop()
    refreshToken:string

    @Prop([{type:SchemaTypes.ObjectId, ref:"children" }])
    children: Types.ObjectId[]

}
export const userschema = SchemaFactory.createForClass(User).pre('save',
    async function () {
        this.password = await argon2.hash(this.password)
    })

