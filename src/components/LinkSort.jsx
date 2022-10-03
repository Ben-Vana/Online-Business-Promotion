import { NavLink } from "react-router-dom";

const LinkSort = ({ label, link }) => {
  return (
    <li className="nav-item">
      <NavLink
        role="button"
        className="nav-link  text-decoration-none"
        isActive={(match, location) => match && match.isExact}
        to={link}
      >
        {label}
      </NavLink>
    </li>
  );
};

export default LinkSort;
