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

const Register = () => {
  const {
    value: username,
    bind: bindUsername,
    reset: resetUsername,
  } = useInput('');
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput('');
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

    if (!username || !email || !password) {
      setMessage('Please fill all fields');
      return;
    }

    const data = {
      username,
      email,
      password,
    };

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/users/register', {
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
        resetUsername();
        resetEmail();
        resetPassword();
        setMessage('Registered successfully!');
        navigate('/login');
      }
    } catch (error: any) {
      console.log(error);
      if (error.status === 409 || error.status === 400) {
        setMessage(formatErrorMessage(error.message));
        return;
      }
      setMessage('An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-blue-300 p-8">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      {message && (
        <div className="my-4 p-2 bg-red-100 border-l-4 border-red-500 text-red-700 rounded mx-auto text-center">
          {message}
        </div>
      )}

      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2 font-bold">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900"
            {...bindUsername}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-bold">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-gray-900"
            {...bindEmail}
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
            className={`px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 ${
              isLoading ? 'opacity-50' : ''
            }`}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
