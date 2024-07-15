import { Link } from "react-router-dom";

export const Narbar = () => {
  return (
    <div className="nav">
      <div className="logo">
        <Link className="nav-link" to="/">
          MBIthis
        </Link>
      </div>
      <div>
        <div className="nav-links">
          <div className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </div>
          
          <div className="nav-item">
            <Link className="nav-link" to="/projects">
              Projects
            </Link>
          </div>
          <div className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
