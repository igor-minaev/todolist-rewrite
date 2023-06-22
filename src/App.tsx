import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

export type SortValuesType = "A-Z" | "Z-A" | ""

function App() {
    const todolistTitle: string = "What to learn"

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "REDUX", isDone: false},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "REACT", isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')
    const [sortValue, setSortValue] = useState<SortValuesType>('')

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }


    const addTask = (title: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const changeSortValue = (sortValue: SortValuesType) => {
        setSortValue(sortValue)
    }

    const changeTaskStatus = (taskId: string, status: boolean) => {
        setTasks(tasks.map(task => task.id === taskId ? {...task, isDone: status} : task))
    }

    const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
        switch (filter) {
            case "active":
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks

        }
    }

    const filteredTasks = getFilteredTasks(tasks, filter)

    const getSortedTasks = (filteredTasks: TaskType[], sortValue: SortValuesType): TaskType[] => {
        switch (sortValue) {
            case "A-Z":
                return [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title))
            case "Z-A":
                return [...filteredTasks].sort((a, b) => b.title.localeCompare(a.title))
            default:
                return filteredTasks

        }
    }

    const sortedTasks = getSortedTasks(filteredTasks, sortValue)


    return (
        <div className="App">
            <Todolist
                title={todolistTitle}
                filter={filter}
                sortValue={sortValue}
                tasks={sortedTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeSortValue={changeSortValue}
                changeTaskStatus={changeTaskStatus}/>
        </div>
    );
}

export default App;
