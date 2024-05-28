import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSituationDto } from './dto/create-situation.dto';
import { UpdateSituationDto } from './dto/update-situation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISituations } from './interface/situations.interface';
import { Ichildren } from 'src/children/interfaces/child.interface';



@Injectable()
export class SituationsService {
  constructor(
    @InjectModel("situations")
    private situationModel: Model<ISituations>,
    @InjectModel("children")
    private childrenModel:Model<Ichildren>
    ){}

  async createsituation(createSituationDto: CreateSituationDto): Promise<ISituations> {
    const newsituation=new this.situationModel(createSituationDto)
    await this.childrenModel.updateOne({_id: createSituationDto.child},
      {$push:{situations:newsituation._id
      }})
    return await newsituation.save()
  }

  async findAllsituation(): Promise<ISituations[]> {
    const situationsData=await this.situationModel.find().exec()
    if (!situationsData || situationsData.length ===0)
      throw new NotFoundException('SituationData does not found')
    
    return situationsData
  }

  async findOneSituation(id: string): Promise<ISituations> {
    const oneSituation=await this.situationModel.findById(id)
    if (!oneSituation){
      throw new NotFoundException("situation does not found")
    }
    return oneSituation
  }
    
    async updateSituation(id: string, updateSituationDto: UpdateSituationDto): Promise<ISituations> {
      const situationUpdated=await this.situationModel.findByIdAndUpdate(id, updateSituationDto, {new:true})
      if(!situationUpdated){
        throw new NotFoundException("situation does not found")
      }
      return situationUpdated
  }

  async removeSituation(id: string) {
    const deletedSituation=await this.situationModel.findByIdAndDelete(id)
    if(!deletedSituation){
      throw new NotFoundException("situation does not found")
    }
     await this.childrenModel.updateOne({_id: deletedSituation["child"]},
      {$pull:{situations:deletedSituation["_id"]
      }}) 
    return deletedSituation
  }
}
