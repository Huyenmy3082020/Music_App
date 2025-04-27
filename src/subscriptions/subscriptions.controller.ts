import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateSubscriptionDto } from './dto/create_subscriptions';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {


    constructor(
        private   readonly subscriptionsService: SubscriptionsService,
    ){}
    @Post('create')
    async createSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto): Promise<any> {
       return await this.subscriptionsService.createSubscription(createSubscriptionDto);
    }
}
