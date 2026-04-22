import React, { useState, useEffect } from "react";
import { Todos } from "./components/Todos";

export function App() {
  const [car, setCar] = useState({ model: "BMW", year: 2015 });
  const [days, setDays] = useState(["Monday", "Tuesday", "Wednesday"]);
  const [person, setPerson] = useState({ firstName: "", lastName: "" });
  const [newTodo, setNewTodo] = useState("");

  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", done: false },
    { id: 2, text: "Eat Dinner", done: false },
    { id: 3, text: "Go To Sleep", done: false },
  ]);

  function newCar() {
    setCar({
      ...car,
      // model:"Toyota",
      year: 2020,
    });
  }
  function addDays() {
    setDays(["Sunday", ...days, "Thursday"]);
  }

  function addNewTodo() {
    if (newTodo.trim() !== "") {
      let newObject = {
        id: todos.length + 1,
        text: newTodo,
        done: false,
      };
      setTodos([...todos, newObject]);
      setNewTodo("");
    } else {
      alert(
        "No value has been entered\nPlease enter a value then submit the new Todo",
      );
    }
  }
  function markTodoAsDone(clickedTodo) {
    setTodos([
      ...todos.map(
        (item) =>
          item.id === clickedTodo.id //uslovot e najdi go kliknatiot element po id
            ? { id: item.id, text: item.text, done: !item.done } //koga ke go najdeme kliknatiot element go menuvame samo propertito za done vo sprotivnoto koristejki negacija
            : item, // za site ostanati elementi ne gi cepkame odnosno go vrakjame originalniot element nepromenet
      ),
    ]);
  }

  useEffect(() => {
    console.log(todos);
  }, [todos]);
  return (
    <div id="app">
      <input
        type="text"
        placeholder="Enter TODO"
        value={newTodo}
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
      />
      <button onClick={addNewTodo}>Add TODO</button>

      <Todos todos={todos} markTodoAsDone={markTodoAsDone} />
      <h2>Car:</h2>
      <p>Model: {car.model}</p>
      <p>Year: {car.year}</p>
      <button onClick={newCar}>Buy New Car</button>
      <hr />
      <ul>
        {days.map((day, i) => (
          <li key={i}>{day}</li>
        ))}
      </ul>
      <button onClick={addDays}>Add Days</button>
      <hr />
      <input
        type="text"
        placeholder="Enter First Name"
        value={person.firstName}
        onChange={(e) => {
          setPerson({ ...person, firstName: e.target.value });
        }}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Enter Last Name"
        value={person.lastName}
        onChange={(e) => {
          setPerson({ ...person, lastName: e.target.value });
        }}
      />
    </div>
  );
}
