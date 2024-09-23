export interface Login {
  username: string
  password: string
  roles?: string[]
}

export interface LoginData {
  token: string
  refreshToken?: string
}
