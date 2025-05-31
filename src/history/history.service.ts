import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { HistoryCreateDTO } from './dto/historyCreateDTO';
import { History } from './entities/history.entity';

@Injectable()
export class HistoryService {
    constructor(
        @InjectRepository(History) private historyRepository: Repository<History>, // Fixed decorator usage
        // @Inject(forwardRef(() => UserService)) private userService: UserService, 
    ) {}
  async createHistory(historydto: HistoryCreateDTO, userId: number) {
  const history = this.historyRepository.create({
    listenedAt: historydto.listenedAt,
    createdAt: historydto.createdAt ?? new Date(), // nếu cần
    song: { id: historydto.songId },               // 👈 ánh xạ relation
    user: { id: userId },                          // 👈 ánh xạ relation
  });
  return await this.historyRepository.save(history);
}

    async getHistoryUser(userId: number) {
        return await this.historyRepository.find({
            where: { id: userId },
        });
    }
    async getHistoryTop(userId: number) {
        return await this.historyRepository.find({
            where: { id: userId },
            order: { playCounts: 'DESC' }, 
            take: 10, 
        });
    }
    
}
