import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/updateDTO';
import { LikeService } from 'src/like/like.service';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>,
  //  @Inject(forwardRef(() => LikeService)) private likeService: LikeService,
  )
    { }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

    async findOne(id: number): Promise<User> {
       const user = await this.userRepository.findOne({ where: { id } });
       if (!user) {
           throw new Error(`User with id ${id} not found`);
       }
       return user;
    }

  async updateAvatar(id: number, avatar: string): Promise<UpdateResult> {
    return await this.userRepository.update(id, { avatar });
  }
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
          throw new Error(`User with id ${id} not found`);
      }
      
      return await this.userRepository.update(id, updateUserDto);
  }

  // delete 
  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    await this.userRepository.delete(id);
  }
}