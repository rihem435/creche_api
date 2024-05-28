import { Module } from '@nestjs/common';

import { PresencesController } from './presences.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { PresenceSchema } from './entities/presence.entity';
import { PresenceService } from './presences.service';
import { childrenSchema } from 'src/children/entities/child.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: "presence", schema: PresenceSchema}]),
MongooseModule.forFeature([{name: "children", schema: childrenSchema}])],
  controllers: [PresencesController],
  providers: [PresenceService],
})
export class PresencesModule {}