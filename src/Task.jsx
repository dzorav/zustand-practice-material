import { useStore } from "./store";

export default function Task({ task: { title } }) {

    var task = useStore(store => {
        // console.log(store);
        return store.tasks.find((task) => task.title == title)
    })

    const deleteTask = useStore(store => store.deleteTask)
    const setDraggedTask = useStore(store => store.setDraggedTask)

    // console.log({ task })

    return (
        <div draggable onDragStart={() => setDraggedTask(title)}>
            <div>{task.title}</div>
            <div>{task.state}</div>
            <button onClick={() => deleteTask(task.title)}>Delete Task</button>
        </div>
    );
}