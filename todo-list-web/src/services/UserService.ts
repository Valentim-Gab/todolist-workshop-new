import { environment } from '@/environment/environment'
import { User } from '@/types/interfaces/User'
import { HttpStatusCode } from 'axios'
import axiosService from '@/services/interceptors/AxiosService'

export function getStoredUser(): { id: number; nome: string } | null {
  const user = localStorage.getItem('userInfo')

  if (!user) {
    return null
  }

  return JSON.parse(user)
}

export async function getAllUsers(): Promise<User[] | null> {
  const url = `${environment.apiUrl}/user`

  try {
    const res = await axiosService.get(url)

    if (!res || !res.status || res.status !== HttpStatusCode.Ok) {
      return null
    }

    return res.data
  } catch (error) {
    console.error(error)

    return null
  }
}

export async function getAllUsersMock(): Promise<User[] | null> {
  try {
    const data = [
      {
        name: 'Usuário 1',
        dtInscricao: '01/01/2021',
        year_birth: 1990,
        active: true,
      },
      {
        name: 'Usuário 2',
        dtInscricao: '02/01/2021',
        year_birth: 1991,
        active: true,
      },
      {
        name: 'Usuário 3',
        dtInscricao: '03/01/2021',
        year_birth: 1992,
        active: false,
      },
      {
        name: 'Usuário 4',
        dtInscricao: '04/01/2021',
        year_birth: 1993,
        active: true,
      },
      {
        name: 'Usuário 5',
        dtInscricao: '05/01/2021',
        year_birth: 1994,
        active: false,
      },
      {
        name: 'Usuário 6',
        dtInscricao: '06/01/2021',
        year_birth: 1995,
        active: true,
      },
      {
        name: 'Usuário 7',
        dtInscricao: '07/01/2021',
        year_birth: 1996,
        active: false,
      },
      {
        name: 'Usuário 8',
        dtInscricao: '08/01/2021',
        year_birth: 1997,
        active: true,
      },
    ]

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data)
      }, 1000) // atraso de 1 segundo
    })
  } catch (error) {
    console.error(error)
    return null
  }
}
