import { NavLink } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <div className="container nav-inner">
        <NavLink to="/" className="nav-logo">
          <img src="/images/logo.png" alt="Inputwish" className="nav-logo-img" />
        </NavLink>
        <ul className="nav-links">
          <li><NavLink to="/projects">Projects</NavLink></li>
          <li><NavLink to="/news">News</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}
