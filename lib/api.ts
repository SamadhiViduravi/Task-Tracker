import axios from "axios"
import type { Task } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/tasks"

const api = axios.create({
  baseURL: API_BASE_URL,
})

export const getAllTasks = async (): Promise<Task[]> => {
  const response = await api.get("/")
  return response.data
}

export const createTask = async (title: string, description: string): Promise<Task> => {
  const response = await api.post("/", { title, description })
  return response.data
}

export const updateTask = async (id: number, data: Partial<Task>): Promise<Task> => {
  const response = await api.put(`/${id}`, data)
  return response.data
}

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/${id}`)
}
