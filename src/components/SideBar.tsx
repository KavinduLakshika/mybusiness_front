import NavBar from "./NavBar";
import { ReactNode, useState } from 'react';
import 'animate.css';
import { Link } from "react-router-dom";

interface Props {
    children?: ReactNode
}

function SideBar({ children }: Props) {
    const [isExpanded, setIsExpanded] = useState(false);
    // const navigate = useNavigate();

    const toggleSidebar = () => {
        console.log("clicked")
        setIsExpanded(!isExpanded);
    };

    const logout = () => {
        localStorage.removeItem('isLoggedIn');
        // navigate('/');
        window.location.reload();
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
                    {/* <li className="sidebar-item">
                    <Link to="/add">
                        <a href="#" className="sidebar-link">
                            <i className="lni lni-circle-plus"></i>
                            <span>Add Items</span>
                        </a>
                    </Link>
                </li> */}
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