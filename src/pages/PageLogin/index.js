import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./PageLogin.module.scss";
import { loginUser } from "../../Redux/ApiRequest";

const cx = classNames.bind(style);

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const newUser = {
            email,
            password,
        };
        dispatch(loginUser(newUser, navigate));
    };

    const resetFormLogin = () => {
        setEmail("");
        setPassword("");
    };

    return (
        <main className={cx("contentLogin")}>
            <div className={cx("boxLogin_Regis")}>
                <div className={cx("modal_body", { active: true })}>
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default LoginPage;
