import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Response, HttpStatus, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { response } from 'express';
import { ApiTags } from '@nestjs/swagger';


@Controller('users')
@ApiTags("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('role')
  async findAllUserByRole(@Query('role') role: string, @Res() response){
    try {
      const userByRole=await this.usersService.findAllUserByRole(role)
      return response.status(HttpStatus.OK).json({
        message: "User found by role",
        status: HttpStatus.OK,
        data: userByRole
      })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null
      })
    }
  }
  
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto, @Res() response){ 
    try {
      const newUser= await this.usersService.createuser(createUserDto)
      return response.status(HttpStatus.CREATED).json({
        message: "User  is created  successfully",
        status: HttpStatus.CREATED,
        data: newUser

      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null
      })
    }
  }
  @Get('userName')
  async findAllUserByName(@Query('userName') userName: string, @Res() response){
    try {
      const userByRole=await this.usersService.findUserByName(userName)
      return response.status(HttpStatus.OK).json({
        message: "User found by role",
        status: HttpStatus.OK,
        data: userByRole
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
      const usersData=await this.usersService.findAllUsers()
      return response.status(HttpStatus.OK).json({
        message: "UsersData  found successfully",
        status: HttpStatus.OK,
        data:usersData
      
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
  async findOneUser(@Param('id') id: string, @Res() response) {
    try {
      const oneUser=await this.usersService.findOneUser(id)
      return response.status(HttpStatus.OK).json({
        message: "User found successfully with id",
        status:HttpStatus.OK,
        data:oneUser
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
 async updateUser(@Param('id') id: string, @Res() response ,@Body() updateUserDto:UpdateUserDto) {
  try {
    const updateUser=await this.usersService.updateUser(id , updateUserDto)
      return response.status(HttpStatus.OK).json({
        message: "User found successfully with id",
        status:HttpStatus.OK,
        data:updateUser
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
    const removeUser=await this.usersService.removeUser(id)
      return response.status(HttpStatus.OK).json({
        message: "User found successfully with id",
        status:HttpStatus.OK,
        data:removeUser
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
