import React from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import Cookies from "js-cookie";
import classNames from "classnames/bind";
import styles from "./MenuUser.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const URL_BE = process.env.REACT_APP_URL_BE;

function MenuUser({ isShowMenuUser, onClose }) {
    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log("No token found");
                return;
            }
    
            const response = await axios.post(
                `${URL_BE}/auth/logout`,
                {},
                {
                    headers: {
                        'token': `Bearer ${token}`
                    }
                }
            );
            
            if (response.status === 200) {
                // Clear localStorage
                localStorage.removeItem("user");
                localStorage.removeItem('token');
                // Clear cookies
                Cookies.remove("refreshToken");
                // Redirect to home page
                window.location.href = "/";

            }
        } catch (error) {
            console.log("Logout error:", error);
        }
    };
    
    if (!isShowMenuUser) return null;
    return (
        <div>
            <div className={cx("modal_overlay")} onClick={onClose}></div>

            <div className={cx("menu-user")}>
                <ul>
                    <li className={cx("menu-item")}>
                        <Link to="/user/profile" onClick={onClose}>Profile</Link>
                    </li>
                    <li className={cx("menu-item")}>Settings</li>
                    <li className={cx("menu-item")} onClick={handleLogout}>
                        Logout
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default MenuUser;
