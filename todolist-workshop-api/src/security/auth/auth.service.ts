import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { users } from '@prisma/client'
import { UserService } from 'src/routers/user/user.service'
import { BCryptService } from '../private/bcrypt.service'
import { JwtPayload, JwtSign } from './auth.interface'
import { ConfigService } from '@nestjs/config'
import { AuthConstants } from 'src/constants/auth.constant'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private bcrypt: BCryptService,
    private config: ConfigService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByLogin(username)

    if (user && (await this.bcrypt.validate(user.password, pass))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user

      return result
    }

    return null
  }

  public jwtSign(data: users): JwtSign {
    const payload: JwtPayload = {
      sub: data.id,
      username: data.login,
      role: data.role,
    }

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.getRefreshToken(payload.sub),
    }
  }

  private getRefreshToken(sub: number): string {
    return this.jwtService.sign(
      { sub },
      {
        secret: this.config.get('refreshSecret'),
        expiresIn: AuthConstants.REFRESH_TOKEN_EXPIRES,
      },
    )
  }
}
