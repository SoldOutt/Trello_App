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
    const [nameNewColumn, setNameNewColumn] = useState('')
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
    const addNewColumn = () => {
        setNameNewColumn('')
        var newColumnToAdd = {
            id: Math.random().toString(36).substring(),
            boardId: boardState.id,
            title: nameNewColumn.trim(),
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
    const addColumn = (event) => {
        event.preventDefault()
        addNewColumn()
    }
    const addNewTask = (idColumn, nameTask) => {
        console.log(idColumn, nameTask)
        let newColumns = [...columnState]
        let newBoard = { ...boardState }
        let newTask = {
            id: Math.random().toString(36).substring(),
            boardId: boardState.id,
            columnId: idColumn,
            title: nameTask,
            cover: null,
        }
        newColumns = newColumns.map((column) => {
            return column.id === idColumn
                ? {
                      ...column,
                      taskOrder: [...column.taskOrder, newTask.id],
                      tasks: [...column.tasks, newTask],
                  }
                : column
        })

        console.log(newColumns)
        setColumnState(newColumns)
        setBoardState({ ...boardState, columns: newColumns })
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
                                    addNewTask={addNewTask}
                                    changeNameColumn={changeNameColumn}
                                ></Column>
                            </Draggable>
                        ))}
                    </Container>
                    <div className="add_column">
                        <div onClick={toggleForm}>Add new Column</div>
                        {isShowAddColumn && (
                            <div className="form_input">
                                <form action="" onSubmit={addColumn}>
                                    <input
                                        type="text"
                                        placeholder="Add Column"
                                        autoFocus
                                        value={nameNewColumn}
                                        onChange={(e) => {
                                            setNameNewColumn(e.target.value)
                                        }}
                                    />
                                    <div className="action">
                                        <button
                                            type="button"
                                            className="btn sub"
                                            onClick={addNewColumn}
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
