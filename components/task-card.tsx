"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Calendar, Tag, AlertCircle, Trash2 } from "lucide-react"
import type { Task } from "@/lib/store"
import { useAppDispatch } from "@/lib/hooks"
import { moveTask, deleteTask } from "@/lib/store"

interface TaskCardProps {
  task: Task
}

const priorityColors = {
  low: "bg-chart-2 text-chart-2-foreground",
  medium: "bg-chart-3 text-chart-3-foreground",
  high: "bg-destructive text-destructive-foreground",
}

const categoryColors = {
  development: "bg-chart-1 text-chart-1-foreground",
  design: "bg-chart-4 text-chart-4-foreground",
  testing: "bg-chart-5 text-chart-5-foreground",
  bug: "bg-destructive text-destructive-foreground",
}

export function TaskCard({ task }: TaskCardProps) {
  const dispatch = useAppDispatch()

  const handleMove = (status: Task["status"]) => {
    dispatch(moveTask({ id: task.id, status }))
  }

  const handleDelete = () => {
    dispatch(deleteTask(task.id))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-border/50 hover:border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-sm text-balance leading-tight">{task.title}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {task.status !== "todo" && (
                <DropdownMenuItem onClick={() => handleMove("todo")}>Move to To Do</DropdownMenuItem>
              )}
              {task.status !== "inprogress" && (
                <DropdownMenuItem onClick={() => handleMove("inprogress")}>Move to In Progress</DropdownMenuItem>
              )}
              {task.status !== "done" && (
                <DropdownMenuItem onClick={() => handleMove("done")}>Move to Done</DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <p className="text-xs text-muted-foreground text-pretty leading-relaxed">{task.description}</p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className={`text-xs ${categoryColors[task.category]}`}>
            <Tag className="h-3 w-3 mr-1" />
            {task.category}
          </Badge>
          <Badge variant="secondary" className={`text-xs ${priorityColors[task.priority]}`}>
            <AlertCircle className="h-3 w-3 mr-1" />
            {task.priority}
          </Badge>
        </div>

        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          Due {formatDate(task.dueDate)}
        </div>
      </CardContent>
    </Card>
  )
}
