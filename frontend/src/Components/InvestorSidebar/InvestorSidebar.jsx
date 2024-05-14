import { useLocation } from "react-router-dom";
import "./InvestorSidebar.css";
import { useEffect, useState } from "react";

export default function InvestorSidebar() {

  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div>
      <div className="investor-sidebar-main-container">
        <div className="investor-sidebar-child-container">
          <div className="investor-sidebar-logo-container">
            <div className="investor-sidebar-logo"></div>
          </div>
          <div className="sidebar-divider"></div>
          <div className="investor-sidebar-menu-container">
            <ul>
              <div className="investor-sidebar-menu-category-title">
                <p>GENERAL</p>
              </div>

              <li className={tab === "dashboard" ? "active" : ""}>
                <a href="/investor-portal?tab=dashboard">
                  <span id="sidebar-menu-icon">
                    <i className="fa-solid fa-square-poll-horizontal"></i>
                  </span>
                  Dashboard
                </a>
              </li>

              <li className={tab === "properties" ? "active" : ""}>
                <a href="/investor-portal?tab=properties">
                  <span id="sidebar-menu-icon-linear">
                    <i className="fa-solid fa-building"></i>
                  </span>
                  Properties
                </a>
              </li>

              <div className="sidebar-menu-divider"></div>

              <div className="investor-sidebar-menu-category-title">
                <p>INVESTMENTS</p>
              </div>

              <li className={tab === "transactions" ? "active" : ""}>
                <a href="/investor-portal?tab=transactions">
                  <span id="sidebar-menu-icon-linear">
                    <i className="fa-solid fa-dollar"></i>
                  </span>
                  Transactions
                </a>
              </li>

              <li className={tab === "documents" ? "active" : ""}>
                <a href="/investor-portal?tab=documents">
                  <span id="sidebar-menu-icon-linear">
                    <i className="fa-solid fa-file-invoice"></i>
                  </span>
                  Documents
                </a>
              </li>

              <div className="sidebar-menu-divider"></div>

              <div className="investor-sidebar-menu-category-title">
                <p>OTHERS</p>
              </div>

              <li className={tab === "referrals" ? "active" : ""}>
                <a href="/investor-portal?tab=referrals">
                  <span id="sidebar-menu-icon">
                    <i className="fa-solid fa-code-fork"></i>
                  </span>
                  Referrals
                </a>
              </li>

              <li className={tab === "investment-manager" ? "active" : ""}>
                <a href="/investor-portal?tab=investment-manager">
                  <span id="sidebar-menu-icon">
                    <i className="fa-solid fa-user-tie"></i>
                  </span>
                  Investment Manager
                </a>
              </li>

              <li className={tab === "help" ? "active" : ""}>
                <a href="/investor-portal?tab=help">
                  <span id="sidebar-menu-icon-circle">
                    <i className="fa-solid fa-circle-info"></i>
                  </span>
                  Help
                </a>
              </li>

              <li>
                <a href="/my-account?tab=account">
                  <span id="sidebar-menu-icon-circle">
                    <i className="fa-solid fa-gear"></i>
                  </span>
                  Settings
                </a>
              </li>
            </ul>
          </div>
          <div className="investor-sidebar-bottom-container">
            <div className="investor-sidebar-bottom-child-container">
              <h5>Investment Available</h5>
              <h6>Invest smarter with our new AI powered portal</h6>
              <button id="investor-sidebar-button-button">Explore All<span><i className="fa-solid fa-caret-down"></i></span></button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
