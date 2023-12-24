import { create } from "zustand";
import { devtools, subscribeWithSelector, persist } from "zustand/middleware";

const store = set => ({
    tasks: [],
    addTask: async (title, state) => set(store => ({ tasks: [...store.tasks, { title, state }] }), false, "add_task")
})

const log = config => (set, get, api) => config(
    (...args) => { set(...args) },
    get, api
)

const useStore = create(subscribeWithSelector(log(persist(devtools(store, {
    name: "stores"
})))))

useStore.subscribe(store => store.tasks, (tasks, prevTasks) => )