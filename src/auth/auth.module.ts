import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { SessionController } from '../session/session.controller';
import { SessionModule } from '../session/session.module';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.ACCESSTOKEN_KEY_SECERT || '123456',
      signOptions: { expiresIn: '60d' },
    }),
    SessionModule,
  ],
  controllers: [AuthController, SessionController],
  providers: [AuthService],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
