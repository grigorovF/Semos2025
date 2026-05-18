import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import "./Todo.css";

export const Posts = () =>{
  const [posts, setPosts] = useState([]);

  function getPosts() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => alert("Cannot fetch posts " + err));
  }

  useEffect(() => getPosts(), []);

  return (
    <div id="posts">
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            return (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>
                  <Link to={`/post/${post.id}`}>Load Comments</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}