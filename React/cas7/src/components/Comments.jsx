import  { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

export const Comments = () => {
  const [comments, setComments] = useState(undefined);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((res) => setComments(res.data))
      .catch((err) => alert(err));
  }, []);

  async function deleteItem(commentId) {
    const deletedItem = await axios.delete(
      "https://jsonplaceholder.typicode.com/comments/" + commentId,
    );
    alert("Delete Status: " + deletedItem.status);
    setComments([...comments.filter((comment) => comment.id != commentId)]);
  }

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
                  <td>{comm.body.substring(0,50)}...<Link to={'/comments/' + comm.id}>More</Link></td>
                  <td>
                    <button
                      onClick={() => {
                        deleteItem(comm.id);
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
