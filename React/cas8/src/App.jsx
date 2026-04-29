import  { useState, useEffect } from "react";
//import { Todos } from "./components/Todos";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Gallery } from "./components/Gallery";
import { Nav } from "./components/Nav";
import axios from "axios";
import './components/css/App.css';
import { GalleryContext } from "./utils/GalleryContext";

export function App() {
  // const [todos, setTodos] = useState([]);
  // const [newTodo, setNewTodo] = useState("");
  // const [showCompleted, setShowCompleted] = useState(true);
  // const [editTodo, setEditTodo] = useState(null); //{id,text,done}

  const [selectedImage, setSelectedImage] = useState("");
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios("https://picsum.photos/v2/list")
      .then((res) => setPhotos(res.data))
      .catch((err) => alert(err));
  }, []);

  // function addTodo() {
  //   let newObj = {
  //     id: Math.ceil(Math.random() * 10000),
  //     text: newTodo,
  //     done: false,
  //   };

  //   setTodos([...todos, newObj]);
  //   setNewTodo("");
  // }

  // function markAsDone(todo) {
  //   setTodos([
  //     ...todos.map((item) =>
  //       item.id === todo.id
  //         ? { id: item.id, text: item.text, done: !item.done }
  //         : item,
  //     ),
  //   ]);
  // }

  // function deleteTodo(todoId) {
  //   setTodos([...todos.filter((item) => item.id !== todoId)]);
  // }

  // function handleEdit(id, text) {
  //   setEditTodo({ id, text });
  // }

  // function handleCancel() {
  //   setEditTodo(null);
  // }

  // function handleSave() {
  //   if (editTodo) {
  //     setTodos([
  //       ...todos.map((item) =>
  //         item.id === editTodo.id ? { ...item, text: editTodo.text } : item,
  //       ),
  //     ]);
  //   }
  //   setEditTodo(null);
  // }
//  const completedElements = todos.filter((todo) => todo.done).length;

  // function openPhoto(url) {
  //   setSelectedImage(url);
  //   console.log(url)
  // }

  // function closePhoto() {
  //   setSelectedImage('');
  // }

  return (
    <div id="app">
      {/* <input
        type='text'
        value={newTodo}
        onChange={(e) => { setNewTodo(e.target.value) }}
        placeholder='Add TODO'
      />
      <button onClick={addTodo}>Add Todo</button>

      <h3>Number of Completed Items: {completedElements}</h3>

      <button onClick={() => { setShowCompleted(!showCompleted) }}>
        {showCompleted ? 'Hide Completed' : 'Show Completed'}
      </button> */}
      <Nav />

      <GalleryContext.Provider value={{ selectedImage, setSelectedImage }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/gallery"
            element={
              <Gallery
                listOfPhotos={photos}
                // selektiranaSlika={selectedImage}
                // setImage={openPhoto}
                // closeImage={closePhoto}
              />
            }
          />
          {/* <Route path='/todos' element={
          <Todos
            listOfTodos={
              showCompleted ? todos : todos.filter(todo => !todo.done)
            }
            markAsDone={markAsDone}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            handleEdit={handleEdit}
            handleCancel={handleCancel}
            handleSave={handleSave}
          />} /> */}
        </Routes>
      </GalleryContext.Provider>
    </div>
  );
}
