import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
            <div className="container">
                <div className="row" style={{width: '100%',marginTop:'22px'}}>
                    {/* Logo and change language */}
                    <div className="col-lg-4 col-md-4 col-12">
                        <div className={cx("footer__list")}>
                            <div className={cx("footer__item")}>Logo</div>
                        </div>
                    </div>
                    {/* Support section */}
                    <div className="col-lg-4 col-md-4 col-12">
                        <div className={cx("footer__list")}>
                            <div className={cx("footer__item")}>Hỗ trợ</div>
                            <div className={cx("footer__item")}>
                                <Link to="/" className={cx("footer__item-link")}>
                                    <FontAwesomeIcon icon={faPhone} /> 1900 1234
                                </Link>
                            </div>
                            <div className={cx("footer__item")}>
                                <Link to="/" className={cx("footer__item-link")}>
                                    <i className={cx("fas", "fa-envelope")}>Contact us</i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* Social and app download section */}
                    <div className="col-lg-4 col-md-4 col-12">
                        <div className={`${cx("footer__list")}`}>
                            <div className={cx("footer__item", "footer__item-link-icon")}>
                                <div className={cx("footer__item-link-app", "fb")}>
                                    <Link to="https://www.facebook.com/bminhxn" className={cx("footer__item-link")}>
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </Link>
                                </div>
                                <div className={cx("footer__item-link-app", "tiktok")}>
                                    <Link to="/" className={cx("footer__item-link")}>
                                        <FontAwesomeIcon icon={faTiktok} />
                                    </Link>
                                </div>
                                <div className={cx("footer__item-link-app", "insta")}>
                                    <Link to="/" className={cx("footer__item-link")}>
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </Link>
                                </div>
                            </div>
                            <div className={cx("footer__item-link-install")}>
                                <Link to="/" className={cx("footer__item-link", "link-app-install")}>
                                    <div className={cx("link-app-install--btn")}>
                                        <FontAwesomeIcon icon={faApple} className={cx("link-app-install--btn_icon")} />
                                        <div className={cx("link-app-install--word")}>
                                            <p className={cx("link-app-install--word-small")}>Download on the</p>
                                            <p className={cx("link-app-install--word-big")}>App Store</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className={cx("footer__item-link-install")}>
                                <Link to="/" className={cx("footer__item-link", "link-app-install")}>
                                    <div className={cx("link-app-install--btn")}>
                                        <FontAwesomeIcon icon={faGooglePlay} className={cx("link-app-install--btn_icon")} />
                                        <div className={cx("link-app-install--word")}>
                                            <p className={cx("link-app-install--word-small")}>Download on the</p>
                                            <p className={cx("link-app-install--word-big")}>Google Play</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
