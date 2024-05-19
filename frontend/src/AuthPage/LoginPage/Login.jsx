import { useEffect, useState } from 'react';
import LoginForm from '../../Components/LoginForm/LoginForm';
import './Login.css';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Parse query parameters from URL
    const params = new URLSearchParams(window.location.search);
    const VerificationErrorData = params.get('activationerror');
    const VerificationSuccessData = params.get('activationsuccess');

    // Set error message if present
    if (VerificationErrorData) {
      setErrorMessage(VerificationErrorData);
    }

    // Set success message if present
    if (VerificationSuccessData) {
      setSuccessMessage(VerificationSuccessData);
    }
  }, []);

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage(null);
      }, 10000);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(null);
      }, 10000);
    }
  }, [errorMessage]);


  return (
    <div className="login-up-main-container">
      <div className="login-up-left-container">
        <div className="login-up-left-child-container">
          <div className="login-up-left-child-overlay">
            <div className="login-up-logo-container">
              <div className="login-up-logo"></div>
            </div>
            <div className="login-up-text-container">
              <h1>Unlock Your Financial Potential. Login Now!</h1>
              <h3>
                Empower Your Financial Future with Intelligent Investments!
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="login-up-right-container">
        <div className="login-up-right-child-container">
          <div className="login-up-right-text-container">
            {/* Display error message if present */}
            {errorMessage && <div className="verfication-error-message"><i className="fa-solid fa-circle-check"></i>
          <p>
            {errorMessage}
          </p></div>}
            
            {/* Display success message if present */}
            {successMessage && <div className="verfication-success-message"><i className="fa-solid fa-circle-check"></i>
          <p>
            {successMessage}
          </p></div>}
            
            <h1>Welcome Back</h1>
            <h3>Login securely for quick access to your account!</h3>
            <div className="login-up-form-component">
              <LoginForm/>
            </div>
            <h5>Don&apos;t have an account?<span className="redirection-form-link-text"><a href="/sign-up">Register Now</a></span></h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
