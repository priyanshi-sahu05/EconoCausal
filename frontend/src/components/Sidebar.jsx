import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
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

        <NavLink to="/visualizations">
          Visualizations
        </NavLink>
        <NavLink to="/allocation" className="sidebar-link">
          <span>Allocation Matrix</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;