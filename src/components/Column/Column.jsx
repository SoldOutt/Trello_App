import React from 'react'
import Task from '../Task/Task'
import './Column.scss'
const Column = () => {
    return (
        <div className="column">
            <h3 className="header">Mission 1</h3>
            <ul className="task-list">
                <Task></Task>
                <Task></Task>
                <Task></Task>
                <Task></Task>
                <Task></Task>
                <li className="task-item">Task 1</li>
                <li className="task-item">Task 2</li>
                <li className="task-item">Task 3</li>
                <li className="task-item">Task 4</li>
                <li className="task-item">Task 1</li>
                <li className="task-item">Task 2</li>
                <li className="task-item">Task 3</li>
                <li className="task-item">Task 4</li>
                <li className="task-item">Task 1</li>
                <li className="task-item">Task 2</li>
                <li className="task-item">Task 3</li>
                <li className="task-item">Task 4</li>
                <li className="task-item">Task 1</li>
                <li className="task-item">Task 2</li>
                <li className="task-item">Task 3</li>
                <li className="task-item">Task 4</li>
            </ul>
            <div className="footer">
                <button>Add new task</button>
            </div>
        </div>
    )
}

export default Column
