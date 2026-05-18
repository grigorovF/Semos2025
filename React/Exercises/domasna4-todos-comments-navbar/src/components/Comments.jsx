import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Todo.css";

export const Comments = () => {
  const [comments, setComments] = useState(undefined);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((res) => setComments(res.data))
      .catch((err) => alert(err));
  }, []);

  function deleteComment(id) {
    axios
      .delete("https://jsonplaceholder.typicode.com/comments/" + id)
      .then((deletedComment) => {
        alert("Delete status " + deletedComment.status);
        setComments(comments.filter((comm) => comm.id !== id));
      });
  }

  // async function deleteComment(id) {
  //   const deletedItem = await axios.delete(
  //     "https://jsonplaceholder.typicode.com/comments/" + id,
  //   );
  //   alert("Delete Status: " + deletedItem.status);
  //   setComments([...comments.filter((comment) => comment.id != id)]);
  // }

  return (
    <div id="comments">
      {comments && (
        <table border={1}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Body</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comm) => {
              return (
                <tr key={comm.id}>
                  <td>{comm.id}</td>
                  <td>{comm.name}</td>
                  <td>{comm.email}</td>
                  <td>
                    {comm.body.substring(0, 50)}...
                    <Link to={"/comment/" + comm.id}>More</Link>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        deleteComment(comm.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
