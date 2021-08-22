import React, { useState, useEffect } from 'react'
import Column from '../Column/Column'
import './Dashboard.scss'
import { initData } from '../../actions/initData'
import { mapOrder } from '../../util/sort'
const DashBoard = () => {
    const [columnState, setColumnState] = useState([])
    const [boardState, setBoardState] = useState({})
    useEffect(() => {
        const boardFromDb = initData.boards.find((board) => {
            return board.id === 'board-1'
        })
        setBoardState(boardFromDb)
        setColumnState(
            mapOrder(boardFromDb.columns, boardFromDb.columnOrder, 'id')
        )
    }, [])
    return (
        <div className="dashboard">
            {!columnState ? (
                <h1>No column here</h1>
            ) : (
                columnState.map((column, idx) => (
                    <Column key={idx} column={column}></Column>
                ))
            )}
            {/* <Column></Column>
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
         */}
        </div>
    )
}

export default DashBoard
