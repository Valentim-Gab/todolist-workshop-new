import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload, Payload } from '../auth.interface'
import { ConfigService } from '@nestjs/config'

@Injectable()
export default class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: config.get('refreshSecret'),
    })
  }

  public validate(payload: JwtPayload): Payload {
    return {
      id: payload.sub,
      username: payload.username,
      role: payload.role,
    }
  }
}
