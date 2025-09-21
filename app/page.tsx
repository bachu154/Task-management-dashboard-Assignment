"use client"
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { KanbanBoardFigma } from "@/components/kanban-board-figma"

export default function Home() {
  return (
    <Provider store={store}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto">
            <KanbanBoardFigma />
          </main>
        </div>
      </div>
    </Provider>
  )
}
