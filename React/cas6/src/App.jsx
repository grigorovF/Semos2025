import React, { useEffect, useState } from "react";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Route, Routes } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { ChildComponent } from "./components/ChildComponent";
import { Notfound } from "./components/Notfound";
import { Users } from "./components/Users";

export function App() {
  const [users, setUsers] = useState([]);

  function getUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => setUsers(json))
      .catch((err) => alert(err));
  }

  useEffect(() => {
    (getUsers(), []);
  });
  return (
    <div id="root">
      {/* <button onClick={getUsers}>Click</button> */}
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />}>
          <Route path="us" element={<ChildComponent />}></Route>
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="/users" element={<Users usersList={users} />} />
        <Route path="*" element={<Notfound />}></Route>
      </Routes>
    </div>
  );
}

// <Switch>
//   <Route path="/home" component={Home} />
//   <Route path="/about" component={About} />
//   <Route path="/contact" component={Contact} />
// </Switch>; v5 impl of
