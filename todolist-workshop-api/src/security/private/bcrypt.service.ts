import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class BCryptService {
  async encrypt(decrypted: string): Promise<string> {
    const saltOrRounds = 10

    return bcrypt.hash(decrypted, saltOrRounds)
  }

  async validate(hash: string, encrypted: string) {
    return await bcrypt.compare(encrypted, hash)
  }
}
