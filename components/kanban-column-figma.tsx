import { Plus } from "lucide-react"
import { Draggable } from "@hello-pangea/dnd"
import { TaskCardFigma } from "./task-card-figma"

interface KanbanColumnProps {
  title: string
  count: number
  color: string
  droppableId: string
  tasks: Array<{
    id: string
    title: string
    description: string
    priority: "Low" | "Medium" | "High"
    comments: number
    files: number
    avatars: string[]
  }>
}

export function KanbanColumnFigma({ title, count, color, tasks, droppableId }: KanbanColumnProps) {
  const colorClasses = {
    blue: "border-t-blue-500",
    orange: "border-t-orange-500",
    green: "border-t-green-500",
  }

  const dotColors = {
    blue: "bg-blue-500",
    orange: "bg-orange-500",
    green: "bg-green-500",
  }

  return (
    <div
      className="kanban-column flex-1 min-w-0 rounded-lg"
      style={{ width: "320px", background: "#F9FAFB", padding: "16px" }}
    >
      <div className="flex items-center justify-between" style={{ marginBottom: "16px" }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${dotColors[color as keyof typeof dotColors]}`}></div>
            <h2 className="column-title text-gray-900">{title}</h2>
            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">{count}</span>
          </div>
        </div>
        <button className="btn-add-task text-gray-400 hover:text-gray-600 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Plus size={20} style={{ display: "flex", alignItems: "center", justifyContent: "center" }} />
        </button>
      </div>

      <div
        className={`border-t-4 ${colorClasses[color as keyof typeof colorClasses]}`}
        style={{ marginBottom: "16px", marginLeft: "-16px", marginRight: "-16px" }}
      ></div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {tasks.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={`transition-transform ${snapshot.isDragging ? "rotate-2 scale-105 shadow-lg" : ""}`}
              >
                <TaskCardFigma {...task} />
              </div>
            )}
          </Draggable>
        ))}
      </div>
    </div>
  )
}
