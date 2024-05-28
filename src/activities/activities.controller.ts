import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

import { diskStorage } from 'multer';

import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@Controller('activities')
@ApiTags("activities")
export class ActivitiesController {
  
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  @ApiBody({
    schema:{
      type:'object',
      properties:{
       title:{
        type: 'string'
       },
       description: {
        type: 'string'
       },
       duration:{
        type: 'string'
       },
       photo:{
        type: 'string',
        format:'binary'
       }
      }
    }
  })

  // configuration multer
  @ApiConsumes("multipart/form-data")
  //configuration multer
  @UseInterceptors(
    FileInterceptor('photo', {
      storage:diskStorage({
        destination:'./upload/activities',
        filename:( _request, photo, callback)=>
        callback( null, `${new Date().getTime()}-${photo.originalname}`)
      })
    })
  )
  async createactivity(@Body() createActivityDto: CreateActivityDto, @Res() response, @UploadedFile() photo: Express.Multer.File) {
    try {
      createActivityDto.photo=photo.filename
      const newactivity= await this.activitiesService.createactivity(createActivityDto)
      return response.status(HttpStatus.CREATED).json({
        message: "User  is created  successfully",
        status: HttpStatus.CREATED,
        data: newactivity
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
      const activitiesData=await this.activitiesService.findAllactivity()
      return response.status(HttpStatus.OK).json({
        message: "UsersData  found successfully",
        status: HttpStatus.OK,
        data:activitiesData
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

  @Get(':id')
  async findOneActivity(@Param('id') id: string, @Res() response) {
    try {
      const oneActivity=await this.activitiesService.findOneActivity(id)
      return response.status(HttpStatus.OK).json({
        message: "Activity found successfully with id",
        status:HttpStatus.OK,
        data:oneActivity
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
 async updateActivity(@Param('id') id: string, @Res() response, @Body() updateActivityDto: UpdateActivityDto) {
    try {
      const updateActivity=await this.activitiesService.updateActivity(id , updateActivityDto)
      return response.status(HttpStatus.OK).json({
        message: "Activity updated successfully with id",
        status:HttpStatus.OK,
        data:updateActivity
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
      const removeActivity=await this.activitiesService.removeActivity(id)
      return response.status(HttpStatus.OK).json({
        message: "Activity deleted successfully with id",
        status:HttpStatus.OK,
        data:removeActivity
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