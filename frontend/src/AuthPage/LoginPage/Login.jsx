import LoginForm from '../../Components/LoginForm/LoginForm';
import './Login.css'

export default function Login() {
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
}
