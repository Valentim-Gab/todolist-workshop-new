export interface User {
  name: string
  year_birth: number
  active: boolean
  wishes?: string[]
  banks?: Array<{ label: string }>
  dtInscricao?: string
}

export interface UserStore extends User {
  id: number
}
