import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { History } from './entities/history.entity';
import { HistoryResolver } from './history.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([History]),
  UserModule,
  AuthModule
],
  providers: [HistoryService, HistoryResolver],
  exports: [HistoryService],
})
export class HistoryModule {}
