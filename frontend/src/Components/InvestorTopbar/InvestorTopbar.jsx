import "./InvestorTopbar.css";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function InvestorTopbar() {
  const { currentUser } = useSelector((state) => state.user);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        const dropdownMenu = dropdownRef.current.querySelector(".dropdown-menu");
        if (dropdownMenu.classList.contains("slideDown")) {
          dropdownMenu.classList.remove("slideDown");
          dropdownMenu.classList.add("slideUp");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    const dropdownMenu = dropdownRef.current.querySelector(".dropdown-menu");
    if (!dropdownMenu.classList.contains("slideDown")) {
      dropdownMenu.classList.add("slideDown");
      dropdownMenu.classList.remove("slideUp");
    }
  };

  const handleMouseLeave = () => {
    const dropdownMenu = dropdownRef.current.querySelector(".dropdown-menu");
    if (!dropdownMenu.classList.contains("slideUp")) {
      dropdownMenu.classList.remove("slideDown");
      dropdownMenu.classList.add("slideUp");
    }
  };

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
              <div className="dropdown-menu">
                <h5>{currentUser.firstname}</h5>
                <p>
                  {currentUser.email.length > 20
                    ? currentUser.email.slice(0, 20) + "..."
                    : currentUser.email}
                </p>
                <div className="dropdown-menu-divider"></div>
                <ul>
                  <li><a href="/my-account?tab=profile">Profile</a></li>
                  <li><a href="/my-account?tab=profile">My Investments</a></li>
                  <li><a href="/my-account?tab=profile">Terms & Conditions</a></li>
                  <li><a href="/my-account?tab=profile">Privacy Policies</a></li>
                  <li><a href="/my-account?tab=settings">Settings</a></li>
                </ul>
                <button id="dropdown-profile-logout-button">Log out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
