import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateLoginDto } from './dto/createLogin.dto';
import * as argon2 from 'argon2'
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private configService: ConfigService,
        private jwtService: JwtService,
        private mailerService:MailerService

    ){}

    async signIn(CreateLoginDto : CreateLoginDto){
        const user=await this.usersService.findUserByEmail(CreateLoginDto.email)
        if(!user){
            throw new BadRequestException("User does not exist")
        }

        const passwordMatches=await argon2.verify(user.password, CreateLoginDto.password)

        if(!passwordMatches){
            throw new BadRequestException("Password incorrect")
        }
        //generer un token
        const token=await this.getToken(user._id, user.email)
        await this.updateRefresh(user._id , token.refreshToken)
        return{token, user}


    }

    async getToken(userId: string, email: string){
        const [accessToken , refreshToken]=await Promise.all([
            this.jwtService.signAsync({
                sub:userId,
                email
            },
            {
                secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
                expiresIn:'15m'
            }
            ),
            this.jwtService.signAsync({
                sub: userId,
                email
            },
            {
               secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
               expiresIn:"15d"
            })
          
        ])
        return{accessToken , refreshToken}
    } 
    async updateRefresh(userId:string, refreshToken:string){
        const hashedRefresh=await argon2.hash(refreshToken)
        await this.usersService.updateUser(userId,
            {
                refreshToken:hashedRefresh
        })
    }

    async refreshToken(userId:string, refreshToken:string){
        const user=await this.usersService.findOneUser(userId)
        if(!user || !user.refreshToken){
            throw new ForbiddenException("Access denid")
        }
        const refreshTokenMatches=await argon2.verify(user.refreshToken , refreshToken)
        if(!refreshTokenMatches){
            throw new ForbiddenException("Access denied")
        }
        const token=await this.getToken(user._id , user.email)
        await this.updateRefresh(user._id , token.refreshToken)
        return (token)


    }
    async logout(userId: string){
        return this.usersService.updateUser(userId, {refreshToken:null})
    }

    async updatePassword(userId:string , UpdateUserDto :UpdateUserDto){
        const oneuser= await this.usersService.findOneUser(userId)
        if(!oneuser) throw new NotFoundException("user not found")
        const hashedPassword=await argon2.hash(UpdateUserDto.password)
    const user=  await this.usersService.updateUser(userId ,{
        ...UpdateUserDto,
        password:hashedPassword
    })
    const token=await this.getToken(oneuser._id, oneuser.email)
    return {user, token}

    }
    async updateProfile(userId:string, updateUserDto: UpdateUserDto){
        const user =await this.usersService.updateUser(userId, updateUserDto)
        const token=await this.getToken(user._id, user.email)
        return {user, token}
    }

    async resetPassword(user:any, tokenpassword:string){
        const newPassword=tokenpassword
        await this.mailerService.sendMail({
            to:user.email,
            template:"./resetPassword",
            context:{
                name:user.fullName,
                email:user.email,
                newPassword,
                subject:"Rest Password"
            }
        })
        console.log(`new password============>${newPassword}`);
        const handlebarsPassword=await argon2.hash(newPassword)
        await this.usersService.findOneUserAndRestPassword({email:user.email},
            {password:handlebarsPassword})
    }


}