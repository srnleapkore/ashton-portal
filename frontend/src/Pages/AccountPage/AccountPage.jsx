import AccountSidebar from "../../Components/AccountSidebar/AccountSide";
import InvestorTopbar from "../../Components/InvestorTopbar/InvestorTopbar";
import "./AccountPage.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileComponent from "../../Components/ProfileComponent/ProfileComponent";

export default function AccountPage() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div>
      <div className="account-page-main-container">
        <div className="account-page-left-container">
          <AccountSidebar />
        </div>
        <div className="account-page-right-container">
          <div className="account-page-topbar-container">
            <InvestorTopbar />
          </div>
          <div className="account-page-right-main-container">
            {tab === "profile" && <ProfileComponent />}
          </div>
        </div>
      </div>
    </div>
  );
}
