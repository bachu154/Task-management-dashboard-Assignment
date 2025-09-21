import { Home, MessageSquare, CheckSquare, Users, Settings, Plus } from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-64 bg-[#f8fafc] border-r border-[#e2e8f0] h-screen flex flex-col">
      <div className="p-6 border-b border-[#e2e8f0]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#6366f1] rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="font-semibold text-lg text-gray-900">Project M.</span>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <Home size={20} />
            <span>Home</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <MessageSquare size={20} />
            <span>Messages</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg bg-gray-100"
          >
            <CheckSquare size={20} />
            <span>Tasks</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <Users size={20} />
            <span>Members</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <Settings size={20} />
            <span>Settings</span>
          </a>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">MY PROJECTS</h3>
            <Plus size={16} className="text-gray-400" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3 px-3 py-2 bg-gray-100 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-900 font-medium">Mobile App</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Website Redesign</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Design System</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
