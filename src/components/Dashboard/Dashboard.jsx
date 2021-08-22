import React from 'react'
import Column from '../Column/Column'
import './Dashboard.scss'
const DashBoard = () => {
    return (
        <div className="dashboard">
            <Column></Column>
            <Column></Column>
            <Column></Column>
            <div className="column">
                <h3 className="header">Mission 1</h3>
                <ul>
                    <li>Task 1</li>
                    <li>Task 2</li>
                    <li>Task 3</li>
                    <li>Task 4</li>
                </ul>
                <div className="footer">
                    <button>Add new task</button>
                </div>
            </div>
            <div className="column">
                <h3 className="header">Mission 1</h3>
                <ul>
                    <li>Task 1</li>
                    <li>Task 2</li>
                    <li>Task 3</li>
                    <li>Task 4</li>
                </ul>
                <div className="footer">
                    <button>Add new task</button>
                </div>
            </div>
            <div className="column">
                <h3 className="header">Mission 1</h3>
                <ul>
                    <li>Task 1</li>
                    <li>Task 2</li>
                    <li>Task 3</li>
                    <li>Task 4</li>
                </ul>
                <div className="footer">
                    <button>Add new task</button>
                </div>
            </div>
            <div className="column">
                <h3 className="header">Mission 1</h3>
                <ul>
                    <li>Task 1</li>
                    <li>Task 2</li>
                    <li>Task 3</li>
                    <li>Task 4</li>
                </ul>
                <div className="footer">
                    <button>Add new task</button>
                </div>
            </div>
        </div>
    )
}

export default DashBoard
