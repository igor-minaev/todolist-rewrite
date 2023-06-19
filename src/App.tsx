import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    const todolistTitle_1: string = "What to learn"
    const todolistTitle_2: string = "What to do"
    const todolistTitle_3: string = "What to buy"
    const tasks_1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "REACT", isDone: false},
        {id: 4, title: "REDUX", isDone: false}
    ]
    const tasks_2 = [
        {id: 5, title: "Go to the shop", isDone: true},
        {id: 6, title: "Read the book", isDone: false},
        {id: 7, title: "Watch the video", isDone: false},
        {id: 8, title: "Do homework", isDone: false}
    ]
    const tasks_3 = [
        {id: 5, title: "Milk", isDone: true},
        {id: 6, title: "Bread", isDone: false},
        {id: 7, title: "Cheese", isDone: false},
        {id: 8, title: "Potato", isDone: true}
    ]
    return (
        <div className="App">
            <Todolist title={todolistTitle_1} tasks={tasks_1}/>
            <Todolist title={todolistTitle_2} tasks={tasks_2}/>
            <Todolist title={todolistTitle_3} tasks={tasks_3}/>

        </div>
    );
}

export default App;
