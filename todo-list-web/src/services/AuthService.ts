/* eslint-disable @typescript-eslint/no-explicit-any */
import { environment } from '@/environment/environment'
import { Login, LoginData } from '@/types/interfaces/Login'
import axiosService from '@/services/interceptors/AxiosService'
import { HttpStatusCode } from 'axios'

export async function signIn(data: Login): Promise<boolean> {
  try {
    const res = await axiosService.post(`${environment.apiUrl}/login`, data)

    if (!res || res.status != HttpStatusCode.Created) {
      return false
    }

    const loginData = res.data

    if (!loginData.user || !loginData.tokens) {
      return false
    }

    localStorage.setItem('user', JSON.stringify(loginData.user))

    saveLoginDataStorage({
      token: loginData.tokens.access_token,
      refreshToken: loginData.tokens.refresh_token,
    })

    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export function signOut() {
  clearAuthenticationData()
}

export function resetPassword(data: any) {
  return axiosService.post(`${environment.apiUrl}/password-reset`, data)
}

export function forgotPassword(data: any) {
  return axiosService.post(`${environment.apiUrl}/password-forgot`, data)
}
export function refreshToken(data: any) {
  return axiosService.post(`${environment.apiUrl}/refresh`, data)
}

export function getToken() {
  const loginDataJson = localStorage.getItem('loginData')

  if (loginDataJson) {
    const refToken = JSON.parse(loginDataJson).token

    return refToken
  }

  return null
}

export function getRefreshToken() {
  const loginDataJson = localStorage.getItem('loginData')

  if (loginDataJson) {
    const refToken = JSON.parse(loginDataJson).refreshToken

    return refToken
  }

  return null
}

export function getManterConectado() {
  return false
}

export function saveLoginDataStorage(loginData: LoginData) {
  localStorage.setItem('loginData', JSON.stringify(loginData))
}

export function clearAuthenticationData() {
  localStorage.removeItem('user')
  localStorage.removeItem('loginData')
}
