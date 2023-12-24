import { create, } from "zustand"
import { devtools, subscribeWithSelector, } from "zustand/middleware";
import { persist } from "zustand/middleware"

const store = (set) => ({
    tasks: [],
    addTask: async (title, state) => set(store => ({ tasks: [...store.tasks, { title, state }] }), false, "add_task"),
    deleteTask: (title) => set(store => ({ tasks: store.tasks.filter(task => task.title != title) })),
    moveTask: (title, state) => set(store => ({ tasks: store.tasks.map(task => task.title === title ? { title, state } : task) })),
    draggedTask: null,
    setDraggedTask: title => set({ draggedTask: title })
})

const log = config => (set, get, api) => config(
    (...args) => {
        console.log({ set, get: get(), api })
        console.log({ args });
        set(...args)
    },
    get,
    api
)

export const useStore = create(subscribeWithSelector(log(persist(devtools(store), {
    name: "stores"
}))));


useStore.subscribe(store => store.tasks,
    (tasks, prevTasks) => {
        // if (state.tasks !== prevState.tasks) {
        useStore.setState({ tasksOngoing: tasks.filter(task => task.state === 'ONGOING').length })
        // }
    })