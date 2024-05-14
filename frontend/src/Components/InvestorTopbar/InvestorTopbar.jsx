import "./InvestorTopbar.css";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function InvestorTopbar() {
  const { currentUser } = useSelector((state) => state.user);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible((prevVisible) => !prevVisible);
  };

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="investor-topbar-main-container">
      <div className="investor-topbar-child-container">
        <div className="investor-topbar-left-container">
          <div className="investor-topbar-text-container">
            <h5>Welcome, {currentUser.firstname}!</h5>
            <p>Here is the smarter way of Investment management</p>
          </div>
        </div>
        <div className="investor-topbar-right-container">
          <div className="notification-icon-container">
            <div className="notification-icon-child-container">
              <span id="notification-icon" className="fas fa-bell"></span>
            </div>
          </div>
          <div
            className="profile-image-container"
            ref={dropdownRef}
            onClick={toggleDropdown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="profile-image-child-container">
              <img
                src={currentUser.profilepicture}
                alt="profile-image"
                width={35}
                height={35}
              />
              {dropdownVisible && (
                <div className="dropdown-menu">
                  <h5>{currentUser.firstname}</h5>
                  <p>
                    {currentUser.email.length > 20
                      ? currentUser.email.slice(0, 20) + "..."
                      : currentUser.email}
                  </p>
                  <ul>
                    <li>
                      <span>
                        <i className="fa-solid fa-circle-user"></i>
                      </span>
                      <a href="/my-account?tab=profile">My Profile</a>
                    </li>
                    <li>
                      <span>
                        <i className="fa-solid fa-gear"></i>
                      </span>
                      <a href="/my-account?tab=settings">Settings</a>
                    </li>{" "}
                  </ul>
                  <button id="dropdown-profile-logout-button">Log out</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
