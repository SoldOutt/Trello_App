import React, { useState, useEffect } from 'react'
import Column from '../Column/Column'
import './Dashboard.scss'
import { initData } from '../../actions/initData'
import { mapOrder } from '../../util/sort'
import { Container, Draggable } from 'react-smooth-dnd'
import { applyDrag } from '../../util/drag'
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
    const onColumnDrop = (dragResult) => {
        // console.log(data)
        let newBoard = { ...boardState }
        let newColumn = [...columnState]
        newColumn = applyDrag(newColumn, dragResult)
        newBoard.columnOrder = newColumn.map((column) => column.id)
        newBoard.columns = newColumn
        setColumnState(newColumn)
        setBoardState(newBoard)
    }
    const onTaskDrop = (idxColumn, dragResult) => {
        const { removedIndex, addedIndex } = dragResult
        if (removedIndex !== null || addedIndex !== null) {
            console.log(idxColumn, dragResult)
            let newBoard = { ...boardState }
            let newColumn = [...columnState]
            let currentColumn = newColumn.find((x) => x.id === idxColumn)
            currentColumn.tasks = applyDrag(currentColumn.tasks, dragResult)
            currentColumn.taskOrder = currentColumn.tasks.map((x) => x.id)
            newBoard.columnOrder = newColumn.map((column) => column.id)
            setColumnState(newColumn)
            setBoardState(newBoard)
            console.log(newBoard)
        }
    }
    return (
        <div className="dashboard">
            {!columnState ? (
                <div className="add_column">Add new Column</div>
            ) : (
                <>
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
                                <Column
                                    onTaskDrop={onTaskDrop}
                                    column={column}
                                ></Column>
                            </Draggable>
                        ))}
                    </Container>
                    <div className="add_column">Add new Column</div>
                </>
            )}
        </div>
    )
}

export default DashBoard
