import React, {useRef} from 'react';
import {FilterValuesType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    const tasksList = props.tasks.length
        ? props.tasks.map(task => {
            const removeTaskHandler = () => props.removeTask(task.id)
            return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={removeTaskHandler}>x</button>
                </li>
            )
        })
        : <span>Tasks list is empty!</span>

    const inputRef = useRef<HTMLInputElement>(null)

    const addTaskHandler = () => {
        if (inputRef.current) {
            props.addTask(inputRef.current.value)
            inputRef.current.value = ''
        }
    }

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input ref={inputRef}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul className='items'>
                {tasksList}
            </ul>
            <div className="buttons">
                <button onClick={() => props.changeFilter("all")}>All</button>
                <button onClick={() => props.changeFilter("active")}>Active</button>
                <button onClick={() => props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    );
};

