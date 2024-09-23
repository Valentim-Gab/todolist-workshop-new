import { Test, TestingModule } from '@nestjs/testing'
import { TodolistService } from './todolist.service'

describe('TodolistService', () => {
  let service: TodolistService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodolistService],
    }).compile()

    service = module.get<TodolistService>(TodolistService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
