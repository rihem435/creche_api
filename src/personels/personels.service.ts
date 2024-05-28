import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonelDto } from './dto/create-personel.dto';
import { UpdatePersonelDto } from './dto/update-personel.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ipersonels } from './interface/personels.interface';


@Injectable()
export class PersonelsService {
  constructor(
    @InjectModel("personels")
    private personelModel: Model<Ipersonels>){}

  async createpersonel(createPersonelDto: CreatePersonelDto): Promise<Ipersonels> {
    const newpersonel=new this.personelModel(createPersonelDto)
    return await newpersonel.save()
  }

  async findAllpersonel(): Promise<Ipersonels[]> {
    const personelsData=await this.personelModel.find().exec()
    if (!personelsData || personelsData.length ===0)
      throw new NotFoundException('PersonelData does not found')
    
    return personelsData
  }

  async findOnePersonel(id: string): Promise<Ipersonels> {
    const onePersonel=await this.personelModel.findById(id)
    if (!onePersonel){
      throw new NotFoundException("personel does not found")
    }
    return onePersonel
  }
    
    async updatePersonel(id: string, updatePersonelDto: UpdatePersonelDto): Promise<Ipersonels> {
      const personelUpdated=await this.personelModel.findByIdAndUpdate(id, updatePersonelDto, {new:true})
      if(!personelUpdated){
        throw new NotFoundException("personel does not found")
      }
      return personelUpdated
  }

  async removePersonel(id: string) {
    const deletedPersonel=await this.personelModel.findByIdAndDelete(id)
    if(!deletedPersonel){
      throw new NotFoundException("personel does not found")
    }
    return deletedPersonel
  }
}
