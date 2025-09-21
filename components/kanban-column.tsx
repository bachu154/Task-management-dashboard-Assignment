import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TaskCard } from "./task-card"
import type { Task } from "@/lib/store"

interface KanbanColumnProps {
  title: string
  status: Task["status"]
  tasks: Task[]
  count: number
}

const statusColors = {
  todo: "bg-muted text-muted-foreground",
  inprogress: "bg-chart-3 text-chart-3-foreground",
  done: "bg-chart-2 text-chart-2-foreground",
}

export function KanbanColumn({ title, status, tasks, count }: KanbanColumnProps) {
  return (
    <div className="flex flex-col h-full">
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between text-sm font-medium">
            <span>{title}</span>
            <Badge variant="secondary" className={`text-xs ${statusColors[status]}`}>
              {count}
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="flex-1 mt-4 space-y-3 min-h-[400px]">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}

        {tasks.length === 0 && (
          <Card className="border-dashed border-border/50">
            <CardContent className="flex items-center justify-center py-8">
              <p className="text-sm text-muted-foreground">No tasks</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
