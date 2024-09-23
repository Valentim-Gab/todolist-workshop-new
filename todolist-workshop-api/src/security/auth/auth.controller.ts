import { Controller, Post, UseGuards, Res, Head } from '@nestjs/common'
import { LocalAuthGuard } from '../guards/local-auth.guard'
import { AuthService } from './auth.service'
import { ReqUser } from 'src/decorators/req-user.decorator'
import { Response } from 'express'
import { UserService } from 'src/routers/user/user.service'
import { Payload } from './auth.interface'
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard'
import { users } from '@prisma/client'
import { Role } from 'src/enums/Role'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { Roles } from 'src/decorators/roles.decorator'

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public login(@Res() res: Response, @ReqUser() user: users) {
    const tokens = this.authService.jwtSign(user)

    res.json({ user, tokens })
  }

  @Post('/refresh')
  @UseGuards(JwtRefreshGuard)
  public async refresh(@Res() res: Response, @ReqUser() payload: Payload) {
    const user = await this.userService.findOne(payload.id)

    this.login(res, user)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Head('/check')
  public check() {
    return
  }
}
