import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private sub: Repository<Subscription>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async createSubscription(createSubscriptionDto: any) {
    const subscription = this.sub.create(createSubscriptionDto);
    return await this.sub.save(subscription);
  }
  async RegisterSubscription(idSub: number, userId: number) {
    const subscription = await this.sub.findOne({
      where: { id: Number(idSub) },
    });
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    subscription.user = user;

    return await this.sub.save(subscription);
  }
}
