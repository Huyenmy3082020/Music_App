import { Body, ConflictException, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';
import {  RefreshTokenDTO } from './dto/refreshtoken_dto';
import { AuthGuard } from './auth.guard';
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() RegisterUserDto:RegisterUserDto ):Promise<void> {
        const hasspassword = this.hasspassword(RegisterUserDto.password);
        RegisterUserDto.password = hasspassword;
        const user = await this.authService.findUserByEmail(RegisterUserDto.email);
        if (user) {
            throw new ConflictException('User with this email already exists');
        }
    
      await this.authService.registerUser({...RegisterUserDto, password: hasspassword,refresh_token:"refresh_token", isActive:true});
    }

    private  hasspassword = (password: string): string => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);

    }
   
    @Post('login')
    async login(@Body() LoginUserDto: LoginUserDto): Promise<any> {
      try {
      
        const data = await this.authService.loginUser(LoginUserDto);
        return data; // Trả về kết quả
      } catch (error) {
        return { message: 'Error occurred during login', error: error.message };
      }
    }

     @UseGuards(AuthGuard)
    @Post('refresh_token')
    refresh_token(@Body() RefreshToken:RefreshTokenDTO ):Promise<any> {
     const data =    this.authService.refreshToken(RefreshToken)
     return data
    }
}
