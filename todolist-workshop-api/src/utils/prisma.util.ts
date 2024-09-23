import { BadRequestException, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { ErrorConstants } from 'src/constants/error.constant'

@Injectable()
export class PrismaUtil {
  constructor(private prisma: PrismaService) {}

  public async performOperation(
    errorMessage: string,
    operation: () => Promise<any>,
  ) {
    try {
      return await this.prisma.$transaction(async () => {
        return await operation()
      })
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === ErrorConstants.UNIQUE_VIOLATED
      ) {
        const uniqueColumn = error.meta.target[0].toUpperCase()

        throw new BadRequestException(`Campo ${uniqueColumn} em uso`)
      }

      console.error(error)

      throw new BadRequestException(errorMessage)
    }
  }
}
