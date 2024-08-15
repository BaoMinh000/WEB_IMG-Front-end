import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.scss";
import Searchbar from "../../Component/Popper/Search";
import Properwrapper from "../../Component/Popper/Wapper";
import Slider from "../../Component/Slider";
import img from "../../Asset/Img/demo.jpg";
const cx = classNames.bind(styles);

function Home() {
    const navigate = useNavigate();
    function handleStartClick() {
        navigate("/paypage"); // Chuyển hướng sang trang /paypage khi người dùng nhấp vào nút "Bắt đầu"
        window.location.reload();
    }

    return (
        <div className={cx("home")}>
            <Tippy
                interactive
                render={(attrs) => (
                    <div
                        className={cx("search-result")}
                        tabIndex="-1"
                        {...attrs}
                    >
                        <Properwrapper>
                            <h6 className={cx("search-title")}>Sản phẩm</h6>
                        </Properwrapper>
                    </div>
                )}
            ></Tippy>

            <div className={cx("banner")}>
                <div className={cx("banner-layer")}>
                    <div className={cx("navbar", "col-0")} style={{paddingLeft:'0'}}>
                        <Searchbar />
                    </div>
                    <div className={cx("banner-content")}>
                        <div className={cx("banner-title")}>
                            Generate your own image
                            <h1>Trở thành thành viên để sở hữu</h1>
                            <p>
                                Tải anh với chất lượng cao và ảnh không có logo
                            </p>
                        </div>
                        <button
                            className={cx("start-btn")}
                            style={{ color: "white" }}
                            onClick={handleStartClick}
                        >
                            Bắt đầu
                        </button>
                    </div>
                </div>
            </div>

            {/* Slider */}
            <div>
                <Slider />
            </div>

            <div className={cx("Media_Directory")}>
                <div className={cx("Media_Directory-Title")}>
                    Find the right content for your projects
                </div>
                <div className="row" style={{padding:'12px'}}>
                    <a href="/productDetail" className="col-lg-4 col-md-6 col-sm-12" style={{paddingRight:'0', paddingLeft:'0'}}>
                        <div className={cx("Media_Directory_Item")}>
                            <div className={cx("Media_Directory_Item_img")}>
                                <img src={img} alt="icon" />
                            </div>
                            <div className={cx("Media_Directory_Item_Title")}>
                                Ảnh
                            </div>
                        </div>
                    </a>

                    <a href="/" className="col-lg-4 col-md-6 col-sm-12" style={{paddingRight:'0', paddingLeft:'0'}}>
                        <div className={cx("Media_Directory_Item")}>
                            <div className={cx("Media_Directory_Item_img")}>
                                <img src={img} alt="icon" />
                            </div>
                            <div className={cx("Media_Directory_Item_Title")}>
                                Video
                            </div>
                        </div>
                    </a>

                    <a href="/" className="col-lg-4 col-md-6 col-sm-12" style={{paddingRight:'0', paddingLeft:'0'}}>
                        <div className={cx("Media_Directory_Item")}>
                            <div className={cx("Media_Directory_Item_img")}>
                                <img src={img} alt="icon" />
                            </div>
                            <div className={cx("Media_Directory_Item_Title")}>
                                Gif
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <div className={cx("Media_Directory")} >
                <div className={cx("Media_Directory-Title")}>
                    Get free stock photos, illustrations and videos
                </div>
                <div className="row" style={{padding:'12px'}}>
                    <div className="col-lg-4 col-md-6 col-sm-12" style={{paddingRight:'0', paddingLeft:'0'}}>
                        <div className={cx("Media_Directory_Item")}>
                            <div className={cx("Media_Directory_Item_img")}>
                                <img src={img} alt="icon" />
                            </div>
                            <div className={cx("Media_Directory_Item_Title")}>
                                Ảnh
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-12" style={{paddingRight:'0', paddingLeft:'0'}} >
                        <div className={cx("Media_Directory_Item")}>
                            <div className={cx("Media_Directory_Item_img")}>
                                <img src={img} alt="icon" />
                            </div>
                            <div className={cx("Media_Directory_Item_Title")}>
                                Video
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-12" style={{paddingRight:'0', paddingLeft:'0'}}>
                        <div className={cx("Media_Directory_Item")}>
                            <div className={cx("Media_Directory_Item_img")}>
                                <img src={img} alt="icon" />
                            </div>
                            <div className={cx("Media_Directory_Item_Title")}>
                                Gif
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
