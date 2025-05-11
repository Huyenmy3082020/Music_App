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
import { GqlExecutionContext, GqlContextType } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);
    const token = this.extractTokenFromCookie(request); // Lấy token từ cookie
    if (!token) {
      console.log('No token provided in cookies.');
      throw new UnauthorizedException('No token provided');
    }
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.ACCESSTOKEN_KEY_SECRET || '123456',
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
      console.log('Token verification error:', err.message || err);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private getRequest(context: ExecutionContext): Request {
    if (context.getType<GqlContextType>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      return gqlContext.getContext().req;
    }
    return context.switchToHttp().getRequest();
  }

  private extractTokenFromCookie(request: Request): string | null {
    const token = request.cookies?.['access_token']; 
    return token || null;
  }
}
