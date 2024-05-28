import NavBar from "./NavBar";
import { ReactNode, useEffect, useState } from 'react';
import 'animate.css';
import { Link } from "react-router-dom";

interface Props {
    children?: ReactNode,
    onLogout: () => void;
}

function SideBar({ children, onLogout }: Props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [userType, setUserType] = useState("user");

    useEffect(() => {
        setUserType(localStorage.getItem("user_type") || "user");
        console.log(userType);
    }, [])


    const toggleSidebar = () => {
        console.log("clicked")
        setIsExpanded(!isExpanded);
    };

    const logout = () => {
        onLogout();
    }

    return (
        <div className="wrapper">
            <aside id="sidebar" className={isExpanded ? "expand" : ""}>
                <div className="d-flex mt-1">
                    <button className="toggle-btn" onClick={toggleSidebar} type="button">
                        <i className="lni lni-grid-alt"></i>
                    </button>
                    <div className="sidebar-logo">
                        <a href="#">My Business</a>
                    </div>
                </div>
                {userType === "admin" ?
                    (
                        <ul className="sidebar-nav">
                            <li className="sidebar-item">
                                <Link to="/admin_dashboard">
                                    <a href="#" className="sidebar-link">
                                        <i className="lni lni-dashboard"></i>
                                        <span>Admin Dashboard</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    ) :
                    (
                        <ul className="sidebar-nav">
                            <li className="sidebar-item">
                                <Link to="/dashboard">
                                    <a href="#" className="sidebar-link">
                                        <i className="lni lni-dashboard"></i>
                                        <span>Dashboard</span>
                                    </a>
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link to="/invoice">
                                    <a href="/invoice" className="sidebar-link">
                                        <i className="lni lni-book"></i>
                                        <span>Invoice</span>
                                    </a>
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link to="/stock">
                                    <a href="/stock" className="sidebar-link">
                                        <i className="lni lni-cart-full"></i>
                                        <span>Stock</span>
                                    </a>
                                </Link>
                            </li>
                            <li className="sidebar-item">
                                <Link to="/profile">
                                    <a href="/profile" className="sidebar-link">
                                        <i className="lni lni-cog"></i>
                                        <span>Setting</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    )
                }
                <div className="sidebar-footer">
                    <a href="" className="sidebar-link" onClick={logout}>
                        <i className="lni lni-exit"></i>
                        <span>Logout</span>
                    </a>
                </div>
            </aside>
            <div className="main">
                <NavBar />
                {children}
            </div>
        </div>
    );
}
export default SideBar;