import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
import {FilterValuesType, SortValuesType} from "./App";

type TodolistPropsType = {
    title: string
    filter: FilterValuesType
    sortValue: SortValuesType
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeSortValue: (sortValue: SortValuesType) => void
    changeTaskStatus: (taskId: string, status: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const tasksList = props.tasks.length
        ? props.tasks.map(task => {
            const removeTaskHandler = () => props.removeTask(task.id)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)
            const taskClasses = task.isDone ? "task-completed" : ''
            return (
                <li key={task.id} className="task">
                    <div>
                        <input type="checkbox" checked={task.isDone}
                               onChange={onChangeHandler}/>
                        <span className={taskClasses}>{task.title}</span>
                    </div>
                    <button onClick={removeTaskHandler}>x</button>
                </li>
            )
        })
        : <span>Tasks list is empty!</span>

    // ---------------useRef-------------------
    // const inputRef = useRef<HTMLInputElement>(null)
    //
    // const addTaskHandler = () => {
    //     if (inputRef.current) {
    //         props.addTask(inputRef.current.value)
    //         inputRef.current.value = ''
    //     }
    // }

    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            props.addTask(title)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(false)
        }
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()

    const changeFilterHandlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)

    const changeSortValueHandlerCreator = (sortValue: SortValuesType) => () => props.changeSortValue(sortValue)

    const titleMaxLength = 25
    const isTitleToLong = title.length > titleMaxLength
    const isDisableButton = !title.length || isTitleToLong
    const isTitleToLongWarning = isTitleToLong ? <div style={{color: 'red'}}>Title is too long!</div> : null
    const inputClasses = error || isTitleToLong ? "error" : ''
    const errorMessage = error ? <div className="error-message">Title is rquired!</div> : null

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                {/*<input ref={inputRef}/>*/}
                <input value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} className={inputClasses}/>
                <button disabled={isDisableButton} onClick={addTaskHandler}>+</button>
                {isTitleToLongWarning || errorMessage}
            </div>
            <div className="sort">
                <span style={{marginRight: '5px'}}>Sorting by alphabet</span>
                <div className="buttons">
                    <button className={props.sortValue === "A-Z" ? 'active-button' : ''}
                            onClick={changeSortValueHandlerCreator("A-Z")}>A-Z
                    </button>
                    <button className={props.sortValue === "Z-A" ? 'active-button' : ''}
                            onClick={changeSortValueHandlerCreator("Z-A")}>Z-A
                    </button>
                </div>
            </div>
            <ul className='items'>
                {tasksList}
            </ul>
            <div className="buttons">
                <button className={props.filter === "all" ? 'active-button' : ''}
                        onClick={changeFilterHandlerCreator("all")}>All
                </button>
                <button className={props.filter === "active" ? 'active-button' : ''}
                        onClick={changeFilterHandlerCreator("active")}>Active
                </button>
                <button className={props.filter === "completed" ? 'active-button' : ''}
                        onClick={changeFilterHandlerCreator("completed")}>Completed
                </button>
            </div>
        </div>
    );
};

