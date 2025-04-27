import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
      @InjectRepository(Subscription)
      private sub: Repository<Subscription>,
    
    ) {}
    async createSubscription(createSubscriptionDto: any){
        const subscription = this.sub.create(createSubscriptionDto);
        return await this.sub.save(subscription);
    }
}
