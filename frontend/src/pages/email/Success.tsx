import { Link } from 'react-router-dom';

const EmailVerificationSuccess = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full text-2xl bg-blue-300 p-8">
      <h1 className="mb-4 text-3xl font-bold">Email Verified Successfully!</h1>
      <p className="mb-4">
        Congratulations! Your email has been successfully verified.
      </p>
      <Link
        to="/login"
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Login
      </Link>
    </div>
  );
};

export default EmailVerificationSuccess;
