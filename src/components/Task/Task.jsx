import React from 'react'
import './Task.scss'
const Task = ({ task }) => {
    const { title, cover } = task
    return (
        <li className="task-item">
            {cover ? <img src={cover} alt="" /> : ''}

            {title}
        </li>
    )
}

export default Task
