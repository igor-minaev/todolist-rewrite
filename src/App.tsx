import React from 'react';
import './App.css';

function App() {
    return (
        <div className="App">
            <div >
                <h3></h3>
                <div>
                    <input />
                    <button>+</button>
                </div>
                <ul className='items'>
                    <li>
                        <input type="checkbox" checked={true}/>
                        <span>HTML&CSS</span>
                    </li>
                    <li>
                        <input type="checkbox" checked={true}/>
                        <span>JS</span>
                    </li>
                    <li>
                        <input type="checkbox" checked={false}/>
                        <span>REACT</span>
                    </li>
                    <li>
                        <input type="checkbox" checked={false}/>
                        <span>REDUX</span>
                    </li>
                </ul>
                <div className="buttons">
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    );
}

export default App;
