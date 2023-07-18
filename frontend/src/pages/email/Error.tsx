const EmailVerificationError = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full text-2xl bg-blue-300 p-8">
      <h1 className="mb-4 text-3xl font-bold">Email Verification Failed</h1>
      <p className="mb-4">
        Sorry, the email verification token is invalid or has expired.
      </p>
    </div>
  );
};

export default EmailVerificationError;
