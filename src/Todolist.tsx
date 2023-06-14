import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import {SuperButton} from "./components/SuperButton";

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
    const [title, setTitle] = useState<string>('')
    const mappedTasks = props.tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>x</button>
            </li>

        )
    })

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()

    const symbolsMaxLength = 25
    const isTitleLong = title.length > symbolsMaxLength
    const isAddBtnDisabled: boolean = !title.length || isTitleLong

    const buttonHandlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)
    return (
        <div className='todolist'>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <button onClick={addTaskHandler} disabled={isAddBtnDisabled}>+</button>
            </div>
            <ul className='items'>
                {mappedTasks}
            </ul>
            <div className="buttons">
                <SuperButton callBack={buttonHandlerCreator('all')}>All</SuperButton>
                <SuperButton callBack={buttonHandlerCreator('active')}>Active</SuperButton>
                <SuperButton callBack={buttonHandlerCreator('completed')}>Completed</SuperButton>
            </div>
        </div>
    );
};

