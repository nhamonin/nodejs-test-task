import Form from '../components/Form';

const Register = () => (
  <Form
    fields={[
      { name: 'username', type: 'text', label: 'Username' },
      { name: 'email', type: 'email', label: 'Email' },
      { name: 'password', type: 'password', label: 'Password' },
    ]}
    endpoint="http://localhost:3000/users/register"
    buttonLabel="Register"
    onSuccessNavigateTo="/login"
  />
);

export default Register;
