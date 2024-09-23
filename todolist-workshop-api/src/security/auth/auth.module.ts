import { Global, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from 'src/routers/user/user.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { BCryptService } from '../private/bcrypt.service'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import JwtRefreshStrategy from './strategies/jwt-refresh.stratey'
import { ConfigService } from '@nestjs/config'
import { AuthConstants } from 'src/constants/auth.constant'

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('secret'),
        signOptions: { expiresIn: AuthConstants.ACCESS_TOKEN_EXPIRES },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    BCryptService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
