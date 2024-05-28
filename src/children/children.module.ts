import { Module } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { ChildrenController } from './children.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { childrenSchema } from './entities/child.entity';
import { Categorychema } from 'src/categories/entities/category.entity';
import { userschema } from 'src/users/entities/user.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: "children", schema: childrenSchema }]),
  MongooseModule.forFeature([{ name: "categories", schema: Categorychema }]),
  MongooseModule.forFeature([{ name: "users", schema: userschema }])],
  controllers: [ChildrenController],
  providers: [ChildrenService],
})
export class ChildrenModule {}
