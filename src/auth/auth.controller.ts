import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateLoginDto } from './dto/createLogin.dto';
import { Request } from 'express';
import { RefreshTokenGuard } from 'src/guards/refreshToken.guard';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CreateEmailDto } from './dto/creatResetPassword.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}



  @Post("signin")
  signIn(@Body() createLoginDto :CreateLoginDto){
    return this.authService.signIn(createLoginDto)
  }


  @ApiBearerAuth('refresh-token')
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshToken(@Req() req:Request){
    const userId=req.user['sub']

    const refreshToken=req.user['refreshToken']
    return this.authService.refreshToken(userId, refreshToken)
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout (@Req() req: Request){
    this.authService.logout(req.user['sub'])
  }

  
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Patch("updatepassword/:id")
  async newPassword(@Body() updateUserDto:UpdateUserDto, @Param('id') id:string){
    await this.authService.updatePassword(id, updateUserDto )

  }
  
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Patch('/updateprofile/:id')
  async updateprofile(@Body() UpdateUserDto: UpdateUserDto, @Param('id') id:string){
   const {user, token}= await this.authService.updateProfile(id, UpdateUserDto)
   return {user, token}
  }

  @Post('/resetpassword')
  async resetPassword(@Body() createEmailDto: CreateEmailDto){
    const tokenpassword=Math.floor(111000000+Math.random()*987654321).toString()
    const user={email:createEmailDto.email}
    await this.authService.resetPassword(user, tokenpassword)
  }
}

