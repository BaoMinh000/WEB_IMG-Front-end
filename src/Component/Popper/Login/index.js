import React, { useState, useEffect } from "react";
// import Cookies from "js-cookie";

import classNames from "classnames/bind";
import style from "./Loginbox.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../../Redux/ApiRequest";
import { useNavigate } from "react-router-dom";

// import { useHistory } from "react-router-dom";
const cx = classNames.bind(style);

function LoginModal({ isOpen, onClose, onLogin, closeisLogin }) {
    const [isActive, setIsActive] = useState(onLogin);
    const [error, setError] = useState("");
    // user
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setIsActive(onLogin);
    }, [onLogin]);

    if (!isOpen) return null;

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };
    const handleclose = () => {
        closeisLogin(false);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const newUser = {
            email,
            password,
        };
        dispatch(loginUser(newUser, navigate));
        handleclose();
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        const newUser = {
            username,
            email,
            password,
            confirmPassword,
        };
        registerUser(newUser, dispatch, navigate);
    };

    //hàm reset form login
    const resetFormLogin = () => {
        setEmail("");
        setPassword("");
    };
    //hàm Reset form
    const resetFormRegis = () => {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <div className={cx("boxLogin_Regis")}>
            <div className={cx("modal_overlay")} onClick={onClose}></div>
            <div
                // class active để hiển thị form login hoặc register
                className={cx("modal_body", {
                    active: isActive,
                    "": !isActive && isActive !== undefined,
                })}
            >
                <span className={cx("close-button")} onClick={onClose}>
                    &times;
                </span>
                <div className={cx("wrapper")}>
                    <div className={cx("form-box", "login")}>
                        <h2>Login</h2>
                        <form onSubmit={handleLogin}>
                            <div className={cx("input-box")}>
                                <span className={cx("icon")}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    required
                                />
                                <label>Email</label>
                            </div>
                            <div className={cx("input-box")}>
                                <span className={cx("icon")}>
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    required
                                />
                                <label>Password</label>
                            </div>
                            <div className={cx("remember-forgot")}>
                                <label>
                                    <input type="checkbox" />
                                    Remember me
                                </label>
                                <a href="/">Forgot Password</a>
                            </div>
                            <button
                                type="submit"
                                className={cx(
                                    "btn",
                                    "btn--primary",
                                    "btn-size--B"
                                )}
                            >
                                Login
                            </button>
                            <div className={cx("login-register")}>
                                <p>
                                    Don't have an account?
                                    <span
                                        className="register-link"
                                        onClick={() => {
                                            handleRegisterClick();
                                            resetFormRegis();
                                        }}
                                    >
                                        Register
                                    </span>
                                </p>
                            </div>
                        </form>
                    </div>
                    <div className={cx("form-box", "register")}>
                        <h2>Register</h2>
                        <form onSubmit={handleRegister}>
                            <div className={cx("input-box")}>
                                <span className={cx("icon")}>
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                    required
                                />
                                <label>Username</label>
                            </div>
                            <div className={cx("input-box")}>
                                <span className={cx("icon")}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    required
                                />
                                <label>Email</label>
                            </div>
                            <div className={cx("input-box")}>
                                <span className={cx("icon")}>
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    required
                                />
                                <label>Password</label>
                            </div>
                            <div className={cx("input-box")}>
                                <span className={cx("icon")}>
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                    }}
                                    required
                                />
                                <label>Confirm Password</label>
                            </div>
                            {error && (
                                <div className={cx("error-message")}>
                                    {error}
                                </div>
                            )}
                            <button
                                type="submit"
                                className={cx(
                                    "btn",
                                    "btn--primary",
                                    "btn-size--B"
                                )}
                            >
                                Register
                            </button>
                            <div className={cx("login-register")}>
                                <p>
                                    Already have an account?
                                    <span
                                        className="login-link"
                                        onClick={() => {
                                            handleLoginClick();
                                            resetFormLogin();
                                        }}
                                    >
                                        Login
                                    </span>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
