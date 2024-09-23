import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { PrismaService } from 'nestjs-prisma'
import { BCryptService } from 'src/security/private/bcrypt.service'
import { users } from '@prisma/client'
import { Role } from 'src/enums/Role'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaUtil } from 'src/utils/prisma.util'

@Injectable()
export class UserService {
  private selectedColumns = {
    id: true,
    name: true,
    role: true,
  }

  constructor(
    private prisma: PrismaService,
    private bcrypt: BCryptService,
    private prismaUtil: PrismaUtil,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.prismaUtil.performOperation(
      'Não foi possível cadastrar usuário',
      async () => {
        const encryptPassword = await this.bcrypt.encrypt(
          createUserDto.password,
        )

        const userDto = {
          ...createUserDto,
          password: encryptPassword,
          role: [Role.User],
        }

        return this.prisma.users.create({
          data: userDto,
          select: this.selectedColumns,
        })
      },
    )
  }

  async findAll(): Promise<users[]> {
    return this.prismaUtil.performOperation(
      'Não foi possível buscar pelos usuários',
      async () => {
        return await this.prisma.users.findMany({
          select: this.selectedColumns,
        })
      },
    )
  }

  async findOne(idUser: number) {
    return this.prismaUtil.performOperation(
      'Não foi possível buscar pelo usuário',
      async () => {
        return this.prisma.users.findFirst({
          where: { id: idUser },
          select: this.selectedColumns,
        })
      },
    )
  }

  findByLogin(login: string) {
    return this.prismaUtil.performOperation(
      'Não foi possível buscar pelo usuário',
      async () => {
        return this.prisma.users.findFirst({ where: { login } })
      },
    )
  }

  async update(idUser: number, updateUserDto: UpdateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = updateUserDto

    return this.prismaUtil.performOperation(
      'Não foi porrível atualizar o usuário',

      async () => {
        return this.prisma.users.update({
          where: { id: idUser },
          data: user,
          select: this.selectedColumns,
        })
      },
    )
  }

  async updatePassword(idUser: number, password: string) {
    return this.prismaUtil.performOperation(
      'Não foi possível atualizar a senha do usuário',
      async () => {
        const encryptPassword = await this.bcrypt.encrypt(password)

        return this.prisma.users.update({
          where: { id: idUser },
          data: { password: encryptPassword },
          select: this.selectedColumns,
        })
      },
    )
  }

  async delete(userId: number) {
    return this.prismaUtil.performOperation(
      'Não foi possível deletar o usuário',
      async () => {
        return this.prisma.users.delete({
          where: { id: userId },
          select: this.selectedColumns,
        })
      },
    )
  }
}
