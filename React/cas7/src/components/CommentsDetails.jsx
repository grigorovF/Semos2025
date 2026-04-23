import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import  axios from "axios";
export const CommentsDetails = () => {
  const [details, setDetails] = useState({});
  let { commentId } = useParams();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments/" + commentId)
      .then((res) => setDetails(res.data))
      .catch((err) => alert(err.message));
  }, []);
  return (
    <div>
      <h2>{details.email}</h2>
    </div>
  );
};
