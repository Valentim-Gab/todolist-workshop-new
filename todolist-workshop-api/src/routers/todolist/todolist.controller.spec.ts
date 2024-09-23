import { Test, TestingModule } from '@nestjs/testing'
import { TodolistController } from './todolist.controller'
import { TodolistService } from './todolist.service'

describe('TodolistController', () => {
  let controller: TodolistController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodolistController],
      providers: [TodolistService],
    }).compile()

    controller = module.get<TodolistController>(TodolistController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
