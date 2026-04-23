import {useState, useEffect} from 'react';
import './App.css';

export function Todos() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
        .then(res => res.json())
        .then(data => setTodos(data));
    }, []);

    function toggleTodo(id){
        setTodos(todos.map( 
            td => td.id === id ? {...td, completed : ! td.completed} : td));
    }

    return (
      <div>
        <h2>Todos</h2>

        {todos.map((t) => (
          <div key={t.id} className="todo-item">
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTodo(t.id)}
            />
            <span className={t.completed ? "completed" : ""}>{t.title}</span>
          </div>
        ))}
      </div>
    );
}