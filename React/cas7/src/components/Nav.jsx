import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <ul id="nav">
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/todos"}>Todos</Link>
      </li>
      <li>
        <Link to={"/posts"}>Posts</Link>
      </li>
      <li>
        <Link to={"/comments"}>Comments</Link>
      </li>
    </ul>
  );
};
