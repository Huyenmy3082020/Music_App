import {
  Body,
  ConflictException,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenDTO } from './dto/refreshtoken_dto';
import { AuthGuard } from './auth.guard';

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
  async login(@Body() dto: LoginUserDto): Promise<any> {
    return await this.authService.loginUser(dto);
  }

  // Làm mới access token từ refresh token
  @UseGuards(AuthGuard)
  @Post('refresh_token')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async refreshToken(@Body() dto: RefreshTokenDTO): Promise<any> {
    return await this.authService.refreshToken(dto);
  }
}
