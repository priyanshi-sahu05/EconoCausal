import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Navigation</h2>

      <nav className="sidebar-nav">
        <NavLink to="/" end>
          Dashboard
        </NavLink>

        <NavLink to="/upload">
          Data Upload
        </NavLink>

        <NavLink to="/budget">
          Budget Input
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;