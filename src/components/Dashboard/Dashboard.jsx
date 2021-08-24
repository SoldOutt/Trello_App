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
    const [isShowAddColumn, setIsShowAddColumn] = useState(false)
    const [nameNewTask, setNameNewTask] = useState('')
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
    const toggleForm = () => {
        setIsShowAddColumn(!isShowAddColumn)
    }
    const addNewTask = () => {
        console.log(nameNewTask)
        setNameNewTask('')
        var newColumnToAdd = {
            id: Math.random().toString(36).substring(),
            boardId: boardState.id,
            title: nameNewTask.trim(),
            taskOrder: [],
            tasks: [],
        }
        setColumnState([...columnState, newColumnToAdd])
        setBoardState({
            ...boardState,
            columnOrder: [...boardState.columnOrder, newColumnToAdd.id],
            columns: [...boardState.columns, newColumnToAdd],
        })
    }
    const removeColumn = (id) => {
        console.log(id)
        let newColumns = [...columnState]
        let newBoard = { ...boardState }
        newColumns = newColumns.filter((column) => {
            return column.id !== id
        })
        setColumnState(newColumns)
        newBoard.columnOrder = newColumns.map((column) => column.id)
        newBoard.columns = newColumns
        setBoardState(newBoard)
    }
    const changeNameColumn = (id, title) => {
        console.log(id, title)
        let newColumns = [...columnState]
        let newBoard = { ...boardState }
        newColumns = newColumns.map((column) => {
            return column.id === id ? { ...column, title } : column
        })
        setColumnState(newColumns)
        console.log(newColumns)
        setBoardState({ ...boardState, columns: newColumns })
    }
    const submit = (event) => {
        event.preventDefault()
        addNewTask()
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
                        nonDragAreaSelector=".nonDragAreaSelector"
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
                                    removeColumn={removeColumn}
                                    onTaskDrop={onTaskDrop}
                                    column={column}
                                    changeNameColumn={changeNameColumn}
                                ></Column>
                            </Draggable>
                        ))}
                    </Container>
                    <div className="add_column">
                        <div onClick={toggleForm}>Add new Column</div>
                        {isShowAddColumn && (
                            <div className="form_input">
                                <form action="" onSubmit={submit}>
                                    <input
                                        type="text"
                                        placeholder="Add Column"
                                        autoFocus
                                        value={nameNewTask}
                                        onChange={(e) => {
                                            setNameNewTask(e.target.value)
                                        }}
                                    />
                                    <div className="action">
                                        <button
                                            type="button"
                                            className="btn sub"
                                            onClick={addNewTask}
                                        >
                                            Add new Column
                                        </button>
                                        <button
                                            onClick={toggleForm}
                                            type="button"
                                            className="btn cancel"
                                        >
                                            x
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default DashBoard
