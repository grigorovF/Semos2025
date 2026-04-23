import { useState, useEffect } from "react";

export const Todos = () => {
  const [todos, setTodos] = useState([]);

  function getTodos() {
    fetch("https://jsonplacejholder.typicode.com/todos")
      .then((res) => res.json())
      .then((json) => setTodos(json))
      .catch((err) => alert(err));
  }

  useEffect(() => {
    getTodos();
  }, []);

  function markDone(id) {
    setTodos([
      ...todos.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    ]);
  }

  return (
    <div id="todos">
      {todos.map((todo) => {
        return (
          <div key={todo.id} id={"todo-item" + todo.id}>
            <p>
              {todo.title}
              <input
                type={"checkbox"}
                checked={todo.completed}
                value={todo.completed}
                onChange={() => {
                  markDone(todo.id);
                }}
              />
            </p>
          </div>
        );
      })}
    </div>
  );
};
