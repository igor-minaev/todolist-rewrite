import React from 'react';
import {FilterValuesType} from "./App";
import {SuperButton} from "./components/SuperButton";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    changeFilter: (filter: FilterValuesType) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    const mappedTasks = props.tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>x</button>
            </li>

        )
    })
    return (
        <div className='todolist'>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul className='items'>
                {mappedTasks}
            </ul>
            <div className="buttons">
                <SuperButton callBack={() => props.changeFilter('all')}>All</SuperButton>
                <SuperButton callBack={() => props.changeFilter('active')}>Active</SuperButton>
                <SuperButton callBack={() => props.changeFilter('completed')}>Completed</SuperButton>
            </div>
        </div>
    );
};

