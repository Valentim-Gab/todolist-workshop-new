import { Injectable } from '@nestjs/common'
import { CreateTodolistDto } from './dto/create-todolist.dto'
import { UpdateTodolistDto } from './dto/update-todolist.dto'
import { PrismaService } from 'nestjs-prisma'
import { BCryptService } from 'src/security/private/bcrypt.service'

@Injectable()
export class TodolistService {
  constructor(
    private prismaService: PrismaService,
    private bcrypt: BCryptService,
  ) {}

  create(createTodolistDto: CreateTodolistDto, userId: number) {
    const data = {
      ...createTodolistDto,
      id_user: userId,
    }

    return this.prismaService.todolist.create({
      data: data,
    })
  }

  findAll(userId: number) {
    return this.prismaService.todolist.findMany({
      where: { id_user: userId },
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} todolist`
  }

  update(id: number, updateTodolistDto: UpdateTodolistDto, userId: number) {
    return this.prismaService.todolist.update({
      data: updateTodolistDto,
      where: { id_task: id, AND: { id_user: userId } },
    })
  }

  remove(id: number, userId: number) {
    return this.prismaService.todolist.delete({
      where: { id_task: id, AND: { id_user: userId } },
    })
  }
}
