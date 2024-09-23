import { IsNotEmpty, IsString } from 'class-validator'

export class CreateTodolistDto {
  @IsString()
  @IsNotEmpty()
  name_task: string
}
