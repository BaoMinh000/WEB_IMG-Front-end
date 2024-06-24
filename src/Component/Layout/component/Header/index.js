import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Login from "../../../Popper/Login";
import Logo from "../../../../Asset/Img/Logo/logo512.png";
import Upload from "../../../Popper/Upload";
import MenuUser from "../../../Popper/MenuUser";
// import { Wapper as Properwrapper } from 'src/Component/Popper';
//logo

//FontAwesome
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Tippy from '@tippyjs/react/headless';
// import ProductItem from 'src/Component/ProductItem';
import { Link } from "react-router-dom";
// import Cookies from "js-cookie";
import { useSelector } from "react-redux";

import { useDispatch } from 'react-redux';

import { loginSuccess, loginFailure } from "../../../../Redux/authSlice/index.js";

// import Searchbar from 'src/Component/Popper/Search';
const cx = classNames.bind(styles);
const decodeToken = (token) => JSON.parse(atob(token.split('.')[1]));

function Header() {
    const [isOpen, setisOpen] = useState(false);
    const [onLogin, setOnLogin] = useState(false);
    const [ShowUpLoad, setShowUpLoad] = useState(false);
    const [ShowMenuUser, setShowMenuUser] = useState(false); //check login
    const dispatch = useDispatch();
    
    //Trang thái đã login chưa
    const user = useSelector((state) => state.auth.login.currentUser);
    // console.log("user", user);
    
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
            // If user is null, open the login modal
            setisOpen(true);
        } else {
            // If user is not null, open the upload modal
            setShowUpLoad(true);
        }
    }
    //Hàm tự động đăng nhập lạis
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                const decodedToken = decodeToken(user.access_token);
                
                if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
                    // Token hợp lệ và chưa hết hạn
                    dispatch(loginSuccess(user));
                } else {
                    // Token hết hạn hoặc không hợp lệ
                    console.error("Token is invalid or expired");
                    dispatch(loginFailure());
                }
            } catch (error) {
                console.error("Error restoring user from local storage:", error);
                dispatch(loginFailure());
            }
        }
    }, [dispatch]);        //

    return (
        <header className={cx("header")}>
            <div className={cx("grid", "wide")}>
                <div className={cx("row", "content")}>
                    <div className={cx("col", "l-3", "m-4", "c-5")}>
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
                    {/* <Tippy
            interactive
            render={(attrs) => (
              <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                <Properwrapper>
                  <h6 className={cx('search-title')}>Sản phẩm</h6>
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                </Properwrapper>
              </div>
            )}
          >
            <div className={cx('col', 'l-4', 'm-4', 'c-3', 'search-header')}>
              <Searchbar />
            </div>
          </Tippy> */}
                    <div className={cx("col", "l-5", "m-4", "c-4")}>
                        <div className={cx("action")}>
                            <nav className={cx("navigation")}>
                                <ul className={cx("navigation__list")}>
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
                    <div className={cx("col", "l-4", "m-4", "c-4")}>
                        <div className={cx("actions")}>
                            <div
                                className={cx("navigation")}
                                style={{ width: "100%" }}
                            >
                                <ul
                                    className={cx("navigation__list")}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
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
                                                className={cx(
                                                    "navigation__link-icon"
                                                )}
                                            />
                                            Upload
                                        </div>
                                    </li>

                                    {user ? (
                                        <div
                                            className={cx(
                                                "navigation__item--btn",
                                                "navigation__item--btn--logged"
                                            )}
                                        >
                                            <div
                                                // to="/profile"
                                                className={cx(
                                                    "navigation__link"
                                                )}
                                                onClick={() => {
                                                    setShowMenuUser(
                                                        !ShowMenuUser
                                                    );
                                                }}
                                            >
                                                {/* avatar hình tròn và tên người dùng */}
                                                <img
                                                    src={Logo}
                                                    alt="avatar"
                                                    className={cx(
                                                        "navigation__link-avatar"
                                                    )}
                                                />
                                                <span
                                                    className={cx(
                                                        "navigation__link-name"
                                                    )}
                                                >
                                                    {user.user.username}
                                                </span>
                                            </div>
                                            <MenuUser
                                                isShowMenuUser={ShowMenuUser}
                                                onClose={() =>
                                                    setShowMenuUser(false)
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <li
                                            className={cx(
                                                "navigation__item--btn"
                                            )}
                                        >
                                            <div
                                                className={cx(
                                                    "navigation__item--btn"
                                                )}
                                            >
                                                <div
                                                    onClick={handleLoginClick}
                                                    className={cx(
                                                        "navigation__link",
                                                        "navigation__link--btn"
                                                    )}
                                                >
                                                    Đăng nhập
                                                </div>
                                            </div>
                                            <div
                                                className={cx(
                                                    "navigation__item--btn"
                                                )}
                                            >
                                                <div
                                                    onClick={
                                                        handleRegisterClick
                                                    }
                                                    className={cx(
                                                        "navigation__link",
                                                        "navigation__link--btn"
                                                    )}
                                                >
                                                    Đăng ký
                                                </div>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
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
