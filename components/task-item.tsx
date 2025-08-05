"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Task } from "@/lib/types"
import { cn } from "@/lib/utils"

interface TaskItemProps {
  task: Task
  onToggleComplete: (task: Task) => void
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
}

export function TaskItem({ task, onToggleComplete, onEdit, onDelete }: TaskItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b last:border-b-0">
      <div className="flex items-center space-x-3">
        <Checkbox
          id={`task-${task.id}`}
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task)}
          aria-label={`Mark task "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
        />
        <div className="grid gap-1">
          <label
            htmlFor={`task-${task.id}`}
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              task.completed && "line-through text-muted-foreground",
            )}
          >
            {task.title}
          </label>
          {task.description && (
            <p className={cn("text-sm text-muted-foreground", task.completed && "line-through")}>{task.description}</p>
          )}
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Task actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(task)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(task.id)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
