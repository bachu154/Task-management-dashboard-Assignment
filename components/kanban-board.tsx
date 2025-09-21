"use client"

import { useMemo } from "react"
import { KanbanColumn } from "./kanban-column"
import { FilterBar } from "./filter-bar"
import { AddTaskDialog } from "./add-task-dialog"
import { useAppSelector } from "@/lib/hooks"

export function KanbanBoard() {
  const { tasks, filters } = useAppSelector((state) => state.tasks)

  // Filter tasks based on current filters
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Category filter
      if (filters.category !== "all" && task.category !== filters.category) {
        return false
      }

      // Priority filter
      if (filters.priority !== "all" && task.priority !== filters.priority) {
        return false
      }

      // Due date filter
      if (filters.dueDate !== "all") {
        const taskDate = new Date(task.dueDate)
        const today = new Date()
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
        const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)
        const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay())
        const endOfWeek = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - today.getDay() + 6,
          23,
          59,
          59,
        )
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59)

        switch (filters.dueDate) {
          case "overdue":
            if (taskDate >= startOfToday) return false
            break
          case "today":
            if (taskDate < startOfToday || taskDate > endOfToday) return false
            break
          case "week":
            if (taskDate < startOfWeek || taskDate > endOfWeek) return false
            break
          case "month":
            if (taskDate < startOfMonth || taskDate > endOfMonth) return false
            break
        }
      }

      return true
    })
  }, [tasks, filters])

  // Group filtered tasks by status
  const tasksByStatus = useMemo(() => {
    return {
      todo: filteredTasks.filter((task) => task.status === "todo"),
      inprogress: filteredTasks.filter((task) => task.status === "inprogress"),
      done: filteredTasks.filter((task) => task.status === "done"),
    }
  }, [filteredTasks])

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-balance">Task Management Dashboard</h1>
            <p className="text-muted-foreground text-sm">Manage your tasks efficiently with this Kanban board</p>
          </div>
          <AddTaskDialog />
        </div>

        {/* Filter Bar */}
        <FilterBar />

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KanbanColumn title="To Do" status="todo" tasks={tasksByStatus.todo} count={tasksByStatus.todo.length} />
          <KanbanColumn
            title="In Progress"
            status="inprogress"
            tasks={tasksByStatus.inprogress}
            count={tasksByStatus.inprogress.length}
          />
          <KanbanColumn title="Done" status="done" tasks={tasksByStatus.done} count={tasksByStatus.done.length} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-semibold">{tasks.length}</div>
            <div className="text-sm text-muted-foreground">Total Tasks</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-semibold">{tasksByStatus.todo.length}</div>
            <div className="text-sm text-muted-foreground">To Do</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-semibold">{tasksByStatus.inprogress.length}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-semibold">{tasksByStatus.done.length}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
        </div>
      </div>
    </div>
  )
}
