import React from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import Cookies from "js-cookie";
import classNames from "classnames/bind";
import styles from "./MenuUser.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function MenuUser({ isShowMenuUser, onClose }) {
    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/auth/logout"
            );
            console.log(response.data);
            if (response.status === 200) {
                //clear localStorage
                localStorage.removeItem("user");
                localStorage.removeItem('token');
                //reload page
                window.location.reload();
            }
        } catch (error) {
            console.log("Logout", error);
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
