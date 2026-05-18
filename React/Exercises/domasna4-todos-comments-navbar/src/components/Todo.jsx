import { useState } from "react";
import "./Todo.css";

export const Todo = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  function handleEditChange(id, value) {
    setTodos(
      todos.map((td) => (td.id === id ? { ...td, editText: value } : td)),
    );
  }
  function addNewTodo() {
    const newTodo = {
      id: Math.floor(Math.random() * 1000),
      text: text,
      completed: false,
      editing: false,
      editText: text,
    };

    setTodos([...todos, newTodo]);
    setText(" ");
  }

  function deleteTodo(id) {
    setTodos(todos.filter((td) => td.id !== id));
  }

  function startEdit(id) {
    setTodos(
      todos.map((td) =>
        td.id === id ? { ...td, editing: true, editText: td.text } : td,
      ),
    );
  }

  function saveEditText(id) {
    setTodos(
      todos.map((td) =>
        td.id === id ? { ...td, editing: false, text: td.editText } : td,
      ),
    );
  }

  function cancelEditText(id) {
    setTodos(
      todos.map((td) =>
        id === td.id ? { ...td, editText: td.text, editing: false } : td,
      ),
    );
  }

  function toggleCompleted(id) {
    setTodos(
      todos.map((td) =>
        td.id === id ? { ...td, completed: !td.completed } : td,
      ),
    );
  }

  const completedTodos = todos.filter((td) => td.completed);
  const completedTodosNumber = todos.filter((td) => td.completed).length;

  return (
    <div>
      <h2>Todos App</h2>
      <div id="addTodo">
        <input
          type="text"
          placeholder="Enter text for new todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addNewTodo}>Add</button>
      </div>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Information</td>
            <td>Completed</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {todos.map((td) => (
            <tr key={td.id}>
              <td>{td.id}</td>
              <td>
                {td.editing ? (
                  <input
                    type="text"
                    text=""
                    fontSize="24px"
                    value={td.editText}
                    onChange={(e) => handleEditChange(td.id, e.target.value)}
                  />
                ) : (
                  td.text
                )}
              </td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => toggleCompleted(td.id)}
                  checked={td.completed}
                />
              </td>
              {td.editing ? (
                <>
                  <button onClick={() => saveEditText(td.id)}>Update</button>
                  <button onClick={() => cancelEditText(td.id)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => startEdit(td.id)}>Edit</button>
                  <button onClick={() => deleteTodo(td.id)}>Delete</button>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <br /> <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <td>Completed todos: {completedTodosNumber}</td>
          </tr>

          <tr>
            <td>ID</td>
            <td>Information</td>
          </tr>
        </thead>
        <tbody>
          {completedTodos.map((td) => (
            <tr key={td.id}>
              <td>{td.id}</td>
              <td>{td.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
