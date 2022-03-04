import { Link } from "react-router-dom";

const Header = ({ modalHandler }) => {
  return (
    <div className="header">
      <ul>
        <li>
          <Link to="/">Movies</Link>
        </li>
        <li>
          <span className="button" onClick={() => modalHandler(true)}>
            Search Logs
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Header;
