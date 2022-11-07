import { NavLink } from "react-router-dom";
import "./navbar.css";

const LinkSort = ({ label, link }) => {
  return (
    <li className="nav-item">
      <NavLink
        role="button"
        className="nav-link new-link"
        isActive={(match, location) => match && match.isExact}
        to={link}
      >
        {label}
      </NavLink>
    </li>
  );
};

export default LinkSort;
