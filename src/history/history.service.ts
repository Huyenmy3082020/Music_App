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
    async creatHistory(historydto: any, userId: number) {
        const history = this.historyRepository.create({
            ...historydto,
            user_id: userId,
        });
        return await this.historyRepository.save(history); // Simplified this part
    }
    
    
}
