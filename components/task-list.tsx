import { TaskItem } from "@/components/task-item"
import type { Task } from "@/lib/types"
import { Card } from "@/components/ui/card"

interface TaskListProps {
  tasks: Task[]
  onToggleComplete: (task: Task) => void
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
}

export function TaskList({ tasks, onToggleComplete, onEdit, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No tasks found for this filter.</p>
  }

  return (
    <Card className="divide-y divide-border">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggleComplete={onToggleComplete} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </Card>
  )
}
