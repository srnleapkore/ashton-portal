import { useEffect, useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  clearError,
  signUpSuccess,
  resendVerifyStart,
  resendVerifyFailure,
  resendVerifySucces,
} from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [resendVerficationMessage, setresendVerficationMessage] =
    useState(null);
  const {
    loading,
    resendbuttonloading,
    error: errorMessage,
    signUpData,
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all required fields."));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/investor-portal");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  const handleResendVerification = async () => {
    try {
      dispatch(resendVerifyStart());
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      if (res.ok) {
        dispatch(resendVerifySucces());
        setresendVerficationMessage(
          "Verification email resent. Please check your inbox."
        );
      } else {
        setresendVerficationMessage(null);
        dispatch(resendVerifyFailure());
      }
    } catch (error) {
      setresendVerficationMessage(null);
      dispatch(resendVerifyFailure());
    }
  };

  useEffect(() => {
    if (signUpData) {
      setTimeout(() => {
        dispatch(signUpSuccess(null));
      }, 5000);
    }
  }, [signUpData, dispatch]);

  useEffect(() => {
    if (resendVerficationMessage) {
      setTimeout(() => {
        setresendVerficationMessage(null);
      }, 5000);
    }
  }, [resendVerficationMessage]);

  return (
    <div className="login-form-main-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Enter the password"
          onChange={handleChange}
        />
        <div className="forgot-pass-link-text">
          <a href="/sign-up">Forgot password?</a>
        </div>
        <div className="tc-min-section">
          <p>
            <span
              id="tc-min-section-icon"
              className="fas fa-info-circle"
            ></span>
            By logging in, you agree to AshtonGray&apos;s Terms and Policies,
            ensuring your data&apos;s privacy and security.
          </p>
        </div>
        {errorMessage && <div className="alert-section">{errorMessage}</div>}

        <button className="form-button" disabled={loading}>
          {loading ? "Loading" : "Login"}
        </button>
      </form>
      {errorMessage === "Verify your account to login. Check your inbox." && (
        <button
          id="resend-verification-link"
          onClick={handleResendVerification}
          disabled={resendbuttonloading}
        >{resendbuttonloading ? (
          <p>
            <i className="fa fa-circle-o-notch fa-spin"></i>
            Processing
          </p>
        ) : (
          "Resend Verification Link"
        )}
        </button>
      )}
      {signUpData && typeof signUpData === "object" && (
        <div className="auth-popup-success-alert">
          <i className="fa-solid fa-circle-check"></i>
          <p>
            Hi {signUpData.firstName}, Please verify the email sent to your address to log in!
          </p>
        </div>
      )}

      {resendVerficationMessage && (
        <div className="auth-popup-success-alert">
          <i className="fa-solid fa-circle-check"></i>
          <p>{resendVerficationMessage}</p>
        </div>
      )}
    </div>
  );
}
