import React, { useState, useEffect } from 'react'
import Task from '../Task/Task'
import './Column.scss'
import { Container, Draggable } from 'react-smooth-dnd'
import { mapOrder } from '../../util/sort'
const Column = ({ column, onTaskDrop, removeColumn, changeNameColumn }) => {
    var { title, tasks, taskOrder, id } = column
    tasks = mapOrder(tasks, taskOrder, 'id')
    const [showAction, setShowAction] = useState(false)
    const [newNameColumn, setNewNameColumn] = useState('haha')
    const [showInput, setShowInput] = useState(false)

    const toggleMenuAction = () => {
        setShowAction(!showAction)
    }
    const onRemoveColumn = () => {
        removeColumn(column.id)
    }
    useEffect(() => {
        setNewNameColumn(title)
    }, [title])
    const onChangeName = () => {
        setShowInput(true)
    }
    const onChangeNameColumn = () => {
        setShowInput(true)
    }
    const blurInput = () => {
        setShowInput(false)
    }
    return (
        <div className="column">
            <div className="header column-drag-handle">
                <h3 onClick={onChangeName}>{title}</h3>
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
                </Container>
            </div>
            <div className="footer">
                <button>Add new task</button>
            </div>
        </div>
    )
}

export default Column
