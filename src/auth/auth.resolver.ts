import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Auth } from 'typeorm';
import { AuthService } from './auth.service';
import { Body, Query, Res } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { LoginResponseDto } from './dto/login-response.dto';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService
    ){
    }

@Mutation(() => LoginResponseDto)
async loginUser(
  @Args('dto') dto: LoginUserDto,
  @Context() context
): Promise<LoginResponseDto> {
  try {
    const { accessToken, refreshToken, message, role } = await this.authService.loginUser(dto);

    const res = context.res;
    if (!res) {
      throw new Error('Response object (res) not found in GraphQL context');
    }

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

    return { message, accessToken, refreshToken,role };
  } catch (error) {
    console.error('Error in loginUser mutation:', error);
    throw error; 
  }
}


    
}
