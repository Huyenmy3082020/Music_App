import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { User } from 'src/user/entities/user.entity';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
      private jwtService: JwtService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const token = this.extractTokenFromHeader(request);
  
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }
  
      try {
        const decoded = this.jwtService.verify(token, {
          secret: process.env.ACCESSTOKEN_KEY_SECERT ||'123456', 
        });
  
        const user = await this.userRepository.findOne({
          where: { id: decoded.id },
        });
  
        if (!user) {
          throw new UnauthorizedException('User not found');
        }
  
        request['user_data'] = user; 
        
        return true;
      } catch (err) {
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
    private extractTokenFromHeader(request: Request): string | null {
      const authHeader = request.get('Authorization');
      
      
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        console.log('authHeader', token);  // Kiểm tra token đã lấy đúng chưa
        return token;
      }
      return null;  // Nếu không có token hoặc header không hợp lệ
    }
    
  }
  @Injectable()
  export class AdminGuard implements CanActivate {
    constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
      private jwtService: JwtService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const token = this.extractTokenFromHeader(request);
  
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }
  
      try {
        const decoded = this.jwtService.verify(token, {
          secret: process.env.ACCESSTOKEN_KEY_SECERT ||'123456', 
        });
  
        const user = await this.userRepository.findOne({
          where: { id: decoded.id ,
            role: 'admin' 
          },
        });
  
        if (!user) {
          throw new UnauthorizedException('User not found');
        }
  
        request['user_data'] = user; 
        
        return true;
      } catch (err) {
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
    private extractTokenFromHeader(request: Request): string | null {
      const authHeader = request.get('Authorization');
      
      
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        console.log('authHeader', token);  // Kiểm tra token đã lấy đúng chưa
        return token;
      }
      return null;  // Nếu không có token hoặc header không hợp lệ
    }
    
  }