import classNames from "classnames/bind";
import style from "./DefaultLayout.scss";
import Header from "../component/Header";
import Footer from "../component/Footer";
import React from "react";

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
    return (
        <div className={cx("appcontainer")} >
            <Header className="header" />
            <div className="container" style={{padding:'0'}}>
                <div className="row align-items-center" style={{width:'100%'}}>
                    <div className="col-12" style={{paddingRight:'0', padddingleft:'0'}}>
                        <div className={cx("content")}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <Footer className="footer" />
        </div>
    );
}

export default DefaultLayout;
