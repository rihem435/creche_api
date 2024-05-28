import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivitieschildDto } from './dto/create-activitieschild.dto';
import { UpdateActivitieschildDto } from './dto/update-activitieschild.dto';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { IActivitieschild } from './interface/activitieschild.interface';
import { Ichildren } from 'src/children/interfaces/child.interface';

@Injectable()
export class ActivitieschildService {
 constructor(
  @InjectModel("activitieschild")
  private activitychildModel: Model<IActivitieschild>,
  @InjectModel("children")
  private childrenModel: Model<Ichildren>,
  @InjectModel("activities")
  private activityModel: Model<IActivitieschild>,


  ){}
 async createactivitychild(createActivitieschildDto: CreateActivitieschildDto) : Promise<IActivitieschild>{
  const newactivitychild=new this.activitychildModel(createActivitieschildDto)
  await this.childrenModel.updateOne({_id:createActivitieschildDto.child} , 
    {$push:{ activitychild: newactivitychild._id}})

    await this.activityModel.updateOne({_id:createActivitieschildDto.activity} , 
      {$push:{ activitychild: newactivitychild._id}})
  


return await newactivitychild.save()
    
  }
 

    async findAllactivitychild() : Promise<IActivitieschild[]> {
      const activitieschildData=await this.activitychildModel.find().exec()
      if (!activitieschildData || activitieschildData.length===0)
      throw new NotFoundException('activitychildData does not found')
    return activitieschildData
  }

  async findOneactivitychild(id: string): Promise<IActivitieschild> {
    const oneActivitychild=await this.activitychildModel.findById(id)
    if (!oneActivitychild){
      throw new NotFoundException("activitychild does not found")
     
    }
    return oneActivitychild
  }
   

  async UpdateActivitieschild(id: string, updateActivitieschildDto: UpdateActivitieschildDto) : Promise<IActivitieschild>{
    const activitychildUpdated=await this.activitychildModel.findByIdAndUpdate(id, updateActivitieschildDto, {new: true})
    if(!activitychildUpdated){
      throw new NotFoundException("activitychild does not found")
    }
    return activitychildUpdated
  }
  


  async removeactivitychild(activitychildid: string) {
    const deletedActivitychild=await this.activitychildModel.findByIdAndDelete(activitychildid)
    if(!deletedActivitychild){
      throw new NotFoundException("activitychild does not found")
    }
    await this.childrenModel.updateOne({_id: deletedActivitychild["child"]},
    {$pull:{activitychild: deletedActivitychild["_id"]}},
    
    )
    await this.activityModel.updateOne({_id: deletedActivitychild["activity"]},
    {$pull: {activitychild: deletedActivitychild["_id"]}})
    


return deletedActivitychild
  }
   
}
