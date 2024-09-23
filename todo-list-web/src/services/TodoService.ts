import { environment } from '@/environment/environment'
import { Task } from '@/types/interfaces/Task'
import axiosService from './interceptors/AxiosService'
import { HttpStatusCode } from 'axios'

export async function getAllTasks(): Promise<Task[] | null> {
  try {
    const baseUrl = `${environment.apiUrl}/todolist`
    const res = await axiosService.get(baseUrl)

    if (!res || res.status !== HttpStatusCode.Ok) {
      return null
    }

    const data = res.data

    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function addTask(task: Task): Promise<boolean | null> {
  try {
    const baseUrl = `${environment.apiUrl}/todolist`
    const res = await axiosService.post(baseUrl, task)

    if (!res || res.status != HttpStatusCode.Created) {
      return false
    }

    return true
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function updateTask(task: Task): Promise<boolean | null> {
  try {
    const baseUrl = `${environment.apiUrl}/todolist/${task.id_task}`
    const res = await axiosService.patch(baseUrl, task)

    if (!res || res.status != HttpStatusCode.Ok) {
      return false
    }

    return true
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function deleteTask(id: number): Promise<boolean | null> {
  try {
    const baseUrl = `${environment.apiUrl}/todolist/${id}`
    const res = await axiosService.delete(baseUrl)

    if (!res || res.status != HttpStatusCode.Ok) {
      return false
    }

    return true
  } catch (error) {
    console.error(error)
    return null
  }
}
