import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser} from './interfaces/user.interface';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel("users")
    private userModel: Model<IUser>,
    
    
    
    ){}
  
  async createuser(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser=new this.userModel(createUserDto)

    return await newUser.save()

  }
  async  findUserByName(userName: string):Promise<IUser> {
    const userByName=await this.userModel.findOne({userName}).exec()
  return userByName;
   }
  async findAllUsers(): Promise<IUser[]> {
    const usersData=await this.userModel.find().exec()
    if (!usersData || usersData.length ===0)
      throw new NotFoundException('UserData does not found')
  
    return usersData
  }

 async findOneUser(id: string): Promise<IUser> {
    const oneUser=await this.userModel.findById(id)
    if (!oneUser){
      throw new NotFoundException("user does not found")
    }
    return oneUser
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const userUpdated=await this.userModel.findByIdAndUpdate(id, updateUserDto, {new:true})
    if(!userUpdated){
      throw new NotFoundException("user does not found")
    }
    return userUpdated
  }



  async findUserByEmail(email: string): Promise<IUser>{
    return this.userModel.findOne({email}).exec()
  }

  async findOneUserAndRestPassword(email:any, password:any): Promise<IUser>{
    return this.userModel.findOneAndUpdate(email, password)
  }

  async removeUser(id: string) {
    const deletedUser=await this.userModel.findByIdAndDelete(id)
    if(!deletedUser){
      throw new NotFoundException("user does not found")
    }
  
    return deletedUser
  }
  async findAllUserByRole(role: string): Promise<IUser[]>{
    return  this.userModel.find({role}).exec()
  }
}
