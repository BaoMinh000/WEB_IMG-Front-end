//CSS
import classNames from "classnames/bind";
import style from "./DefaultLayout.scss";
import Header from "../component/Header";
import Footer from "../component/Footer";
import React from "react";

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
    return (
        <div className={cx("appcontainer")}>
            <Header />
            {/*  */}
            <div className={cx("grid wide")}>
                <div className={cx("row container")}>
                    <div className={cx("content col l-12 m-12 c-12")}>
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
