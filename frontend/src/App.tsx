import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Header from './components/Header';
import Logout from './components/Logout';
import EmailVerificationSuccess from './pages/email/Success';
import EmailVerificationError from './pages/email/Error';
import { AuthProvider } from './contexts/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main
            className="flex-grow bg-white overflow-auto"
            style={{ height: 'calc(100vh - 72px)' }}
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/account" element={<Account />} />
              <Route
                path="/email-verification-success"
                element={<EmailVerificationSuccess />}
              />
              <Route
                path="/email-verification-error"
                element={<EmailVerificationError />}
              />
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
