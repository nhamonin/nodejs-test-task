import Form from '../components/Form';

const Login = () => (
  <Form
    fields={[
      { name: 'usernameOrEmail', type: 'text', label: 'Username or Email' },
      { name: 'password', type: 'password', label: 'Password' },
    ]}
    endpoint="http://localhost:3000/auth/login"
    buttonLabel="Login"
    onSuccessNavigateTo="/dashboard"
  />
);

export default Login;
