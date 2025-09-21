import { MessageSquare, Paperclip, MoreHorizontal } from "lucide-react"

interface TaskCardProps {
  title: string
  description: string
  priority: "Low" | "Medium" | "High"
  comments: number
  files: number
  avatars: string[]
}

export function TaskCardFigma({ title, description, priority, comments, files, avatars }: TaskCardProps) {
  const priorityColors = {
    Low: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    Medium: "bg-amber-50 text-amber-600 border border-amber-200",
    High: "bg-red-50 text-red-600 border border-red-200",
  }

  return (
    <div className="task-card bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing">
      <div className="flex items-center justify-between" style={{ marginBottom: "12px" }}>
        <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[priority]}`}>{priority}</span>
        <MoreHorizontal
          size={16}
          className="text-gray-400 hover:text-gray-600 cursor-pointer"
          style={{ display: "flex", alignItems: "center" }}
        />
      </div>

      <h3 className="task-title text-gray-900" style={{ marginBottom: "12px" }}>
        {title}
      </h3>

      <p className="task-metadata" style={{ marginBottom: "12px" }}>
        {description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {avatars.map((avatar, index) => (
            <div
              key={index}
              className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium"
            >
              {String.fromCharCode(65 + index)}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 task-metadata">
          <div className="flex items-center gap-1" style={{ alignItems: "center" }}>
            <MessageSquare size={14} />
            <span>{comments} comments</span>
          </div>
          <div className="flex items-center gap-1" style={{ alignItems: "center" }}>
            <Paperclip size={14} />
            <span>{files} files</span>
          </div>
        </div>
      </div>
    </div>
  )
}
