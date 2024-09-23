import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common'
import { TodolistService } from './todolist.service'
import { CreateTodolistDto } from './dto/create-todolist.dto'
import { UpdateTodolistDto } from './dto/update-todolist.dto'
import { Roles } from 'src/decorators/roles.decorator'
import { Role } from 'src/enums/Role'
import { JwtAuthGuard } from 'src/security/guards/jwt-auth.guard'
import { RolesGuard } from 'src/security/guards/roles.guard'
import { ReqUser } from 'src/decorators/req-user.decorator'
import { users } from '@prisma/client'

@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Post()
  create(
    @Body(new ValidationPipe()) createTodolistDto: CreateTodolistDto,
    @ReqUser() user: users,
  ) {
    return this.todolistService.create(createTodolistDto, user.id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Get()
  findAll(@ReqUser() user: users) {
    return this.todolistService.findAll(user.id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodolistDto: UpdateTodolistDto,
    @ReqUser() user: users,
  ) {
    return this.todolistService.update(id, updateTodolistDto, user.id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @ReqUser() user: users) {
    return this.todolistService.remove(id, user.id)
  }
}
