import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { PersonelsService } from './personels.service';
import { CreatePersonelDto } from './dto/create-personel.dto';
import { UpdatePersonelDto } from './dto/update-personel.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('personels')
@ApiTags('personels')
export class PersonelsController {
  constructor(private readonly personelsService: PersonelsService) {}

  @Post()
  async createpersonel(@Body() createPersonelDto: CreatePersonelDto, @Res() response) {
    try {
      const newaersonel=await this.personelsService.createpersonel(createPersonelDto)
      return response.status(HttpStatus.CREATED).json({
        message: "personel  is created  successfully",
        status: HttpStatus.CREATED,
        data: newaersonel
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
      const personelsData=await this.personelsService.findAllpersonel()
      return response.status(HttpStatus.OK).json({
        message: "PersonelsData  found successfully",
        status: HttpStatus.OK,
        data:personelsData
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
  async findOnePersonel(@Param('id') id: string, @Res() response) {
    try {
      const onePersonel=await this.personelsService.findOnePersonel(id)
      return response.status(HttpStatus.OK).json({
        message: "Personel found successfully with id",
        status:HttpStatus.OK,
        data:onePersonel
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
 async updatePersonel(@Param('id') id: string, @Res() response, @Body() updatePersonelDto: UpdatePersonelDto) {
    try {
      const updatePersonel=await this.personelsService.updatePersonel(id , updatePersonelDto)
      return response.status(HttpStatus.OK).json({
        message: "Personel updated successfully with id",
        status:HttpStatus.OK,
        data:updatePersonel
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
      const removePersonel=await this.personelsService.removePersonel(id)
      return response.status(HttpStatus.OK).json({
        message: "Personel deleted successfully with id",
        status:HttpStatus.OK,
        data:removePersonel
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
