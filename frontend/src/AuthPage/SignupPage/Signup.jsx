import SignupForm from "../../Components/SignupForm/SignupForm";
import "./Signup.css";

export default function Signup() {
  return (
    <div className="sign-up-main-container">
      <div className="sign-up-left-container">
        <div className="sign-up-left-child-container">
          <div className="sign-up-left-child-overlay">
            <div className="sign-up-logo-container">
              <div className="sign-up-logo"></div>
            </div>
            <div className="sign-up-text-container">
              <h1>Unlock Your Financial Potential. Sign Up Today!</h1>
              <h3>
                Empower Your Financial Future with Intelligent Investments!
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="sign-up-right-container">
        <div className="sign-up-right-child-container">
          <div className="sign-up-right-text-container">
            <h1>Create Your Account Now</h1>
            <h3>Start your wealth-building journey today!</h3>
            <div className="sign-up-form-component">
              <SignupForm />
            </div>
            <h5>Having an account?<span className="redirection-form-link-text"><a href="/login">Login Now</a></span></h5>
          </div>
        </div>
      </div>
    </div>
  );
}
