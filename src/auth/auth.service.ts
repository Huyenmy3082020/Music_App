import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/user/entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenDTO } from './dto/refreshtoken_dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(dto: RegisterUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = this.userRepository.create({
      ...dto,
      password: hashedPassword,
      isActive: true,
      refresh_token: '',
    });

    return await this.userRepository.save(newUser);
  }

  async loginUser(dto: LoginUserDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const tokenPayload = { id: user.id, email: user.email };
    const tokens = await this.generateAccessToken(tokenPayload);


  await this.userRepository.update(user.id, {
      refresh_token: tokens.refreshToken,
    });


    return {
      message: 'Login successful',
      ...tokens,
    };
  }

  async refreshToken(refreshToken :any): Promise<any> {
    let decoded: any;
    try {
      decoded = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.ACCESSTOKEN_KEY_SECERT || '123456',
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.userRepository.findOne({
      where: { id: decoded.id },
    });
    console.log("user",user)
    ;

    if (!user) {
      throw new NotFoundException('User not found or token mismatch');
    }

    const newTokens = await this.generateAccessToken({
      id: user.id,
      email: user.email,
    });

    await this.userRepository.update(user.id, {
      refresh_token: newTokens.refreshToken,
    });

    return newTokens;
  }

  private async generateAccessToken(payload: { id: number; email: string }) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESSTOKEN_KEY_SECERT || '123456',
      expiresIn: '10s',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESSTOKEN_KEY_SECERT || '123456',
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  // Đăng xuất (nếu cần)
  logoutUser(userId: number): string {
    return 'Logout successful';
  }

  // Tìm user theo email
  findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
