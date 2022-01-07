import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString({ message: 'precisa ser um texto' })
  name: string;

  @Field()
  @IsEmail({}, { message: 'precisa ser um email válido' })
  email: string;
}
