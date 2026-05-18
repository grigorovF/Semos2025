import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <ul id="nav">
      <li>
        <Link to="/cake">Cakes</Link>
      </li>
    </ul>
  );
};
