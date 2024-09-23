import { PartialType } from '@nestjs/mapped-types'
import { CreateTodolistDto } from './create-todolist.dto'

export class UpdateTodolistDto extends PartialType(CreateTodolistDto) {}
