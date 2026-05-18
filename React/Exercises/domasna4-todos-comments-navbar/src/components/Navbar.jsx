import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <ul id="nav">
      <li>
        <Link to="/">Todos</Link>
      </li>

      <li>
      </li>

      <li>
        <Link to="/posts">Posts</Link>
      </li>

      <li>
        <Link to="/comments">Comments</Link>
      </li>
    </ul>
  );
};
