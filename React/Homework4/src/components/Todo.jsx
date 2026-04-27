import React, { useState } from "react";
import "./Todo.css";

export function Todo() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);

  function addTodo() {


    const newTodo = {
      id: Math.floor(Math.random() * 1000),
      text: text,
      completed: false,
      editing: false,
      editText: text,
    };

    setTodos([...todos, newTodo]);
    setText("");
  }

  function startEdit(id) {
    setTodos(
      todos.map((td) =>
        td.id === id ? { ...td, editing: true, editText: td.text } : td,
      ),
    );
  }

  function editChange(id, value) {
    setTodos(
      todos.map((td) => (td.id === id ? { ...td, editText: value } : td)),
    );
  }

  function saveEdit(id) {
    setTodos(
      todos.map((td) =>
        td.id === id ? { ...td, text: td.editText, editing: false } : td,
      ),
    );
  }

  function cancelEdit(id) {
    setTodos(
      todos.map((td) =>
        td.id === id ? { ...td, editText: td.text, editing: false } : td,
      ),
    );
  }

  function deleteTodo(id) {
    setTodos(todos.filter((td) => td.id !== id));
  }

  function toggleCompleted(id) {
    setTodos(
      todos.map((td) =>
        td.id === id ? { ...td, completed: !td.completed } : td,
      ),
    );
  }

  const completedTodos = todos.filter((td) => td.completed).length;

  const filteredTodos = showCompleted
    ? todos
    : todos.filter((t) => !t.completed);

  return (
    <div className="container">
      <h2>Todo App</h2>

      <div className="top">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter element"
        />
        <button onClick={addTodo}>Add Element</button>
      </div>

      <h3>Number of completed items: {completedTodos}</h3>

      <button onClick={() => setShowCompleted(!showCompleted)}>
        {showCompleted ? "Hide Completed" : "Show Completed"}
      </button>

      {todos.length === 0 ? (
        <p>No items added to array yet !!!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Item</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTodos.map((td) => (
              <tr key={td.id}>
                <td>{td.id}</td>

                <td>
                  {td.editing ? (
                    <input
                      value={td.editText}
                      onChange={(e) => editChange(td.id, e.target.value)}
                    />
                  ) : (
                    td.text
                  )}
                </td>

                <td>
                  <input
                    type="checkbox"
                    checked={td.completed}
                    onChange={() => toggleCompleted(td.id)}
                  />
                </td>

                <td>
                  {td.editing ? (
                    <>
                      <button onClick={() => saveEdit(td.id)}>Save</button>
                      <button onClick={() => cancelEdit(td.id)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => deleteTodo(td.id)}>Delete</button>
                      <button onClick={() => startEdit(td.id)}>Edit</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
