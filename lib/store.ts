import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Task {
  id: string
  title: string
  description: string
  category: "development" | "design" | "testing" | "bug"
  priority: "low" | "medium" | "high"
  dueDate: string
  status: "todo" | "inprogress" | "done"
  createdAt: string
}

interface TaskState {
  tasks: Task[]
  filters: {
    category: string
    priority: string
    dueDate: string
  }
}

const initialState: TaskState = {
  tasks: [],
  filters: {
    category: "all",
    priority: "all",
    dueDate: "all",
  },
}

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id" | "createdAt">>) => {
      const newTask: Task = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      state.tasks.push(newTask)
    },
    moveTask: (state, action: PayloadAction<{ id: string; status: Task["status"] }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id)
      if (task) {
        task.status = action.payload.status
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload)
    },
    setFilter: (state, action: PayloadAction<{ type: keyof TaskState["filters"]; value: string }>) => {
      state.filters[action.payload.type] = action.payload.value
    },
    loadTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload
    },
  },
})

export const { addTask, moveTask, deleteTask, setFilter, loadTasks } = taskSlice.actions

const saveToLocalStorage = (state: any) => {
  try {
    localStorage.setItem("creative-upaay-dashboard", JSON.stringify(state))
  } catch (error) {
    console.error("Error saving to localStorage:", error)
  }
}

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("creative-upaay-dashboard")
    return data ? JSON.parse(data) : undefined
  } catch (error) {
    console.error("Error loading from localStorage:", error)
    return undefined
  }
}

export const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
  },
  preloadedState: loadFromLocalStorage(),
})

store.subscribe(() => {
  saveToLocalStorage(store.getState())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
