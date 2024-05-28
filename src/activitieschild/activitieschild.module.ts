import { Module } from '@nestjs/common';
import { ActivitieschildService } from './activitieschild.service';
import { ActivitieschildController } from './activitieschild.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { activitiesChildrenSchema } from './entities/activitieschild.entity';
import { childrenSchema } from 'src/children/entities/child.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: "activitieschild", schema: activitiesChildrenSchema }]),
  MongooseModule.forFeature([{ name: "children", schema: childrenSchema }]),
  MongooseModule.forFeature([{ name: "activities", schema: activitiesChildrenSchema }]),
],
  controllers: [ActivitieschildController],
  providers: [ActivitieschildService],
}
)
export class ActivitieschildModule {}
