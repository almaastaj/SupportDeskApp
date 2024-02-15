import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import React from "react";

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <img
                    src={logo}
                    alt="Support Desk Logo"
                    style={{ height: "24px", alignContent: "center" }}
                />
                <span> </span>
                <Link style={{ fontSize: "24px", fontWeight: "bold" }} to="/">
                    Support Desk
                </Link>
            </div>
            <ul>
                <li>
                    <Link to="/login">
                        <FaSignInAlt />
                        Login
                    </Link>
                </li>
                <li>
                    <Link to="/register">
                        <FaUser />
                        Register
                    </Link>
                </li>
            </ul>
        </header>
    );
};

export default Header;
