import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDTO } from './dto/refreshtoken_dto';
@Injectable()
export class AuthService {


    constructor(@InjectRepository(User) private userRepository: Repository<User>,private jwtService: JwtService) { }
    

    async registerUser(RegisterUserDto: RegisterUserDto): Promise<User> {
        const user = this.userRepository.create(RegisterUserDto); 
        await this.userRepository.save(user);
        return user; 
      }

   async loginUser(LoginUserDto:LoginUserDto):Promise<any> {
      const user = await this.userRepository.findOne({ where: { email: LoginUserDto.email } });
      if (!user) {
            return { message: 'User not found' };
      }
        const isPasswordValid =bcrypt.compareSync(LoginUserDto.password, user.password);
        if (!isPasswordValid) {
            return { message: 'Invalid password' };
        }
       const data =  this.generateAccessToken({id:user.id, email:user.email});
       return data;
    }   

    async refreshToken(RefreshToken: RefreshTokenDTO): Promise<any> {
        const verifyToken = await this.jwtService.verifyAsync(RefreshToken.refresh_token,{
            secret:process.env.REFRESHTOKEN_KEY_SECERT|| '123456', 
        });
        if (!verifyToken) {
            return { message: 'Invalid refresh token' };
        }
        const user = await this.userRepository.findOne({ where: { id: verifyToken.id } });
        if (!user) {
            return { message: 'User not found' };
        }
       const token = this.generateAccessToken({id:user.id, email:user.email});   
       return token;
    }
    private async generateAccessToken(payload: { id: number; email: string }) {
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {secret:process.env.ACCESSTOKEN_KEY_SECERT || 
        '123456', expiresIn: '7d' });
      
        await this.userRepository.update({ id: payload.id }, { refresh_token: refreshToken });
      
        return { accessToken, refreshToken };
      }
      
    logoutUser(userId: number): string {
        return 'Logout successful!';
    }
}
