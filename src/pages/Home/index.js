import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getPlanbyUserid } from "../../Redux/ApiRequest";
import styles from "./Home.module.scss";
import Searchbar from "../../Component/Popper/Search";
import Properwrapper from "../../Component/Popper/Wapper";
import Slider from "../../Component/Slider";
import MediaPreview from "../../Component/Mediatype/index";
const cx = classNames.bind(styles);

function Home() {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleProducts, setVisibleProducts] = useState(4); // State để quản lý số lượng sản phẩm được hiển thị ban đầu
    const navigate = useNavigate();
    const URL_BE = process.env.REACT_APP_URL_BE;
    const userid = useSelector((state) => state.auth.login?.currentUser?.user?._id);
    const payPlans = useSelector((state) => state.plan.get_plan?.data);
    // Hàm xử lý sự kiện khi nhấp vào nút "Bắt đầu"
    function handleStartClick() {
        navigate("/payPlans");
    }
    // Hàm lấy tất cả sản phẩm từ API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${URL_BE}/product/get-all-products`, {
                    params: {
                        sortOrder: 'asc',
                        sortField: 'name',
                    },
                });

                // Cập nhật trạng thái với dữ liệu sản phẩm
                setProducts(response.data.data);                
            } catch (error) {
                // Xử lý lỗi
                setError(error.message);
            } finally {
                // Đặt trạng thái loading thành false khi hoàn tất
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // Chạy một lần khi component được mount

    // Hàm để xử lý nút "Xem thêm"
    const handleLoadMore = () => {
        setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 12);
    };

    // Hàm xử lý khi nhấp vào sản phẩm
    const handleProductClick = (productId) => {
        navigate(`/product-detail`, {state: {productId}});
    };
    useEffect(() => {
        if (!userid) {
            return;
        }
        // Define an async function inside the useEffect to call the API
        const fetchUserPlan = async () => {
            await getPlanbyUserid(userid, dispatch);
        };
        // Call the function
        fetchUserPlan()
      }, [dispatch, userid]);

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
                    <div className={cx("navbar", "col-0")} style={{ paddingLeft: '0' }}>
                        <Searchbar />
                    </div>
                    {!payPlans.length > 0 && (
                        <div className={cx("banner-content")}>
                            <div className={cx("banner-title")}>
                                Generate your own image
                                <h1>Trở thành thành viên để sở hữu</h1>
                                <p>Tải ảnh với chất lượng cao và ảnh không có logo</p>
                            </div>
                            <button
                                className={cx("start-btn")}
                                style={{ color: "white" }}
                                onClick={handleStartClick}
                            >
                                Bắt đầu
                            </button>
                        </div>
                    )}

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
                <ul className="row" style={{ padding: '12px'}}>
                    {products.slice(0, visibleProducts).map((product) => (
                        <li 
                            className="col-lg-3 col-md-6 col-sm-12" 
                            style={{ paddingRight: '0', paddingLeft: '0' }} 
                            key={product._id}
                            onClick={() => handleProductClick(product._id)} // Thêm sự kiện onClick
                        >
                            <div className={cx("Media_Directory_Item_img")}>
                                <MediaPreview product={product} />
                            </div>
                        </li>
                    ))}
                </ul>
                {/* Nút Xem thêm */}
                {visibleProducts < products.length && (
                    <div className={cx("load-more-container")}>
                        <button className={cx("load-more-btn")} onClick={handleLoadMore}>
                            Xem thêm
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
