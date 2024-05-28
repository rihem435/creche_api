import { Module } from '@nestjs/common';
import { PersonelsService } from './personels.service';
import { PersonelsController } from './personels.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { personelchema } from './entities/personel.entity';

@Module({
  imports: [MongooseModule.forFeature([{name:"personels" , schema:personelchema}])],
  controllers: [PersonelsController],
  providers: [PersonelsService],
})
export class PersonelsModule {}
