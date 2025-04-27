import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { History } from './entities/history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([History]),
  UserModule,
  AuthModule
],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
