import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-2xl bg-blue-300 p-8">
      <h1 className="mb-4 text-3xl font-bold">Welcome to Node.js Test Task!</h1>

      <div className="mt-4">
        <Link
          to="/login"
          className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
