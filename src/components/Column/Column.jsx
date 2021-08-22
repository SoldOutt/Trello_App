import React from 'react'
import Task from '../Task/Task'
import './Column.scss'
const Column = ({ column }) => {
    const { title, tasks } = column
    return (
        <div className="column">
            <h3 className="header">{title}</h3>
            <ul className="task-list">
                {tasks.map((task, idx) => {
                    return <Task key={idx} task={task} />
                })}
            </ul>
            <div className="footer">
                <button>Add new task</button>
            </div>
        </div>
    )
}

export default Column
