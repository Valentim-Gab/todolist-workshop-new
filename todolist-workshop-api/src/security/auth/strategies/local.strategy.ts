import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(login: string, password: string) {
    const user = await this.authService.validateUser(login, password)

    if (!user) {
      throw new UnauthorizedException('Email ou senha incorretos')
    }

    return user
  }
}
