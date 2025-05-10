import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class HistoryCreateDTO {
  @Field({ nullable: true })
  listenedAt?: Date;

  @Field()
  user: number;

  @Field()
  songId: number;

  @Field({ nullable: true })
  createdAt?: Date;
}
