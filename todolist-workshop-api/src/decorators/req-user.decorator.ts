import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

interface CustomRequest extends Request {
  user?: any
}

export const ReqUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<CustomRequest>()

    return request.user
  },
)
