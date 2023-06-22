import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
import {FilterValuesType, SortValuesType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeSortValue: (sortValue: SortValuesType) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState<string>('')
    const tasksList = props.tasks.length
        ? props.tasks.map(task => {
            const removeTaskHandler = () => props.removeTask(task.id)
            return (
                <li key={task.id} className="task">
                    <div>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
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
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()

    const changeFilterHandlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)

    const changeSortValueHandlerCreator = (sortValue: SortValuesType) => () => props.changeSortValue(sortValue)

    const titleMaxLength = 25
    const isTitleToLong = title.length > titleMaxLength
    const isDisableButton = !title.length || isTitleToLong
    const isTitleToLongWarning = isTitleToLong ? <div style={{color: 'red'}}>Title is too long!</div> : null

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                {/*<input ref={inputRef}/>*/}
                <input value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <button disabled={isDisableButton} onClick={addTaskHandler}>+</button>
                {isTitleToLongWarning}
            </div>
            <div className="sort">
                <span style={{marginRight: '5px'}}>Sorting by alphabet</span>
                <div>
                    <button onClick={changeSortValueHandlerCreator("A-Z")}>A-Z</button>
                    <button onClick={changeSortValueHandlerCreator("Z-A")}>Z-A</button>
                </div>
            </div>
            <ul className='items'>
                {tasksList}
            </ul>
            <div className="buttons">
                <button onClick={changeFilterHandlerCreator("all")}>All</button>
                <button onClick={changeFilterHandlerCreator("active")}>Active</button>
                <button onClick={changeFilterHandlerCreator("completed")}>Completed</button>
            </div>
        </div>
    );
};

