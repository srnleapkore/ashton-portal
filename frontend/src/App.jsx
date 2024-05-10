import { BrowserRouter, Routes, Route } from "react-router-dom";
import SalesDashboard from "./SalesTeam/SalesDashboard/SalesDashboard";
import Login from "./AuthPage/LoginPage/Login";
import Signup from "./AuthPage/SignupPage/Signup";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sales-portal" element={<SalesDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
