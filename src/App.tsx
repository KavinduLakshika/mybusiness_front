import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootswatch/dist/darkly/bootstrap.min.css';
import './App.css';
import Home from './pages/Home';
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import RegOtp from "./pages/auth/RegOtp";
import ShopDetails from "./pages/auth/ShopDetails";
import Dashboard from "./pages/user/Dashboard";
import ReqOtp from "./pages/auth/password_recovery/ReqOtp";
import PassOtp from "./pages/auth/password_recovery/PassOtp";
import ResetPassword from "./pages/auth/password_recovery/ResetPassword";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reg_otp" element={<RegOtp />} />
          <Route path="/reg_shop" element={<ShopDetails />} />

          <Route path="/req_otp" element={<ReqOtp />} />
          <Route path="/pass_otp" element={<PassOtp />} />
          <Route path="/reset_pass" element={<ResetPassword />} />

          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
