import { Search, Calendar, Share, MoreHorizontal, ChevronDown, Filter, Edit2, Link } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for anything..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Calendar size={20} className="text-gray-400" />
          <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">Palak Jain</div>
              <div className="text-xs text-gray-500">Rajasthan, India</div>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Mobile App</h1>
          <Edit2 size={20} className="text-blue-500" />
          <Link size={20} className="text-blue-500" />
          <div className="flex items-center gap-2 ml-8">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-green-400 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-blue-400 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-purple-400 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium">
                +2
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-500 hover:bg-blue-50">
              Invite
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Filter size={16} />
            Filter
            <ChevronDown size={16} />
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Calendar size={16} />
            Today
            <ChevronDown size={16} />
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Share size={16} />
            Share
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal size={20} />
          </Button>
        </div>
      </div>
    </div>
  )
}
