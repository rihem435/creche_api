import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';


@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private readonly categoriesService:CategoriesService) {}

  @Post()
  async createcategorie(@Body() createCategoryDto: CreateCategoryDto, @Res() response) {
    try {
      const newcategorie= await this.categoriesService.createcategory(createCategoryDto)
      return response.status(HttpStatus.CREATED).json({
        message: "category  is created  successfully",
        status: HttpStatus.CREATED,
        data: newcategorie
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null
      })
    }
  }

  @Get(':name')
  async findCatByName(@Param('name') name: string, @Res() response) {
    try {
      const catByName = await this.categoriesService.findCatByName(name)
      return response.status(HttpStatus.OK).json({
        message:"cat found succefully with name category",
        status:HttpStatus.OK,
        data:catByName,
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null
      })


    }
  }
  @Get()
  async findAll(@Res() response) {
    try {
      const categoriesData=await this.categoriesService.findAllcategory()
      return response.status(HttpStatus.OK).json({
        message: "UsersData  found successfully",
        status: HttpStatus.OK,
        data:categoriesData
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data:null
      })
      
    }{

    }
  }

  @Get('byid/:id')
  async findOneCategory(@Param('id') id: string, @Res() response) {
    try {
      const oneCategory=await this.categoriesService.findOneCategory(id)
      return response.status(HttpStatus.OK).json({
        message: "Category found successfully with id",
        status:HttpStatus.OK,
        data:oneCategory
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        mesmessage:error.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }

  @Patch(':id')
 async updateCategory(@Param('id') id: string, @Res() response, @Body() updateCategoryDto: UpdateCategoryDto) {
    try {
      const updateCategory=await this.categoriesService.updateCategory(id , updateCategoryDto)
      return response.status(HttpStatus.OK).json({
        message: "Category updated successfully with id",
        status:HttpStatus.OK,
        data:updateCategory
        })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        mesmessage:error.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
      }
    }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response ) {
    try {
      const removeCategory=await this.categoriesService.removeCategory(id)
      return response.status(HttpStatus.OK).json({
        message: "Category deleted successfully with id",
        status:HttpStatus.OK,
        data:removeCategory
    })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        mesmessage:error.message,
        status:HttpStatus.BAD_REQUEST,
        data:null 
        }) 
    }
    }
}
