import classNames from "classnames/bind";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from "@tippyjs/react/headless";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.scss";
import ProductItem from "../../Component/ProductItem";
import Searchbar from "../../Component/Popper/Search";
import Properwrapper from "../../Component/Popper/Wapper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import img from "../../Asset/Img/demo.jpg";
const cx = classNames.bind(styles);

function Home() {
    var widthIMG = 340;
    var heightIMG = 320;

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
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                        </Properwrapper>
                    </div>
                )}
            ></Tippy>

            <div className={cx("banner")}>
                <div className={cx("banner-layer")}>
                    <div className={cx("navbar")}>
                        <div className={cx("search-bar")}>
                            <div className={cx("btn-type-search")}>
                                All images
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className={cx("type-search-icon")}
                                />
                            </div>
                            <Searchbar />
                        </div>
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
            <div className={cx("Media_Directory")}>
                <div className={cx("Media_Directory-Title")}>
                    Find the right content for your projects
                </div>
                <div className={cx("Media_Directory-List")}>
                    <a href="/" className={cx("Media_Directory_Item")}>
                        <div className={cx("Media_Directory_Item_img")}>
                            <img
                                src={img}
                                alt="icon"
                                width={widthIMG}
                                height={heightIMG}
                            />
                        </div>
                        <div className={cx("Media_Directory_Item_Title")}>
                            Ảnh
                        </div>
                    </a>

                    <a href="/" className={cx("Media_Directory_Item")}>
                        <div className={cx("Media_Directory_Item_img")}>
                            <img
                                src={img}
                                alt="icon"
                                width={widthIMG}
                                height={heightIMG}
                            />
                        </div>
                        <div className={cx("Media_Directory_Item_Title")}>
                            Video
                        </div>
                    </a>

                    <a href="/" className={cx("Media_Directory_Item")}>
                        <div className={cx("Media_Directory_Item_img")}>
                            <img
                                src={img}
                                alt="icon"
                                width={widthIMG}
                                height={heightIMG}
                            />
                        </div>
                        <div className={cx("Media_Directory_Item_Title")}>
                            Gif
                        </div>
                    </a>
                </div>
            </div>
            {/*  */}
            <div className={cx("Media_Directory--free")}>
                <div className={cx("Media_Directory-Title")}>
                    Get free stock photos, illustrations and videos
                </div>
                <div className={cx("Media_Directory-List")}>
                    <div className={cx("Media_Directory_Item")}>
                        <div className={cx("Media_Directory_Item_img")}>
                            <img
                                src={img}
                                alt="icon"
                                width={widthIMG}
                                height={heightIMG}
                            />
                        </div>
                        <div className={cx("Media_Directory_Item_Title")}>
                            Ảnh
                        </div>
                    </div>

                    <div className={cx("Media_Directory_Item")}>
                        <div className={cx("Media_Directory_Item_img")}>
                            <img
                                src={img}
                                alt="icon"
                                width={widthIMG}
                                height={heightIMG}
                            />
                        </div>
                        <div className={cx("Media_Directory_Item_Title")}>
                            Video
                        </div>
                    </div>

                    <div className={cx("Media_Directory_Item")}>
                        <div className={cx("Media_Directory_Item_img")}>
                            <img
                                src={img}
                                alt="icon"
                                width={widthIMG}
                                height={heightIMG}
                            />
                        </div>
                        <div className={cx("Media_Directory_Item_Title")}>
                            Gif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
