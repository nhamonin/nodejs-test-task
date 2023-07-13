import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const useInput = (
  initialValue: string,
): { value: string; bind: InputProps; reset: () => void } => {
  const [value, setValue] = useState<string>(initialValue);

  return {
    value,
    reset: () => setValue(''),
    bind: {
      value,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      },
    },
  };
};

const formatErrorMessage = (message: string | Array<string>): string => {
  if (Array.isArray(message)) {
    return message.join(', ');
  }
  return message;
};

const Login = () => {
  const {
    value: usernameOrEmail,
    bind: bindUsernameOrEmail,
    reset: resetUsernameOrEmail,
  } = useInput('');
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput('');
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (!usernameOrEmail || !password) {
      setMessage('Please fill all fields');
      return;
    }

    const data = {
      usernameOrEmail,
      password,
    };

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw {
          message: (await response.json()).message,
          status: response.status,
        };
      } else {
        resetUsernameOrEmail();
        resetPassword();
        setMessage('Logged in successfully!');
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.log(error);
      if (error.status === 401 || error.status === 400) {
        setMessage(formatErrorMessage(error.message));
        return;
      }
      setMessage('An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-300 p-8">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      {message && (
        <div className="my-4 p-2 bg-red-100 border-l-4 border-red-500 text-red-700 rounded mx-auto text-center">
          {message}
        </div>
      )}

      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="usernameOrEmail" className="block mb-2 font-bold">
            Username or Email
          </label>
          <input
            type="text"
            id="usernameOrEmail"
            className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900"
            {...bindUsernameOrEmail}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 font-bold">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900"
            {...bindPassword}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 ${
              isLoading ? 'opacity-50' : ''
            }`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
