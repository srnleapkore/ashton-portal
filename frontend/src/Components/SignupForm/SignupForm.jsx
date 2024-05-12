import { useState } from "react";
import "./SignupForm.css";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmpassword
    ) {
      return setErrorMessage("Please fill out all required fields.");
    }
    if (formData.password !== formData.confirmpassword) {
      return setErrorMessage("Password does not match with confirm password.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        if (data.message.includes("E11000 duplicate key error")) {
          setLoading(false);
          return setErrorMessage("Email already exists.");
        } else {
          setLoading(false);
          return setErrorMessage(data.message);
        }
      }
      setLoading(false);
      if (res.ok) {
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="sign-up-form-main-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <div className="sign-up-form-horizontal-input-section">
          <input
            type="text"
            id="firstname"
            placeholder="First Name"
            onChange={handleChange}
          />
          <input
            type="text"
            id="lastname"
            placeholder="Last Name"
            onChange={handleChange}
          />
        </div>
        <input
          type="email"
          id="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="string"
          id="phone"
          placeholder="Phone Number"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Enter the password"
          onChange={handleChange}
        />
        <input
          type="password"
          id="confirmpassword"
          placeholder="Confirm the password"
          onChange={handleChange}
        />
        <div className="tc-min-section">
          <p>
            <span
              id="tc-min-section-icon"
              className="fas fa-info-circle"
            ></span>
            By registering, you agree to AshtonGray&apos;s Terms and Policies,
            ensuring your data&apos;s privacy and security.
          </p>
        </div>
        {errorMessage && <div className="alert-section">{errorMessage}</div>}
        <button className="form-button" disabled={loading}>
          {loading ? "Loading" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
