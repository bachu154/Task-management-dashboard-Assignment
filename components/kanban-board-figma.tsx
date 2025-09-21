"use client"

import { useMemo, useState } from "react"
import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd"
import { KanbanColumnFigma } from "./kanban-column-figma"
import { FilterBarFigma } from "./filter-bar-figma"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"

export function KanbanBoardFigma() {
  const { tasks } = useAppSelector((state) => state.tasks)
  const dispatch = useAppDispatch()

  const [filters, setFilters] = useState({
    priority: [] as string[],
    category: [] as string[],
    dueDate: "",
  })

  const sampleTasks = {
    todo: [
      {
        id: "1",
        title: "Brainstorming",
        description: "Brainstorming brings team members' diverse experience into play.",
        priority: "Low" as const,
        comments: 12,
        files: 0,
        avatars: ["1", "2", "3"],
        category: "Design",
        dueDate: "2024-01-15",
      },
      {
        id: "4",
        title: "User Research",
        description: "Conduct user interviews to understand pain points and requirements.",
        priority: "High" as const,
        comments: 8,
        files: 3,
        avatars: ["1", "2"],
        category: "Research",
        dueDate: "2024-01-12",
      },
      {
        id: "7",
        title: "Wireframe Creation",
        description: "Create low-fidelity wireframes for the main user flows.",
        priority: "Medium" as const,
        comments: 5,
        files: 2,
        avatars: ["2", "3", "4"],
        category: "Design",
        dueDate: "2024-01-18",
      },
      {
        id: "10",
        title: "API Documentation",
        description: "Document all API endpoints and their expected responses.",
        priority: "Low" as const,
        comments: 3,
        files: 1,
        avatars: ["1"],
        category: "Development",
        dueDate: "2024-01-20",
      },
    ],
    inprogress: [
      {
        id: "2",
        title: "Brainstorming",
        description: "Brainstorming brings team members' diverse experience into play.",
        priority: "Low" as const,
        comments: 12,
        files: 0,
        avatars: ["1", "2", "3"],
        category: "Design",
        dueDate: "2024-01-16",
      },
      {
        id: "5",
        title: "Database Design",
        description: "Design the database schema for user management and task tracking.",
        priority: "High" as const,
        comments: 15,
        files: 4,
        avatars: ["2", "3"],
        category: "Development",
        dueDate: "2024-01-14",
      },
      {
        id: "8",
        title: "UI Components",
        description: "Build reusable UI components for the design system.",
        priority: "Medium" as const,
        comments: 7,
        files: 6,
        avatars: ["1", "3", "4"],
        category: "Development",
        dueDate: "2024-01-17",
      },
    ],
    done: [
      {
        id: "3",
        title: "Brainstorming",
        description: "Brainstorming brings team members' diverse experience into play.",
        priority: "Low" as const,
        comments: 12,
        files: 0,
        avatars: ["1", "2", "3"],
        category: "Design",
        dueDate: "2024-01-10",
      },
      {
        id: "6",
        title: "Project Setup",
        description: "Initialize the project repository and set up development environment.",
        priority: "Medium" as const,
        comments: 4,
        files: 8,
        avatars: ["1", "2"],
        category: "Development",
        dueDate: "2024-01-08",
      },
    ],
  }

  const filteredTasks = useMemo(() => {
    const filterTasks = (taskList: typeof sampleTasks.todo) => {
      return taskList.filter((task) => {
        // Priority filter
        if (filters.priority.length > 0 && !filters.priority.includes(task.priority)) {
          return false
        }

        // Category filter
        if (filters.category.length > 0 && !filters.category.includes(task.category)) {
          return false
        }

        // Due date filter (simplified logic)
        if (filters.dueDate) {
          const today = new Date()
          const taskDate = new Date(task.dueDate)

          switch (filters.dueDate) {
            case "Today":
              if (taskDate.toDateString() !== today.toDateString()) return false
              break
            case "This Week":
              const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
              if (taskDate > weekFromNow) return false
              break
            case "Overdue":
              if (taskDate >= today) return false
              break
          }
        }

        return true
      })
    }

    return {
      todo: filterTasks(sampleTasks.todo),
      inprogress: filterTasks(sampleTasks.inprogress),
      done: filterTasks(sampleTasks.done),
    }
  }, [filters])

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    // In a real app, you would dispatch an action to move the task
    console.log(`Moving task ${draggableId} from ${source.droppableId} to ${destination.droppableId}`)
  }

  return (
    <div className="bg-gray-50 min-h-full">
      <FilterBarFigma onFilterChange={setFilters} />

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="p-8">
          <div className="flex gap-6">
            <Droppable droppableId="todo">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex-1 transition-colors ${snapshot.isDraggingOver ? "bg-blue-50" : ""}`}
                >
                  <KanbanColumnFigma
                    title="To Do"
                    count={filteredTasks.todo.length}
                    color="blue"
                    tasks={filteredTasks.todo}
                    droppableId="todo"
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId="inprogress">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex-1 transition-colors ${snapshot.isDraggingOver ? "bg-orange-50" : ""}`}
                >
                  <KanbanColumnFigma
                    title="On Progress"
                    count={filteredTasks.inprogress.length}
                    color="orange"
                    tasks={filteredTasks.inprogress}
                    droppableId="inprogress"
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId="done">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex-1 transition-colors ${snapshot.isDraggingOver ? "bg-green-50" : ""}`}
                >
                  <KanbanColumnFigma
                    title="Done"
                    count={filteredTasks.done.length}
                    color="green"
                    tasks={filteredTasks.done}
                    droppableId="done"
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  )
}
