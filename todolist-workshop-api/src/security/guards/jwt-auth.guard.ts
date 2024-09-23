import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthGuard } from '@nestjs/passport'
import * as jwt from 'jsonwebtoken'
import { ErrorConstants } from 'src/constants/error.constant'
import { AuthService } from '../auth/auth.service'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private config: ConfigService,
    private authService: AuthService,
  ) {
    super()
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      let token = this.extractTokenFromAuthHeader(context)

      if (!token) {
        token = this.extractTokenFromCookies(context)

        if (token) {
          const decodedToken = jwt.decode(token, this.config.get('secret'))

          user = {
            id: decodedToken.sub,
            username: decodedToken.username,
            role: decodedToken.role,
          }
        }
      }

      if (token) {
        try {
          jwt.verify(token, this.config.get('secret'))
        } catch (error) {
          if (error instanceof jwt.TokenExpiredError) {
            throw new UnauthorizedException(
              'Sessão expirada',
              ErrorConstants.SESSION_EXPIRED,
            )
          }
          throw new UnauthorizedException(
            'Token inválido',
            ErrorConstants.INVALID_TOKEN,
          )
        }
      } else {
        throw new UnauthorizedException(
          'Não autenticado',
          ErrorConstants.UNAUTHENTICATED,
        )
      }
    }

    return user
  }

  private extractTokenFromAuthHeader(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers.authorization

    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7)
    }

    return null
  }

  private extractTokenFromCookies(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest()

    if (!request || !request.cookies) {
      return null
    }

    const token = request.cookies.access_token ?? null

    return token
  }
}
