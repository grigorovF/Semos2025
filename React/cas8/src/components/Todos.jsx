export const Todos = ({
  listOfTodos,
  markAsDone,
  deleteTodo,
  editTodo,
  handleEdit,
  handleCancel,
  handleSave,
}) => {
  return (
    <div id="todos">
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Text</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listOfTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>
                {editTodo && editTodo.id === todo.id ? (
                  <input
                    type="text"
                    value={editTodo.text}
                    onChange={(e) => {
                      handleEdit(editTodo.id, e.target.value);
                    }}
                  />
                ) : (
                  todo.text
                )}
              </td>
              <td>
                <input
                  type="checkbox"
                  value={todo.done}
                  checked={todo.done}
                  onChange={() => {
                    markAsDone(todo);
                  }}
                />
              </td>
              <td>
                {editTodo && editTodo.id === todo.id ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    {" "}
                    <button
                      onClick={() => {
                        handleEdit(todo.id, todo.text);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteTodo(todo.id);
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
