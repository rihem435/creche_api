import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Catch } from '@nestjs/common';

import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';
import { PresenceService } from './presences.service';
import { response } from 'express';

@Controller('presences')
export class PresencesController {
  constructor(private readonly presencesService: PresenceService) {}

  @Post()
  async createpresence(@Body() createPresenceDto: CreatePresenceDto, @Res() response) {
    try{
      const newPresence= await this.presencesService.createpresence(createPresenceDto)
      return response.status(HttpStatus.CREATED).json({
        message: "presence  is created  successfully",
        status: HttpStatus.CREATED,
        data: newPresence
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null
      })
    }
  }
  @Get('/find/:child')
  async findPresencesByChild(@Param('child') child: string, @Res() response){
    try {
      const findPresencesByChild=await this.presencesService.findPresencesByChild(child)
      return response.status(HttpStatus.OK).json({
        message: "presences found by id child",
        status: HttpStatus.OK,
        data: findPresencesByChild
      })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data:null
      })
      
      
    }
  }
  @Get()
 async findAll(@Res() response) {
  try{
  const presencesData=await this.presencesService.findAllPresence()
  return response.status(HttpStatus.OK).json({
    message: "UsersData  found successfully",
    status: HttpStatus.OK,
    data:presencesData
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
  async findOnePresence(@Param('id') id: string, @Res() response) {
    try {
      const onePresence=await this.presencesService.findOnePresence(id)
      return response.status(HttpStatus.OK).json({
        message: "Presence found successfully with id",
        status:HttpStatus.OK,
        data:onePresence
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
 async updatePresence(@Param('id') id: string, @Res() response, @Body() updatePresenceDto: UpdatePresenceDto) {
  
  try{
  
  const updatePresence=await this.presencesService.updatePresence(id , updatePresenceDto)
  return response.status(HttpStatus.OK).json({
    message: "Presence updated successfully with id",
    status:HttpStatus.OK,
    data:updatePresence
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
 async remove(@Param('id') id: string, @Res() response )  {
  try {
    const removePresence=await this.presencesService.removePresence(id)
    return response.status(HttpStatus.OK).json({
      message: "Presence deleted successfully with id",
      status:HttpStatus.OK,
      data:removePresence
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
