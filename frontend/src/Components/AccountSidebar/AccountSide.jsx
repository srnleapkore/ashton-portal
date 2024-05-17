import { useLocation } from "react-router-dom";
import "./AccountSide.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../../redux/userSlice";

export default function AccountSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await fetch(`/api/user/signout`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="account-sidebar-main-container">
        <div className="account-sidebar-child-container">
          <div className="account-sidebar-logo-container">
            <div className="account-sidebar-logo"></div>
          </div>
          <div className="sidebar-divider"></div>
          <div className="account-sidebar-menu-container">
            <ul>
              <li className={tab === "account" ? "active" : ""}>
                <a href="/my-account?tab=account">
                  <span id="sidebar-menu-icon">
                    <i className="fa-solid fa-table-columns"></i>
                  </span>
                  My Account
                </a>
              </li>

              <li className={tab === "profile" ? "active" : ""}>
                <a href="/my-account?tab=profile">
                  <span id="sidebar-menu-icon-linear">
                    <i className="fa-solid fa-user"></i>
                  </span>
                  Profile
                </a>
              </li>

              <div className="sidebar-menu-divider"></div>

              <li >
                <a onClick={handleSignOut} href="">
                  <span id="sidebar-menu-icon">
                    <i className="fa-solid fa-right-from-bracket"></i>
                  </span>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
