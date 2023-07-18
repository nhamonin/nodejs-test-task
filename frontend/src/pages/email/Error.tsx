import { Link } from 'react-router-dom';

const EmailVerificationError = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full text-2xl bg-blue-300 p-8">
      <h1 className="mb-4 text-3xl font-bold">Email Verification Failed</h1>
      <p className="mb-4">
        Sorry, the email verification token is invalid or has expired.
      </p>
      <Link
        to="/register"
        className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
      >
        Register
      </Link>
    </div>
  );
};

export default EmailVerificationError;
