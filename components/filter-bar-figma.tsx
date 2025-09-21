"use client"

import { useState } from "react"
import { Filter, Calendar, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FilterBarProps {
  onFilterChange: (filters: {
    priority: string[]
    category: string[]
    dueDate: string
  }) => void
}

export function FilterBarFigma({ onFilterChange }: FilterBarProps) {
  const [activeFilters, setActiveFilters] = useState({
    priority: [] as string[],
    category: [] as string[],
    dueDate: "",
  })

  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false)
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showDateDropdown, setShowDateDropdown] = useState(false)

  const priorities = ["High", "Medium", "Low"]
  const categories = ["Design", "Development", "Research", "Testing"]
  const dueDates = ["Today", "This Week", "This Month", "Overdue"]

  const handlePriorityToggle = (priority: string) => {
    const newPriorities = activeFilters.priority.includes(priority)
      ? activeFilters.priority.filter((p) => p !== priority)
      : [...activeFilters.priority, priority]

    const newFilters = { ...activeFilters, priority: newPriorities }
    setActiveFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleCategoryToggle = (category: string) => {
    const newCategories = activeFilters.category.includes(category)
      ? activeFilters.category.filter((c) => c !== category)
      : [...activeFilters.category, category]

    const newFilters = { ...activeFilters, category: newCategories }
    setActiveFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleDateChange = (date: string) => {
    const newFilters = { ...activeFilters, dueDate: date }
    setActiveFilters(newFilters)
    onFilterChange(newFilters)
    setShowDateDropdown(false)
  }

  const clearAllFilters = () => {
    const newFilters = { priority: [], category: [], dueDate: "" }
    setActiveFilters(newFilters)
    onFilterChange(newFilters)
  }

  const hasActiveFilters =
    activeFilters.priority.length > 0 || activeFilters.category.length > 0 || activeFilters.dueDate !== ""

  return (
    <div className="bg-white border-b border-gray-200 px-figma-4 py-figma-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-figma-2">
          <h3 className="text-figma-base font-semibold text-gray-900">Filters</h3>

          {/* Priority Filter */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent h-9 px-3 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
            >
              <Filter size={14} className="text-gray-500" />
              <span className="text-figma-sm font-medium">Priority</span>
              {activeFilters.priority.length > 0 && (
                <span className="bg-blue-500 text-white text-figma-xs rounded-full px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
                  {activeFilters.priority.length}
                </span>
              )}
              <ChevronDown size={14} className="text-gray-500" />
            </Button>

            {showPriorityDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="p-2">
                  {priorities.map((priority) => (
                    <label
                      key={priority}
                      className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={activeFilters.priority.includes(priority)}
                        onChange={() => handlePriorityToggle(priority)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-figma-sm">{priority}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent h-9 px-3 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <span className="text-figma-sm font-medium">Category</span>
              {activeFilters.category.length > 0 && (
                <span className="bg-blue-500 text-white text-figma-xs rounded-full px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
                  {activeFilters.category.length}
                </span>
              )}
              <ChevronDown size={14} className="text-gray-500" />
            </Button>

            {showCategoryDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="p-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={activeFilters.category.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-figma-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Due Date Filter */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent h-9 px-3 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              onClick={() => setShowDateDropdown(!showDateDropdown)}
            >
              <Calendar size={14} className="text-gray-500" />
              <span className="text-figma-sm font-medium">Due Date</span>
              {activeFilters.dueDate && (
                <span className="bg-blue-500 text-white text-figma-xs rounded-full px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
                  1
                </span>
              )}
              <ChevronDown size={14} className="text-gray-500" />
            </Button>

            {showDateDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="p-2">
                  {dueDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => handleDateChange(date)}
                      className="w-full text-left p-2 hover:bg-gray-50 rounded text-figma-sm"
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="gap-2 text-gray-500 hover:text-gray-700"
          >
            <X size={16} />
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 mt-figma-2 pt-figma-2 border-t border-gray-100">
          {activeFilters.priority.map((priority) => (
            <span
              key={priority}
              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-figma-xs rounded-full"
            >
              Priority: {priority}
              <X
                size={12}
                className="cursor-pointer hover:text-blue-900"
                onClick={() => handlePriorityToggle(priority)}
              />
            </span>
          ))}
          {activeFilters.category.map((category) => (
            <span
              key={category}
              className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-figma-xs rounded-full"
            >
              Category: {category}
              <X
                size={12}
                className="cursor-pointer hover:text-green-900"
                onClick={() => handleCategoryToggle(category)}
              />
            </span>
          ))}
          {activeFilters.dueDate && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-50 text-orange-700 text-figma-xs rounded-full">
              Due: {activeFilters.dueDate}
              <X size={12} className="cursor-pointer hover:text-orange-900" onClick={() => handleDateChange("")} />
            </span>
          )}
        </div>
      )}
    </div>
  )
}
