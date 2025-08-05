"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskForm } from "@/components/task-form"
import { TaskList } from "@/components/task-list"
import { getAllTasks, createTask, updateTask, deleteTask } from "@/lib/api"
import type { Task } from "@/lib/types"

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const fetchTasks = useCallback(async () => {
    try {
      const data = await getAllTasks()
      setTasks(data)
    } catch (error) {
      console.error("Failed to fetch tasks:", error)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const handleAddTask = async (title: string, description: string) => {
    try {
      const newTask = await createTask(title, description)
      setTasks((prevTasks) => [newTask, ...prevTasks])
      setIsFormOpen(false)
    } catch (error) {
      console.error("Failed to add task:", error)
    }
  }

  const handleUpdateTask = async (id: number, title: string, description: string, completed: boolean) => {
    try {
      const updatedTask = await updateTask(id, { title, description, completed })
      setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)))
      setIsFormOpen(false)
      setEditingTask(null)
    } catch (error) {
      console.error("Failed to update task:", error)
    }
  }

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id)
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
    } catch (error) {
      console.error("Failed to delete task:", error)
    }
  }

  const handleToggleComplete = async (task: Task) => {
    try {
      const updatedTask = await updateTask(task.id, { ...task, completed: !task.completed })
      setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? { ...t, completed: updatedTask.completed } : t)))
    } catch (error) {
      console.error("Failed to toggle task completion:", error)
    }
  }

  const handleEditClick = (task: Task) => {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed
    if (filter === "pending") return !task.completed
    return true
  })

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-bold">Task Tracker</CardTitle>
          <Button
            onClick={() => {
              setEditingTask(null)
              setIsFormOpen(true)
            }}
          >
            Add Task
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs
            value={filter}
            onValueChange={(value) => setFilter(value as "all" | "completed" | "pending")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <TaskList
                tasks={filteredTasks}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditClick}
                onDelete={handleDeleteTask}
              />
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <TaskList
                tasks={filteredTasks}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditClick}
                onDelete={handleDeleteTask}
              />
            </TabsContent>
            <TabsContent value="completed" className="mt-4">
              <TaskList
                tasks={filteredTasks}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditClick}
                onDelete={handleDeleteTask}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <TaskForm
            initialTask={editingTask}
            onSave={editingTask ? handleUpdateTask : handleAddTask}
            onCancel={() => {
              setIsFormOpen(false)
              setEditingTask(null)
            }}
          />
        </div>
      )}
    </div>
  )
}
