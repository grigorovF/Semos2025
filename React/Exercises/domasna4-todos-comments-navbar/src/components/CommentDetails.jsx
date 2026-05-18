import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Todo.css";

export const CommentDetails = () => {
  const [details, setDetails] = useState({});
  let {commentId} = useParams();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments/" + commentId)
      .then((res) => setDetails(res.data))
      .catch((err) => alert("Cannot fetch comment details" + err));
  }, []);

  return (
    <div id="comment-details">
      <h2>{details.name}</h2>
      <h3>{details.email}</h3>
      <p>{details.body}</p>
    </div>
  );
};
