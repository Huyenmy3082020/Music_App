import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Like } from './entities/like.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LikeService {
    constructor(
        @InjectRepository(Like) private likeRepository: Repository<Like>, // Missing comma fixed
        // @Inject(forwardRef(() => UserService)) private userService: UserService, // Fixed decorator usage
    ) {}

    async createLike(likeCreateDto: any, userId: number) {
        const like = this.likeRepository.create({
            ...likeCreateDto,
            user_id: userId,
        });
        return await this.likeRepository.save(like); // Simplified this part
    }

    async getLike(userId: number): Promise<Like[]> {
        return await this.likeRepository.find({
            where: {userId : userId },
            relations: ['user'], // Assuming 'user' relation is set up correctly
        });
    }
}
