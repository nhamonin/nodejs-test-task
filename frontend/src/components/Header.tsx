import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="flex items-center justify-between p-5 bg-blue-500">
      <h1 className="text-2xl font-bold text-white">My App</h1>
      <ul className="flex items-center space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-gray-200">
            Home
          </Link>
        </li>
        <li>
          <Link to="/login" className="text-white hover:text-gray-200">
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className="text-white hover:text-gray-200">
            Register
          </Link>
        </li>
        <li>
          <Link to="/account" className="text-white hover:text-gray-200">
            Account
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
