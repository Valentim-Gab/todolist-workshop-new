import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { PrismaService } from 'nestjs-prisma'
import { BCryptService } from 'src/security/private/bcrypt.service'
import { PrismaUtil } from 'src/utils/prisma.util'

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, BCryptService, PrismaUtil],
  exports: [UserService],
})
export class UserModule {}
