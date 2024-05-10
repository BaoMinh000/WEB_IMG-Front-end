import classNames from "classnames/bind";
import style from "./Paypage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(style);
function Paypage() {
    return (
        <div className={cx("Paypage")}>
            <h1 className={cx("Paypage-title")}>Membership plans</h1>
            <div className={cx("Paypage__content")}>
                <div className={cx("Paypage-style-layout")}>
                    <div className={cx("Paypage-style-layout-box")}>
                        <div className={cx("Paypage-style-layout-box--title")}>
                            <h2>Basic</h2>
                        </div>
                        <div>
                            <div
                                className={cx(
                                    "Paypage-style-layout-box--price"
                                )}
                            >
                                <h3>$4.99 </h3>
                                <h3>US / mo</h3>
                            </div>

                            <ul className={cx("Card-Features")}>
                                <li className={cx("")}>
                                    <FontAwesomeIcon icon={faCheck} />
                                    <div>
                                        <p className={cx("Style-para")}>
                                            Unlimited uploads
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faCheck} />
                                    <div>
                                        <p className={cx("Style-para")}>
                                            Hỗ trợ khách hàng ưu tiên
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faCheck} />
                                    <div>
                                        <p className={cx("Style-para")}>
                                            Duyệt web không có quảng cáo
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faCheck} />
                                    <div>
                                        <p className={cx("Style-para")}>
                                            Huy hiệu hồ sơ
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faCheck} />
                                    <div>
                                        <p className={cx("Style-para")}>
                                            Chia sẻ ảnh
                                        </p>
                                    </div>
                                </li>
                            </ul>

                            <button
                                style={{ marginBottom: "20px" }}
                                className={cx(
                                    "btn",
                                    "btn--primary",
                                    "btn_size--defaul"
                                )}
                            >
                                Buy now
                            </button>
                        </div>
                    </div>
                </div>
                <div className={cx("Paypage-style-layout")}>
                    <div className={cx("Paypage-style-layout-box")}>
                        <div className={cx("Paypage-style-layout-box--title")}>
                            <h2>Pro</h2>
                        </div>
                        <div>
                            <div
                                className={cx(
                                    "Paypage-style-layout-box--price"
                                )}
                            >
                                <h3>$9.99 </h3>
                                <h3>US / mo</h3>
                            </div>

                            <ul className={cx("Card-Features")}>
                                <li className={cx("")}>
                                    <FontAwesomeIcon icon={faCheck} />
                                    <div>
                                        <p className={cx("Style-para")}>
                                            Unlimited uploads
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faCheck} />
                                    <div>
                                        <p className={cx("Style-para")}>
                                            Hỗ trợ khách hàng ưu tiên
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faCheck} />
                                    <div>
                                        <p className={cx("Style-para")}>
                                            Duyệt web không có quảng cáo
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faCheck} />
                                    <div>
                                        <p className={cx("Style-para")}>
                                            Huy hiệu hồ sơ
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faCheck} />
                                    <div>
                                        <p className={cx("Style-para")}>
                                            Chia sẻ ảnh
                                        </p>
                                    </div>
                                </li>
                            </ul>

                            <button
                                style={{ marginBottom: "20px" }}
                                className={cx(
                                    "btn",
                                    "btn--primary",
                                    "btn_size--defaul"
                                )}
                            >
                                Buy now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Paypage;
