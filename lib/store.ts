import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";

// ------------------- Types -------------------
export interface Task {
  id: string;
  title: string;
  description: string;
  category: "development" | "design" | "testing" | "bug";
  priority: "low" | "medium" | "high";
  dueDate: string;
  status: "todo" | "inprogress" | "done";
  createdAt: string;
}

interface TaskState {
  tasks: Task[];
  filters: {
    category: string;
    priority: string;
    dueDate: string;
  };
}

// ------------------- Initial State -------------------
const initialState: TaskState = {
  tasks: [],
  filters: {
    category: "all",
    priority: "all",
    dueDate: "all",
  },
};

// ------------------- Redux Slice -------------------
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id" | "createdAt">>) => {
      const newTask: Task = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
    },
    moveTask: (state, action: PayloadAction<{ id: string; status: Task["status"] }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) task.status = action.payload.status;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<{ type: keyof TaskState["filters"]; value: string }>) => {
      state.filters[action.payload.type] = action.payload.value;
    },
    loadTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, moveTask, deleteTask, setFilter, loadTasks } = taskSlice.actions;

// ------------------- LocalStorage Helpers -------------------
const LOCAL_STORAGE_KEY = "creative-upaay-dashboard";

// Save state to localStorage safely
const saveToLocalStorage = (state: TaskState) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }
};

// Load state from localStorage safely
const loadFromLocalStorage = (): TaskState | undefined => {
  if (typeof window !== "undefined") {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      return data ? JSON.parse(data) as TaskState : undefined;
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }
  return undefined;
};

// ------------------- Configure Store -------------------
export const store = configureStore({
  reducer: taskSlice.reducer,
  preloadedState: loadFromLocalStorage() ?? initialState, // ensures valid initial state
});

// Subscribe to save state changes
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

// ------------------- Types for Dispatch & State -------------------
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
