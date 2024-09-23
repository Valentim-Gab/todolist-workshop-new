export interface JwtSign {
  access_token?: string
  refresh_token?: string
  token?: string
  expires?: number
}

export interface JwtPayload {
  sub: number
  username: string
  role: string[]
}

export interface Payload {
  id: number
  username: string
  role: string[]
}
