import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { SituationsService } from './situations.service';
import { CreateSituationDto } from './dto/create-situation.dto';
import { UpdateSituationDto } from './dto/update-situation.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('situations')
@ApiTags('situations')
export class SituationsController {
  constructor(private readonly situationsService: SituationsService) {}

  @Post()

  async createsituation(@Body() createSituationDto: CreateSituationDto, @Res() response) {
    try {
      const newsituation= await this.situationsService.createsituation(createSituationDto)
      return response.status(HttpStatus.CREATED).json({
        message: "User  is created  successfully",
        status: HttpStatus.CREATED,
        data: newsituation
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
      const situationsData=await this.situationsService.findAllsituation()
      return response.status(HttpStatus.OK).json({
        message: "UsersData  found successfully",
        status: HttpStatus.OK,
        data:situationsData
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
  async findOneSituation(@Param('id') id: string, @Res() response) {
    try {
      const oneSituation=await this.situationsService.findOneSituation(id)
      return response.status(HttpStatus.OK).json({
        message: "Situation found successfully with id",
        status:HttpStatus.OK,
        data:oneSituation
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
 async updateSituation(@Param('id') id: string, @Res() response, @Body() updateSituationDto: UpdateSituationDto) {
    try {
      const updateSituation=await this.situationsService.updateSituation(id , updateSituationDto)
      return response.status(HttpStatus.OK).json({
        message: "Situation updated successfully with id",
        status:HttpStatus.OK,
        data:updateSituation
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
      const removeSituation=await this.situationsService.removeSituation(id)
      return response.status(HttpStatus.OK).json({
        message: "Situation deleted successfully with id",
        status:HttpStatus.OK,
        data:removeSituation
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
