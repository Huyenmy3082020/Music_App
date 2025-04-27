import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module'; // Nhập khẩu UserModule
import { SessionController } from '../session/session.controller';
import { SessionModule } from '../session/session.module';

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
