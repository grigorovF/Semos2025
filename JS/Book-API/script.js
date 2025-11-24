let todos = [];

function showTodos(type) {
  if (type === "completed") {
    return renderTodos(todos.filter(t => t.completed === true));
  } else if (type === "incomplete") {
    return renderTodos(todos.filter(t => t.completed === false));
  }
  return renderTodos(todos);
}

function addTodo() {
  const newTitle = document.getElementById("add-todo-input").value;

  const newTodo = {
    id: todos.length + 1,
    title: newTitle,
    author: "Custom",
    completed: false,
    createdAt: new Date()
  };

  todos = [newTodo, ...todos];
  renderTodos(todos);
}

function renderTodos(list) {
  const container = document.getElementById("todos");
  container.innerHTML = "";

  list.forEach(todo => {
    const card = document.createElement("div");
    const title = document.createElement("h2");
    const sub = document.createElement("p");
    const toggleBtn = document.createElement("button");

    toggleBtn.innerText = todo.completed ? "incomplete" : "complete";
    toggleBtn.classList.add("btn-complete");

    card.classList.add(todo.completed ? "completed" : "todo");
    title.classList.add(todo.completed ? "completed-title" : null);

    title.innerText = todo.title;
    sub.innerText = "Author: " + todo.author;

    toggleBtn.addEventListener("click", () => {
      const selected = todos.find(x => x.id === todo.id);
      selected.completed = !selected.completed;

        toggleBtn.innerText = selected.completed ? "incomplete" : "complete";

     
      showTodos("all");
    });

    card.appendChild(title);
    card.appendChild(sub);
    card.appendChild(toggleBtn);
    container.appendChild(card);
  });
}

fetch("https://fakerapi.it/api/v1/books?_quantity=1000")
  .then(res => res.json())
  .then(res => {
    todos = res.data.map((b, index) => ({
      id: index + 1,
      title: b.title,
      author: b.author,
      completed: false,
      createdAt: new Date(b.published)
    }));

    renderTodos(todos);
  })
  .catch(err => console.log("Error: ", err));