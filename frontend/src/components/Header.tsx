import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthProvider';

const Header = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { isLoggedIn } = authContext;

  const renderNavLink = (to: string, label: string) => (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `text-white ${isActive ? 'font-bold underline' : ''}`
        }
        end
      >
        {label}
      </NavLink>
    </li>
  );

  return (
    <nav className="flex items-center justify-between p-5 bg-blue-500">
      <div className="flex items-center space-x-4">
        <NavLink to="/" className={'text-2xl font-bold text-white'} end>
          My App
        </NavLink>
      </div>
      <ul className="flex items-center space-x-4">
        {!isLoggedIn ? (
          <>
            {renderNavLink('/login', 'Login')}
            {renderNavLink('/register', 'Register')}
          </>
        ) : (
          <>
            {renderNavLink('/account', 'Account')}
            {renderNavLink('/logout', 'Logout')}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
