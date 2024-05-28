import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userschema } from './entities/user.entity';
import {MongooseModule} from '@nestjs/mongoose';
import { Parent, parentschema } from 'src/parents/entities/parent.entity';
import { Establishment,  establishmentSchema } from 'src/establishments/entities/establishment.entity';

@Module({
  imports: [MongooseModule.forFeature([{name:"users", schema: userschema ,
discriminators:[{
  name: Parent.name, schema: parentschema
},
{name: Establishment.name, schema:establishmentSchema}
]}])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
