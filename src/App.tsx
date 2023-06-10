import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todolistTitle: string = 'What to learn'
    const [tasks, setTasks] = useState<TaskType[]>([
            {id: 1, title: 'HTML', isDone: true},
            {id: 2, title: 'CSS', isDone: true},
            {id: 3, title: 'JS', isDone: true},
            {id: 4, title: 'REACT', isDone: false},
            {id: 5, title: 'GIT', isDone: true},
            {id: 6, title: 'REDUX', isDone: false},
        ]
    )

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const getFilterTask = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
        switch (filter) {
            case "active":
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }

    const filteredTasks = getFilterTask(tasks, filter)
    return (
        <div className="App">
            <Todolist
                title={todolistTitle}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
