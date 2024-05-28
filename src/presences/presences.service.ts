import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPresence } from './interfaces/presence.interface';
import { Ichildren } from 'src/children/interfaces/child.interface';

@Injectable()
export class PresenceService {
  constructor(
  @InjectModel("presence")
    private presenceModel: Model<IPresence> ,
    @InjectModel("children")
    private childrenModel: Model<Ichildren> 

    ) {}


  async createpresence(createPresenceDto: CreatePresenceDto): Promise<IPresence> {
    const newPresence=new this.presenceModel(createPresenceDto)
    await this.childrenModel.updateOne({_id: createPresenceDto.child},
      {$push:{presences:newPresence._id
      }})
  
    return await newPresence.save()
  }
  async findPresencesByChild(child: string): Promise<IPresence[]>{
    return await this.presenceModel.find({child}).exec()
  }

  async findAllPresence(): Promise<IPresence[]> {
    const presenceData=await this.presenceModel.find().exec()
    if (!presenceData || presenceData.length ===0)
      throw new NotFoundException('presenceData does not found')
    
    return presenceData
  }

  async findOnePresence(id: string): Promise<IPresence> {
    const onepresence=await this.presenceModel.findById(id)
    if (!onepresence){
      throw new NotFoundException("presence does not found")
    }
    return onepresence
  }
    
    async updatePresence(id: string, updatePresenceDto: UpdatePresenceDto): Promise<IPresence> {
      const presenceUpdated=await this.presenceModel.findByIdAndUpdate(id, updatePresenceDto, {new:true})
      if(!presenceUpdated){
        throw new NotFoundException("presence does not found")
      }
      return presenceUpdated
  }
  
  async removePresence(id: string) {
    const deletedPresence=await this.presenceModel.findByIdAndDelete(id)
    if(!deletedPresence){
      throw new NotFoundException("presence does not found")
    }
     await this.childrenModel.updateOne({_id: deletedPresence["child"]},
      {$pull:{presences:deletedPresence["_id"]
      }}) 
    return deletedPresence
}
}
