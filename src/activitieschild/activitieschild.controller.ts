import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { ActivitieschildService } from './activitieschild.service';
import { CreateActivitieschildDto } from './dto/create-activitieschild.dto';
import { UpdateActivitieschildDto } from './dto/update-activitieschild.dto';


@Controller('activitieschild')
export class ActivitieschildController {
  constructor(private readonly activitieschildService: ActivitieschildService) {}

  @Post()
 async createactivitychild(@Body() createActivitieschildDto: CreateActivitieschildDto, @Res() response ){
  try {
    const newactivitychild=await this.activitieschildService.createactivitychild(createActivitieschildDto)
    return response.status(HttpStatus.CREATED).json({
      message: "activitychild  is created  successfully",
      status: HttpStatus.CREATED,
      data: newactivitychild
    
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
    const activitieschildData=await this.activitieschildService.findAllactivitychild()
      return response.status(HttpStatus.OK).json({
        message: "Activitiechild Data  found successfully",
        status: HttpStatus.OK,
        data:activitieschildData
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
 async findOneActivitychild(@Param('id') id: string, @Res() response) {
  try {
    const oneActivitychild=await this.activitieschildService.findOneactivitychild(id)
      return response.status(HttpStatus.OK).json({
        message: "Activitychild found successfully with id",
        status:HttpStatus.OK,
        data:oneActivitychild
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
  async updateactivitychid(@Param('id') id: string,@Res() response, @Body() updateActivitieschildDto: UpdateActivitieschildDto) {
    try {
      const updateActivitieschild=await this.activitieschildService.UpdateActivitieschild(id , updateActivitieschildDto)
      return response.status(HttpStatus.OK).json({
        message: "Activitychild updated successfully with id",
        status:HttpStatus.OK,
        data:this.updateactivitychid
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
 async remove(@Param('id') id: string, @Res() response) {
  try {
    const removeActivitychild=await this.activitieschildService.removeactivitychild(id)
    return response.status(HttpStatus.OK).json({
      message: "Activitychild deleted successfully with id",
      status:HttpStatus.OK,
      data:removeActivitychild
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
