import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { Like } from './entities/like.entity';
import { UserModule } from 'src/user/user.module';
import { SongsModule } from 'src/songs/songs.module';
import { AuthModule } from 'src/auth/auth.module';  // Nhập khẩu AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Like]),
    UserModule,
  AuthModule
  ],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule {}
