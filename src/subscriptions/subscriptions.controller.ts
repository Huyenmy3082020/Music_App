import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CreateSubscriptionDto } from './dto/create_subscriptions';
import { SubscriptionsService } from './subscriptions.service';
import { RegisterSubscriptionDto } from './dto/RegisterSubscriptionDto';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}
  @UseGuards(AuthGuard)
  @Post('create')
  async createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<any> {
    return await this.subscriptionsService.createSubscription(
      createSubscriptionDto,
    );
  }

  @UseGuards(AuthGuard)
  @Post('RegisterSubscription')
  async RegisterSubscription(
    @Body() body: RegisterSubscriptionDto,
    @Req() req: any,
  ) {
    const userId = req.user_data.id;
    return await this.subscriptionsService.RegisterSubscription(
      body.idSub,
      userId,
    );
  }
}
