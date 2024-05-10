import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAppStore,
    faApple,
    faFacebookF,
    faGooglePlay,
    faInstagram,
    faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx("footer")}>
            <div className={cx("grid", "wide")}>
                <nav className={cx("row", "content")}>
                    {/*Logo and change langa  */}
                    <nav
                        className={cx(
                            "col",
                            "l-4",
                            "m-4",
                            "c-5",
                            "footer__list"
                        )}
                    >
                        <nav className={cx("footer__item")}>Logo</nav>
                    </nav>
                    {/*  */}
                    <nav
                        className={cx(
                            "col",
                            "l-4",
                            "m-4",
                            "c-5",
                            "footer__list"
                        )}
                    >
                        <nav className={cx("footer__item")}>Hỗ trợ</nav>

                        <nav className={cx("footer__item")}>
                            <Link to="/" className={cx("footer__item-link")}>
                                <FontAwesomeIcon icon={faPhone} />
                                1900 1234
                            </Link>
                        </nav>

                        <nav className={cx("footer__item")}>
                            <Link to="/" className={cx("footer__item-link")}>
                                <i className={cx("fas", "fa-envelope")}>
                                    Contact us
                                </i>
                            </Link>
                        </nav>
                    </nav>
                    <nav
                        className={cx(
                            "col",
                            "l-4",
                            "m-4",
                            "c-5",
                            "footer__list"
                        )}
                    >
                        <nav
                            className={cx(
                                "footer__item",
                                "footer__item-link-icon"
                            )}
                        >
                            <nav className={cx("footer__item-link-app", "fb")}>
                                <Link
                                    to="https://www.facebook.com/bminhxn"
                                    className={cx("footer__item-link")}
                                >
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </Link>
                            </nav>
                            <nav
                                className={cx(
                                    "footer__item-link-app",
                                    "tiktok"
                                )}
                            >
                                <Link
                                    to="/"
                                    className={cx("footer__item-link")}
                                >
                                    <FontAwesomeIcon icon={faTiktok} />
                                </Link>
                            </nav>
                            <nav
                                className={cx("footer__item-link-app", "insta")}
                            >
                                <Link
                                    to="/"
                                    className={cx("footer__item-link")}
                                >
                                    <FontAwesomeIcon icon={faInstagram} />
                                </Link>
                            </nav>
                        </nav>
                        <nav className={cx("footer__item-link-install")}>
                            <Link
                                to="/"
                                className={cx(
                                    "footer__item-link",
                                    "link-app-install"
                                )}
                            >
                                <div className={cx("link-app-install--btn")}>
                                    <FontAwesomeIcon
                                        icon={faApple}
                                        className={cx(
                                            "link-app-install--btn_icon"
                                        )}
                                    />
                                    <div
                                        className={cx("link-app-install--word")}
                                    >
                                        <p
                                            className={cx(
                                                "link-app-install--word-small"
                                            )}
                                        >
                                            Download an the
                                        </p>
                                        <p
                                            className={cx(
                                                "link-app-install--word-big"
                                            )}
                                        >
                                            App Store
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </nav>
                        <nav className={cx("footer__item-link-install")}>
                            <Link
                                to="/"
                                className={cx(
                                    "footer__item-link",
                                    "link-app-install"
                                )}
                            >
                                <div className={cx("link-app-install--btn")}>
                                    <FontAwesomeIcon
                                        icon={faGooglePlay}
                                        className={cx(
                                            "link-app-install--btn_icon"
                                        )}
                                    />

                                    <div
                                        className={cx("link-app-install--word")}
                                    >
                                        <p
                                            className={cx(
                                                "link-app-install--word-small"
                                            )}
                                        >
                                            Download an the
                                        </p>
                                        <p
                                            className={cx(
                                                "link-app-install--word-big"
                                            )}
                                        >
                                            App Store
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </nav>
                    </nav>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;
