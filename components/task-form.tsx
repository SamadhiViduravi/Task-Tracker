"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Task } from "@/lib/types"

interface TaskFormProps {
  initialTask?: Task | null
  onSave: (id: number | undefined, title: string, description: string, completed: boolean) => void
  onCancel: () => void
}

export function TaskForm({ initialTask, onSave, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title || "")
  const [description, setDescription] = useState(initialTask?.description || "")
  const [completed, setCompleted] = useState(initialTask?.completed || false)

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title)
      setDescription(initialTask.description || "")
      setCompleted(initialTask.completed)
    } else {
      setTitle("")
      setDescription("")
      setCompleted(false)
    }
  }, [initialTask])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      alert("Task title cannot be empty.")
      return
    }
    onSave(initialTask?.id, title, description, completed)
  }

  return (
    <Card className="w-full max-w-md p-4">
      <CardHeader>
        <CardTitle>{initialTask ? "Edit Task" : "Add New Task"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description (Optional)
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
            />
          </div>
          {initialTask && (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="completed"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="completed" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Mark as Completed
              </label>
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">{initialTask ? "Update Task" : "Add Task"}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
