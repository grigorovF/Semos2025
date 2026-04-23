
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import { Todos } from "./components/Todos.jsx";
import { Posts } from "./components/Posts.jsx";
import {CommentsDetails} from './components/CommentsDetails.jsx'
import { Comments } from "./components/Comments.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path={"/"} element={<App />}>
        <Route path={"/todos"} element={<Todos />} />
        <Route path={"/posts"} element={<Posts />} />
        <Route path={"/comments"} element={<Comments />} />
        <Route path={"/comments/:commentId"} element={<CommentsDetails />} />
      </Route>
    </Routes>
  </Router>,
);
