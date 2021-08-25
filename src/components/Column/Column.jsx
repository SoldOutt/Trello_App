import React, { useState, useEffect } from 'react'
import Task from '../Task/Task'
import './Column.scss'
import { Container, Draggable } from 'react-smooth-dnd'
import { mapOrder } from '../../util/sort'
const Column = ({
    column,
    onTaskDrop,
    removeColumn,
    changeNameColumn,
    addNewTask,
}) => {
    var { title, tasks, taskOrder, id } = column
    tasks = mapOrder(tasks, taskOrder, 'id')
    const [showAction, setShowAction] = useState(false)
    const [newNameColumn, setNewNameColumn] = useState('haha')
    const [showInput, setShowInput] = useState(false)
    const [showAddTask, setShowAddTask] = useState(false)
    const [nameNewTask, setNameNewTask] = useState('')
    const toggleMenuAction = () => {
        setShowAction(!showAction)
    }
    const onRemoveColumn = () => {
        removeColumn(column.id)
    }
    useEffect(() => {
        setNewNameColumn(title)
    }, [title])
    // const onChangeName = () => {
    //     setShowInput(true)
    // }
    const onChangeNameColumn = () => {
        setShowInput(true)
    }
    const blurInput = () => {
        setShowInput(false)
    }
    const onToggleAddTask = () => {
        setShowAddTask(!showAddTask)
    }
    const closeAddTask = () => {
        setShowAddTask(false)
        setNameNewTask('')
    }
    const blur = () => {
        setShowAddTask(false)
    }
    // const addTask = () => {
    //     addNewTask
    // }
    return (
        <div className="column">
            <div className="header column-drag-handle">
                <h3 onClick={onChangeNameColumn}>{title}</h3>
                {showInput && (
                    <div className="newNameColumn">
                        <input
                            // onDrag={() => setShowInput(false)}
                            className="nonDragAreaSelector"
                            autoFocus
                            type="text"
                            value={newNameColumn}
                            onChange={(event) => {
                                setNewNameColumn(event.target.value)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    changeNameColumn(id, newNameColumn)
                                    setShowInput(false)
                                }
                            }}
                            onBlur={blurInput}
                            spellCheck="false"
                        />
                    </div>
                )}

                <div className="action">
                    <i
                        onClick={toggleMenuAction}
                        className="fas fa-ellipsis-h"
                    ></i>
                    {showAction && (
                        <div className="action_menu">
                            <ul>
                                <li onClick={onRemoveColumn}>Remove Column</li>
                                <li onClick={onChangeNameColumn}>
                                    Edit Name Column
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            {/* <h3 className="header column-drag-handle">{title}</h3> */}
            <div className="task-list">
                <Container
                    groupName="col"
                    onDrop={(dropResult) => onTaskDrop(column.id, dropResult)}
                    getChildPayload={(index) => (tasks.id, tasks[index])}
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'task-drop-preview',
                    }}
                    dropPlaceholderAnimationDuration={200}
                >
                    {tasks.map((task, idx) => (
                        <Draggable key={idx}>
                            <Task task={task} />
                        </Draggable>
                    ))}
                    {showAddTask ? (
                        <div className="form_add">
                            <input
                                autoFocus
                                type="text"
                                value={nameNewTask}
                                onChange={(e) => setNameNewTask(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        addNewTask(id, nameNewTask)
                                        setNameNewTask('')
                                        setShowAddTask(false)
                                    }
                                }}
                                placeholder="Add new Task"
                            />
                        </div>
                    ) : (
                        ''
                    )}
                </Container>
            </div>
            <div className="footer">
                {showAddTask ? (
                    <div onBlur={blur} className="form_add">
                        <div className="action">
                            <button type="button" className="btn sub">
                                Add new Column
                            </button>
                            <button
                                onClick={closeAddTask}
                                type="button"
                                className="btn cancel"
                            >
                                x
                            </button>
                        </div>
                    </div>
                ) : (
                    <h4 onClick={onToggleAddTask}>Add new task</h4>
                )}
            </div>
        </div>
    )
}

export default Column
