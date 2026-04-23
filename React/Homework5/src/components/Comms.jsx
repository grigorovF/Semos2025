import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Comms() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [id]);

  return (
    <div>

      {comments.map((c) => (
        <div key={c.id} className="todo-item">
          <p>{c.body}</p>
        </div>
      ))}
    </div>
  );
}
