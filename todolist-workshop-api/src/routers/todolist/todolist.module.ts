import { Module } from '@nestjs/common'
import { TodolistService } from './todolist.service'
import { TodolistController } from './todolist.controller'
import { BCryptService } from 'src/security/private/bcrypt.service'
import { PrismaService } from 'nestjs-prisma'

@Module({
  controllers: [TodolistController],
  providers: [TodolistService, BCryptService, PrismaService],
})
export class TodolistModule {}
