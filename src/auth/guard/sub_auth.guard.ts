import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';

@Injectable()
export class SubAuthGuard implements CanActivate {
  constructor(
    @InjectRepository(Subscription)
    private readonly subRepo: Repository<Subscription>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user_data.id;

    const subscription = await this.subRepo.findOne({
      where: { user: { id: userId }, subscription_type: 'premium' },
    });

    if (!subscription) {
      throw new ForbiddenException('Chỉ user Premium mới được tạo playlist.');
    }

    return true;
  }
}
