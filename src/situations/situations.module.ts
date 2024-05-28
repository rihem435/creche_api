import { Module } from '@nestjs/common';
import { SituationsService } from './situations.service';
import { SituationsController } from './situations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { situationchema } from './entities/situation.entity';
import { childrenSchema } from 'src/children/entities/child.entity';

@Module({
  imports: [MongooseModule.forFeature([{name:"situations" , schema:situationchema}]),
  MongooseModule.forFeature([{name:"children", schema: childrenSchema}])],
  controllers: [SituationsController],
  providers: [SituationsService],
})
export class SituationsModule {}
