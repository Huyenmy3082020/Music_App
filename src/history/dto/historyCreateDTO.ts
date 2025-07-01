import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class HistoryCreateDTO {
  @Field({ nullable: true })
  listenedAt?: Date;

  @Field()
  songId: number;

  @Field({ nullable: true })
  createdAt?: Date;
}
