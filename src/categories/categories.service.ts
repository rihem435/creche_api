import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ICategory } from './interface/categories.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel("categories")
    private categorieModel: Model<ICategory>){}
  
    async  findCatByName(name: string):Promise<ICategory> {
      const catByName=await this.categorieModel.findOne({name}).exec()
    return catByName;
     }
  async createcategory(createCategoryDto: CreateCategoryDto): Promise<ICategory> {
    const newcategory=new this.categorieModel(createCategoryDto)
    return await newcategory.save()
  }

  async findAllcategory(): Promise<ICategory[]> {
    const aategoriesData=await this.categorieModel.find().exec()
    if (!aategoriesData || aategoriesData.length ===0)
      throw new NotFoundException('CategoryData does not found')
    
    return aategoriesData
  }

  async findOneCategory(id: string): Promise<ICategory> {
    const oneCategory=await this.categorieModel.findById(id)
    if (!oneCategory){
      throw new NotFoundException("category does not found")
    }
    return oneCategory
  }
    
    async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<ICategory> {
      const categoryUpdated=await this.categorieModel.findByIdAndUpdate(id, updateCategoryDto, {new:true})
      if(!categoryUpdated){
        throw new NotFoundException("category does not found")
      }
      return categoryUpdated
  }

  async removeCategory(id: string) {
    const deletedCategory=await this.categorieModel.findByIdAndDelete(id)
    if(!deletedCategory){
      throw new NotFoundException("category does not found")
    }
    return deletedCategory
  }
}
