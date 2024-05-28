import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IActivitie } from './interfaces/activitie.interface';
import { Model } from 'mongoose';


@Injectable()
export class ActivitiesService {


  constructor(
    @InjectModel("activities")
    private activitieModel: Model<IActivitie>){}

  async createactivity(createActivityDto: CreateActivityDto): Promise<IActivitie> {
    const newactivity=new this.activitieModel(createActivityDto)
    return await newactivity.save()
  }

  async findAllactivity(): Promise<IActivitie[]> {
    const activitiesData=await this.activitieModel.find().exec()
    if (!activitiesData || activitiesData.length ===0)
      throw new NotFoundException('ActivityData does not found')
    
    return activitiesData
  }

  async findOneActivity(id: string): Promise<IActivitie> {
    const oneActivity=await this.activitieModel.findById(id)
    if (!oneActivity){
      throw new NotFoundException("activity does not found")
    }
    return oneActivity
  }
    
    async updateActivity(id: string, updateActivityDto: UpdateActivityDto): Promise<IActivitie> {
      const activityUpdated=await this.activitieModel.findByIdAndUpdate(id, updateActivityDto, {new:true})
      if(!activityUpdated){
        throw new NotFoundException("activity does not found")
      }
      return activityUpdated
  }

  async removeActivity(id: string) {
    const deletedActivity=await this.activitieModel.findByIdAndDelete(id)
    if(!deletedActivity){
      throw new NotFoundException("activity does not found")
    }
    return deletedActivity
  }
}
