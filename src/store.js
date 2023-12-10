import { create } from "zustand"
import { persist } from "zustand/middleware"

const store = (set) => ({
    tasks: [{ title: "Task", state: "PLANNED" }],
    addTask: (title, state) => set(store => ({ tasks: [...store.tasks, { title, state }] })),
    deleteTask: (title) => set(store => ({ tasks: store.tasks.filter(task => task.title != title) })),
    moveTask: (title, state) => set(store => ({ tasks: store.tasks.map(task => task.title === title ? { title, state } : task) })),
    draggedTask: null,
    setDraggedTask: title => set({ draggedTask: title })
})

export const useStore = create(persist(store, {
    name: "store"
}));