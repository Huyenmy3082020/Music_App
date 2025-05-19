import {
  Body,
  ConflictException,
  Controller,
  Post,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenDTO } from './dto/refreshtoken_dto';
import { AuthGuard } from './auth.guard';

import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Đăng ký
  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() dto: RegisterUserDto): Promise<{ message: string }> {
    const existingUser = await this.authService.findUserByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    await this.authService.registerUser(dto);
    return { message: 'User registered successfully' };
  }

 @Post('login')
  async loginUser(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) res: Response, 
  ) {
    const { accessToken, refreshToken, message } 
    = await this.authService.loginUser(dto);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false, 
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false, 
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
    return {
      message,
      accessToken, 
      refreshToken
    };
  }

  @Post('refresh_token')
async refreshToken(@Request() req, @Res({ passthrough: true }) res: Response): Promise<any> {
  const refreshToken = req.cookies['refresh_token'];

  console.log("Received refresh_token:", refreshToken);
  if (!refreshToken) {
    throw new UnauthorizedException('Refresh token is missing');
  }

  const result = await this.authService.refreshToken(refreshToken);

  res.cookie('access_token', result.accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 15, 
  });

  return { message: 'Token refreshed successfully' };
}
}
