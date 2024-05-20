import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'bootswatch/dist/flatly/bootstrap.min.css';
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
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  element: JSX.Element;
  token: string | null;
  user_status: string | null;
  user_type: string | null;
  profile_completed: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, token, user_status, user_type, profile_completed }) => {
  return token && user_status === "active" && user_type === "user" && profile_completed ? element : <Navigate to="/login" replace />;
};

interface VerifyRouteProps {
  element: JSX.Element;
  token: string | null;
  user_status: string | null;
}

const VerifyRoute: React.FC<VerifyRouteProps> = ({ element, token, user_status }) => {
  return token && user_status === "unverified" ? element : <Navigate to="/login" replace />;
};

interface ProfileIncompleteProps {
  element: JSX.Element;
  token: string | null;
  user_status: string | null;
  profile_completed: boolean;
}

const ProfileIncompleteRoute: React.FC<ProfileIncompleteProps> = ({ element, token, user_status, profile_completed }) => {
  return token && user_status === "active" && !profile_completed ? element : <Navigate to="/login" replace />;
};

interface AdminRouteProps {
  element: JSX.Element;
  token: string | null;
  user_status: string | null;
  user_type: string | null;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ element, token, user_status, user_type }) => {
  return token && user_status === "active" && user_type === "admin" ? element : <Navigate to="/login" replace />;
};

function App() {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [profileCompleted, setProfileCompleted] = useState<boolean>(false);

  useEffect(() => {
    // Retrieve the token from localStorage when the component mounts
    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');
    const storedToken = localStorage.getItem('token');
    const storedStatus = localStorage.getItem('user_status');
    const storedType = localStorage.getItem('user_type');
    const storedProfile = localStorage.getItem('profile_completed');

    if (storedEmail) {
      setEmail(storedEmail);
    }

    if (storedName) {
      setName(storedName);
    }

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedType) {
      setUserType(storedType);
    }

    if (storedStatus) {
      setUserStatus(storedStatus);
    }

    if (storedProfile) {
      setProfileCompleted(storedProfile === 'true');
    }
  }, []);

  const handleLogin = (name: string, email: string, token: string, user_status: string, user_type: string, profile_completed: boolean) => {
    // Store the token in localStorage and update the state
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    localStorage.setItem('user_status', user_status);
    localStorage.setItem('user_type', user_type);
    localStorage.setItem('profile_completed', profile_completed ? 'true' : 'false');
    setName(name);
    setEmail(email);
    setToken(token);
    setUserStatus(user_status);
    setUserType(user_type);
    setProfileCompleted(profile_completed);
  };

  const changeStatus = (user_status: string) => {
    localStorage.setItem('user_status', user_status);
    setUserStatus(user_status);
  }

  const changeProfileCompleted = (profile_completed: boolean) => {
    localStorage.setItem('profile_completed', profile_completed ? 'true' : 'false');
    setProfileCompleted(profile_completed);
  }

  const handleLogout = () => {
    // Remove the token from localStorage and update the state
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('user_status');
    localStorage.removeItem('user_type');
    localStorage.removeItem('profile_completed');
    setName(null);
    setEmail(null);
    setToken(null);
    setUserStatus(null);
    setProfileCompleted(false);
  };

  const navigateTo = () => {
    if (userStatus === "unverified") {
      return("/reg_otp");
    }

    if (!profileCompleted) {
      return("/reg_shop");
    }

    return("/dashboard")
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={token ? <Navigate to={navigateTo()} replace /> : <Login onLogin={handleLogin} />} />
          <Route path="/signup" element={token ? <Navigate to="/reg_otp" replace /> : <Signup onLogin={handleLogin} />} />
          <Route path="/reg_otp" element={<VerifyRoute element={<RegOtp email={email} changeStatus={changeStatus} />} token={token} user_status={userStatus} />} />
          <Route path="/reg_shop" element={<ProfileIncompleteRoute element={<ShopDetails email={email} changeProfileCompleted={changeProfileCompleted} />} token={token} profile_completed={profileCompleted} user_status={userStatus} />} />

          <Route path="/req_otp" element={<ReqOtp />} />
          <Route path="/pass_otp" element={<PassOtp />} />
          <Route path="/reset_pass" element={<ResetPassword />} />

          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} token={token} profile_completed={profileCompleted} user_status={userStatus} user_type={userType} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App