import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Login from "../../../Popper/Login";
import Logo from "../../../../Asset/Img/Logo/logo512.png";
import Upload from "../../../Popper/Upload";
import MenuUser from "../../../Popper/MenuUser";
import MenuMobi from "../../../MenuMobile";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../../../../Redux/authSlice/index.js";
//libary
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect, useRef  } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
const decodeToken = (token) => JSON.parse(atob(token.split('.')[1]));

function Header() {
    const [isOpen, setisOpen] = useState(false);
    const [onLogin, setOnLogin] = useState(false);
    const [ShowUpLoad, setShowUpLoad] = useState(false);
    const [ShowMenuUser, setShowMenuUser] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth?.login?.currentUser);
    const username = user?.user?.username;
    
    const handleLoginClick = () => {
        setisOpen(true);
        setOnLogin(false);
    };

    const handleRegisterClick = () => {
        setisOpen(true);
        setOnLogin(true);
    };

    const handleUploadclick = () => {
        if (user === null) {
            setisOpen(true);
        } else {
            setShowUpLoad(true);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        console.log('menuopn', menuOpen);
    };

    //duy trì đăng nhập khi reload
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                const decodedToken = decodeToken(user.access_token);

                if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
                    dispatch(loginSuccess(user));
                } else {
                    // Token expired or invalid
                    handleLogout();
                }
            } catch (error) {
                console.error("Error restoring user from local storage:", error);
                handleLogout();
            }
        }
    }, [dispatch, navigate]);

    const handleLogout = () => {
        // Clear user and token data
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        Cookies.remove("refreshToken");

        // Navigate to home or login page
        navigate("/");
        
        // Dispatch login failure action
        dispatch(loginFailure());
    };

    return (
        <header className={cx("header")}>
            <div className="container" style={{padding:'0'}}>
                <div className="row align-items-center" style={{width:'100%', paddingLeft: '0'}}>
                    <div className="col-lg-2 col-md-6 col-8">
                        <div className={cx("header__logo")}>
                            <a href="/" className={cx("header__logo-link")}>
                                <img
                                    width="60px"
                                    height="auto"
                                    src={Logo}
                                    alt="Logo website Webimage"
                                />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-0 col-0 d-none d-lg-block" >
                        <div className={cx("action")}>
                            <nav className={cx("navigation")}>
                                <ul className={cx("navigation__list")}  style={{marginBottom: '0'}}>
                                    <li className={cx("navigation__item")}>
                                        <Link
                                            to="/"
                                            className={cx("navigation__link")}
                                        >
                                            Trang chủ
                                        </Link>
                                    </li>
                                    <li className={cx("navigation__item")}>
                                        <Link
                                            to="/image"
                                            className={cx("navigation__link")}
                                        >
                                            Ảnh
                                        </Link>
                                    </li>
                                    <li className={cx("navigation__item")}>
                                        <Link
                                            to="/about"
                                            className={cx("navigation__link")}
                                        >
                                            Giới thiệu
                                        </Link>
                                    </li>
                                    <li className={cx("navigation__item")}>
                                        <Link
                                            to="/contact"
                                            className={cx("navigation__link")}
                                        >
                                            Liên hệ
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6 col-0 d-none d-md-block" style={{right: 0, paddingRight:'0'}}>
                        <div className={cx("actions")}>
                            <div className={cx("navigation")} style={{ width: "100%" }}>
                                <ul className={cx("navigation__list", "d-flex", "justify-content-between")} style={{marginBottom: '0'}}>
                                    <li className={cx("navigation__item--btn")}>
                                        <div
                                            className={cx(
                                                "navigation__link",
                                                "navigation__link--btn-outline"
                                            )}
                                            onClick={handleUploadclick}
                                        >
                                            <FontAwesomeIcon
                                                icon={faUpload}
                                                className={cx("navigation__link-icon")}
                                            />
                                            Upload
                                        </div>
                                    </li>
                                    {user ? (
                                        <div
                                            className={cx("navigation__item--btn", "navigation__item--btn--logged")}
                                        >
                                            <div
                                                className={cx("navigation__link")}
                                                onClick={() => setShowMenuUser(!ShowMenuUser)}
                                            >
                                                <img
                                                    src={Logo}
                                                    alt="avatar"
                                                    className={cx("navigation__link-avatar")}
                                                />
                                                <span className={cx("navigation__link-name")}>
                                                    {username}
                                                </span>
                                            </div>
                                            <MenuUser
                                                isShowMenuUser={ShowMenuUser}
                                                onClose={() => setShowMenuUser(false)}
                                            />
                                        </div>
                                    ) : (
                                        <li className={cx("navigation__item--btn")}>
                                            <div className={cx("navigation__item--btn")}>
                                                <a
                                                    href="#login"
                                                    onClick={handleLoginClick}
                                                    className={cx("navigation__link", "navigation__link--btn")}
                                                >
                                                    Đăng nhập
                                                </a>
                                            </div>
                                            <div className={cx("navigation__item--btn")}>
                                                <a 
                                                    href="#register"
                                                    onClick={handleRegisterClick}
                                                    className={cx("navigation__link", "navigation__link--btn")}
                                                >
                                                    Đăng ký
                                                </a >
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-4 d-md-none d-block" style={{position: 'relative'}}>
                        <MenuMobi />
                    </div>


                </div>
            </div>

            <Login
                isOpen={isOpen}
                onClose={() => setisOpen(false)}
                onLogin={onLogin}
                closeisLogin={setisOpen}
            />

            <Upload
                isShowUpLoad={ShowUpLoad}
                onClose={() => setShowUpLoad(false)}
                user={user}
            />
        </header>
    );
}

export default Header;
