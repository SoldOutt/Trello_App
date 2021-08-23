import React, { useState, useEffect } from 'react'
import Column from '../Column/Column'
import './Dashboard.scss'
import { initData } from '../../actions/initData'
import { mapOrder } from '../../util/sort'
import { Container, Draggable } from 'react-smooth-dnd'
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
    const onColumnDrop = (data) => {
        console.log(data)
    }
    return (
        <div className="dashboard">
            {!columnState ? (
                <h1>No column here</h1>
            ) : (
                <Container
                    orientation="horizontal"
                    onDrop={onColumnDrop}
                    dragHandleSelector=".column-drag-handle"
                    getChildPayload={(index) => columnState[index]}
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'column-drop-preview',
                    }}
                >
                    {columnState.map((column, idx) => (
                        <Draggable key={idx}>
                            <Column column={column}></Column>
                        </Draggable>
                    ))}
                </Container>
            )}
        </div>
    )
}

export default DashBoard
