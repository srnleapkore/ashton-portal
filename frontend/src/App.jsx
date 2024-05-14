import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./AuthPage/LoginPage/Login";
import Signup from "./AuthPage/SignupPage/Signup";
import InvestorPage from "./Pages/InvestorPage/InvestorPage";
import PrivateRoute from "./Components/PrivateRoute";
import AccountPage from "./Pages/AccountPage/AccountPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/investor-portal" element={<InvestorPage />} />
          <Route path="/my-account" element={<AccountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
