import  { useState, useEffect } from "react";
import axios from "axios";

export const Posts = () => {
  const [posts, setPosts] = useState([]);

  function getPosts() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => alert(err.message));
  }

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div id="posts">
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            return (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
