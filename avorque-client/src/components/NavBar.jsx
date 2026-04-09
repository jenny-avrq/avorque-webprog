import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const NavBar = () => {
  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-[#d88fa3] text-white shadow-sm'
        : 'text-[#8a6670] hover:bg-[#f3c7d3] hover:text-[#5c3a44]'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#e7b8c5] bg-[#fff6f8]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="Wireframe Studio logo" className="h-12 object-contain" />
          <div>
            <p className="text-lg font-bold text-[#5c3a44]">Jamiela</p>
            <p className="text-sm text-[#8a6670]">Pink Dolly Busker</p>
          </div>
        </NavLink>

        <div className="flex items-center gap-2">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/music" className={linkClass}>
            Music
          </NavLink>
          <NavLink to="/articles" className={linkClass}>
            Gigs
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;