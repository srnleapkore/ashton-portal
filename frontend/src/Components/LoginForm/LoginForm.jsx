import { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setErrorMessage("Please fill out all required fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

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
        <div className="forgot-pass-link-text"><a href="/sign-up">Forgot password?</a></div>
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
    </div>
  );
}
