import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { Ichildren } from './interfaces/child.interface';
import { ICategory } from 'src/categories/interface/categories.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/users/interfaces/user.interface';

@Injectable()
export class ChildrenService {
  constructor(
    @InjectModel("children")
    private childModel: Model<Ichildren> ,
      @InjectModel("categories")
    private categoryModel:Model<ICategory>,
    @InjectModel("users")
    private userModel: Model<IUser>
    ) {}
    

  async createchild(createChildDto: CreateChildDto): Promise<Ichildren> {
    const newchild=new this.childModel(createChildDto)
    await this.categoryModel.updateOne({_id: createChildDto.category},
      {$push:{children:newchild._id
      }})
      await this.userModel.updateOne({_id: createChildDto.parent},
        {$push:{children:newchild._id
        }})
    await this.userModel.updateOne(
      { _id: createChildDto.etablissement },
          {$push:{children:newchild._id
          }})
    return await newchild.save()


  }

  async findAllchild(): Promise<Ichildren[]> {
    const childrenData=await this.childModel.find().exec()
    if (!childrenData || childrenData.length ===0)
      throw new NotFoundException('ChildData does not found')
    
    return childrenData
  }

  async findOneChild(id: string): Promise<Ichildren> {
    const oneChild=await this.childModel.findById(id)
    if (!oneChild){
      throw new NotFoundException("child does not found")
    }
    return oneChild
  }
    
    async updateChild(id: string, updateChildDto: UpdateChildDto): Promise<Ichildren> {
      const childUpdated=await this.childModel.findByIdAndUpdate(id, updateChildDto, {new:true})
      if(!childUpdated){
        throw new NotFoundException("child does not found")
      }
      return childUpdated
  }

  async removeChild(childid: string) {
    const deleteChild=await this.childModel.findByIdAndDelete(childid)


    if(!deleteChild){
      throw new NotFoundException("child does not found")
    }
     await this.categoryModel.updateOne({_id: deleteChild["category"]},
      {$pull:{children:deleteChild["_id"]
  
      }}) 
      await this.userModel.updateOne({_id: deleteChild["user"]},
      {$pull:{children:deleteChild["_id"]
      }})   
    return deleteChild
    


  }
  // find children by parent
  async findChildrenByParent(parent: string): Promise<Ichildren[]>{
    return await this.childModel.find({parent}).exec()
  }
 // find children by parent
 async findChildrenByEtab(etablissement: string): Promise<Ichildren[]>{
  return await this.childModel.find({etablissement}).exec()
}
  async findChildrenByCategory(category: string): Promise<Ichildren[]>{
    const childrenbyCategory=await this.childModel.find({category:category}).exec()
    if(!childrenbyCategory){
      throw new NotFoundException("children does not found")
    }
    
    return  childrenbyCategory



}
}
