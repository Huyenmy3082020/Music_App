import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { HistoryService } from './history.service';
import { History } from './entities/history.entity';
import { HistoryCreateDTO } from './dto/historyCreateDTO';
import { Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver()
export class HistoryResolver {

      constructor(private historyservice: HistoryService) { 

    }
    @UseGuards(AuthGuard)
@Mutation(() => History)
async createHistory(
  @Args('historydto') historyData: HistoryCreateDTO,
  @Context() context: any, 
) {
  const userId = context.req.user_data?.id;
  return await this.historyservice.creatHistory(historyData, userId);
}

}
