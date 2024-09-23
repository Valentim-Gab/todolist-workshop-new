import { environment } from '@/environment/environment'
import axios from 'axios'
import {
  getManterConectado,
  getRefreshToken,
  getToken,
  refreshToken,
  saveLoginDataStorage,
  signOut,
} from '../AuthService'
import { notifyNegative } from '@/utils/Notify'

const instance = axios.create({
  baseURL: environment.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.config.url.includes('refresh')) {
      notifyNegative('Você foi desconectado por ociosidade')
      signOut()

      return Promise.reject('Refresh Token expired')
    }

    // ERRO ao se conectar com o servidor
    if (error.message.includes('Network Error')) {
      console.error(error.message)

      return
    } else if (!originalRequest._retry) {
      originalRequest._retry = true
      const refToken = getRefreshToken()
      const manterConectado = getManterConectado()

      if (
        refToken &&
        error.response.status === 401 &&
        manterConectado === true
      ) {
        await refreshToken({ token: refToken }).then((resp) => {
          const { accessToken, refreshToken } = resp.data

          saveLoginDataStorage({
            token: accessToken,
            refreshToken,
          })
        })

        return instance(originalRequest)
      } else if (
        !originalRequest.url.includes('login') &&
        getToken() === null
      ) {
        //o user quer acessar uma url sem estar logado.
        return
      } else if (error.response.status === 400) {
        return error.response
      } else if (
        error.response.status === 401 &&
        !originalRequest.url.includes('login')
      ) {
        notifyNegative('Você foi desconectado por ociosidade')
        signOut()

        return
      } else if (error.response.status === 404 && getToken() != null) {
        notifyNegative(error.response.data.error ?? 'Não encontrado')
      } else if (error.response.status === 500 && getToken() != null) {
        if (error.response.data.error)
          notifyNegative(`${error.response.data.error}`)

        return Promise.reject('Not Found')
      }
    }
    return error
  }
)

instance.interceptors.request.use(
  (config) => {
    const token = getToken()

    if (!config.url?.includes('login') && !config.url?.includes('refresh')) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      delete config.headers.Authorization
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
