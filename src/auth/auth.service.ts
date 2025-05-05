import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDTO } from './dto/refreshtoken_dto';
import { SessionService } from 'src/session/session.service';
@Injectable()
export class AuthService {


    constructor(@InjectRepository(User) private userRepository: Repository<User>,private jwtService: JwtService,
    private sessionService: SessionService) { }
    

    async registerUser(RegisterUserDto: RegisterUserDto): Promise<User> {
        const user = this.userRepository.create(RegisterUserDto); 
        await this.userRepository.save(user);
        return user; 
      }

      async loginUser(LoginUserDto: LoginUserDto): Promise<any> {
        // Tìm người dùng theo email
        const user = await this.userRepository.findOne({ where: { email: LoginUserDto.email } });
        if (!user) {
            return { message: 'User not found' };
        }
    
        // Kiểm tra mật khẩu
        const isPasswordValid = bcrypt.compareSync(LoginUserDto.password, user.password);
        if (!isPasswordValid) {
            return { message: 'Invalid password' };
        }
    
        const createdAt = new Date();
        const expiresAt = new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000); // Hết hạn sau 7 ngày
    
        const data = await this.generateAccessToken({ id: user.id, email: user.email });
    
        const sessionData = {
            userId: user.id,
            refreshToken: data.refreshToken,  // Lấy refreshToken từ data
            deviceInfo: LoginUserDto.deviceInfo,  // Nhận thông tin thiết bị từ LoginUserDto
            createdAt: createdAt,
            expiresAt: expiresAt,
            isActive: true,
        };
    
        await this.sessionService.createSession(sessionData);
    
        return { message: 'Login successful', ...data ,sessionData}; 
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
    findUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }
    
}
