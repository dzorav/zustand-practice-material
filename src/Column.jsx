import { useState } from 'react'
import Task from './Task'
import { useStore } from './store'
import { shallow } from "zustand/shallow"

// eslint-disable-next-line react/prop-types
const Column = ({ state }) => {

    const [droppable, setDroppable] = useState(false)

    const tasks = useStore(store => store.tasks.filter(tasks => tasks.state == state), shallow)
    const addTask = useStore(store => store.addTask)
    const setDraggedTask = useStore(store => store.setDraggedTask)
    const draggedTask = useStore(state => state.draggedTask)
    const moveTask = useStore(state => state.moveTask)

    // console.log({ tasks })

    return (
        <div style={{ flexBasis: "33%", border: droppable ? "1px dashed black" : "1px solid red", padding: "20px" }}
            onDragOver={(e) => {
                e.preventDefault()
                // console.log({ e })
                // console.log("dragg")
                setDroppable(true)
            }}

            onDragLeave={e => {
                setDroppable(false)
            }}

            onDrop={(e) => {
                moveTask(draggedTask, state)
                setDraggedTask(null)
                setDroppable(false)
            }}
        >
            <div className="titleWrapper">
                <p>{state}</p>
            </div>

            {tasks.map(task => (
                <Task task={task} key={task.title} />
            ))}

            <button onClick={() => addTask(`${Math.random()}`, state)}>Add</button>
        </div>
    )
}

export default Column