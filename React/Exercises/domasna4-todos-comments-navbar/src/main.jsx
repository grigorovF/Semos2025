import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./components/Todo.css";

import { App } from "./App";
import { Todo } from "./components/Todo";
import { Posts } from "./components/Posts";
import { Comments } from "./components/Comments";
import { CommentDetails } from "./components/CommentDetails";
import { PostComments } from "./components/PostsComments";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Todo />} />
        <Route path="todos" element={<Todo />} />
        <Route path="posts" element={<Posts />} />
        <Route path="comments" element={<Comments />} />
        <Route path="comment/:commentId" element={<CommentDetails />} />
        <Route path="post/:postId" element={<PostComments />} />
      </Route>
    </Routes>
  </Router>,
);
