"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Filter, X } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setFilter } from "@/lib/store"

export function FilterBar() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector((state) => state.tasks.filters)

  const handleFilterChange = (type: keyof typeof filters, value: string) => {
    dispatch(setFilter({ type, value }))
  }

  const clearFilters = () => {
    dispatch(setFilter({ type: "category", value: "all" }))
    dispatch(setFilter({ type: "priority", value: "all" }))
    dispatch(setFilter({ type: "dueDate", value: "all" }))
  }

  const hasActiveFilters = filters.category !== "all" || filters.priority !== "all" || filters.dueDate !== "all"

  return (
    <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filters:</span>
      </div>

      <div className="flex items-center gap-3">
        <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="testing">Testing</SelectItem>
            <SelectItem value="bug">Bug</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.priority} onValueChange={(value) => handleFilterChange("priority", value)}>
          <SelectTrigger className="w-28">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.dueDate} onValueChange={(value) => handleFilterChange("dueDate", value)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Due Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Dates</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="today">Due Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  )
}
