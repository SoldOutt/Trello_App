import React from 'react'
import Task from '../Task/Task'
import './Column.scss'
import { Container, Draggable } from 'react-smooth-dnd'
import { mapOrder } from '../../util/sort'
const Column = ({ column, onTaskDrop }) => {
    var { title, tasks, taskOrder } = column
    tasks = mapOrder(tasks, taskOrder, 'id')

    return (
        <div className="column">
            <h3 className="header column-drag-handle">{title}</h3>
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
