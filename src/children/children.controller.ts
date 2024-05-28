import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { response } from 'express';
import { Category } from 'src/categories/entities/category.entity';

@Controller('children')
@ApiTags("children")
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}
  


  @Get('/find/:parent')
  async findChildrenByParent(@Param('parent') parent: string, @Res() response){
    try {
      const findChildrenByParent=await this.childrenService.findChildrenByParent(parent)
      return response.status(HttpStatus.OK).json({
        message: "Children found by id parent",
        status: HttpStatus.OK,
        data: findChildrenByParent
      })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data:null
      })
      
      
    }
  }
  @Get('/findB/:etablissement')
  async findChildrenByetablissement(@Param('etablissement') etablissement: string, @Res() response){
    try {
      const findChildrenByetablissement=await this.childrenService.findChildrenByEtab(etablissement)
      return response.status(HttpStatus.OK).json({
        message: "Children found by id etablissement",
        status: HttpStatus.OK,
        data: findChildrenByetablissement
      })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data:null
      })
      
      
    }
  }
  @Get(':id')
  async findOneChild(@Param('id') id: string, @Res() response) {
    try {
      const oneChild=await this.childrenService.findOneChild(id)
      return response.status(HttpStatus.OK).json({
        message: "Child found successfully with id",
        status:HttpStatus.OK,
        data:oneChild
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        mesmessage:error.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  }

  @Get(':category')
  async findChildrenByCategory(@Param('category') category: string, @Res() response){
    try {
      const findChildrenBycategory=await this.childrenService.findChildrenByCategory(category)
      return response.status(HttpStatus.OK).json({
        message: "Children found by id category",
        status: HttpStatus.OK,
        data: findChildrenBycategory
      })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data:null
      })
      
      
    }
  }


  
  @Post()
  @ApiBody({
    schema:{
      type:'object',
      properties:{
        firstName:{
          type:'string'
        },
        lastName:{
          type: 'string'
        },
        phone:{
          type: 'number'
        },
        adress:{
          type: 'string'
        },
        photo:{
          type: 'string',
          format:'binary'
        },
        category:{
          type:'string'
        },
        parent:{
          type:'string'
        },
        sex:{
          type: 'string'
        },
        program:{
          type: 'string'
        },
        birthdate:{
          type: 'string'
        }
      }
    }
  })

  // configuration multer
  @ApiConsumes("multipart/form-data")
  @UseInterceptors( 
    FileInterceptor('photo',{
    storage:diskStorage({
      destination: './upload/children',
      filename:( _request, photo, callback)=>
      callback( null, `${new Date().getTime()}-${photo.originalname}`)
    })
  })
  )
  async createchild(@Body() createChildDto: CreateChildDto, @Res() response, @UploadedFile() photo: Express.Multer.File) {
    try {
      createChildDto.photo=photo.filename
      const newchild= await this.childrenService.createchild(createChildDto)
      return response.status(HttpStatus.CREATED).json({
        message: "User  is created  successfully",
        status: HttpStatus.CREATED,
        data: newchild
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
      const childrenData=await this.childrenService.findAllchild()
      return response.status(HttpStatus.OK).json({
        message: "UsersData  found successfully",
        status: HttpStatus.OK,
        data:childrenData
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

  
  @Patch(':id')
 async updateChild(@Param('id') id: string, @Res() response, @Body() updateChildDto: UpdateChildDto) {
    try {
      const updateChild=await this.childrenService.updateChild(id , updateChildDto)
      return response.status(HttpStatus.OK).json({
        message: "Child found successfully with id",
        status:HttpStatus.OK,
        data:updateChild
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
      const removeChild=await this.childrenService.removeChild(id)
      return response.status(HttpStatus.OK).json({
        message: "Child found successfully with id",
        status:HttpStatus.OK,
        data:removeChild
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
