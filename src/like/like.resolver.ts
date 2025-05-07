import { Like } from './entities/like.entity';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { LikeRes } from './dto/like';

@Resolver(() => Like)
export class LikeResolver {
    constructor (
        private readonly likeServie :LikeService
    ){

    }
    @Query(() => [LikeRes])
    async getAllLikes(): Promise<Like[]> {
      return this.likeServie.findAll();
    }
}
