import classNames from "classnames/bind";
import style from "./Paypage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Thêm axios để gọi API

const cx = classNames.bind(style);

function Paypage() {
    const [plans, setPlans] = useState([]); // State để lưu danh sách các gói dịch vụ
    const [selectedPlan, setSelectedPlan] = useState(null); // State để lưu gói dịch vụ được chọn
    const navigator = useNavigate();

    // Gọi API để lấy danh sách các gói dịch vụ khi component được render
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL_BE}/plans/get_all_plans`); // Thay đổi URL cho phù hợp với backend của bạn
                setPlans(response.data);
                setSelectedPlan(response.data[0]); // Mặc định chọn gói dịch vụ đầu tiên
            } catch (error) {
                console.error('Failed to fetch plans', error);
            }
        };

        fetchPlans();
    }, []);

    // Xử lý sự kiện khi mua hàng
    const handlePurchase = () => {
        if (selectedPlan) {
            console.log('Selected plan:', selectedPlan);            
            navigator('/checkout', { state: { name: selectedPlan.name, price: selectedPlan.price ,planid: selectedPlan._id } });
        }
    };

    return (
        <div className={cx("Paypage")}>
            <h1 className={cx("Paypage-title")}>Membership plans</h1>
            <div className={cx("Paypage__content")}>
                {plans.map((plan) => (
                    <div key={plan._id} className={cx("Paypage-style-layout")}>
                        <div className={cx("Paypage-style-layout-box")}>
                            <div className={cx("Paypage-style-layout-box--title")}>
                                <h2>{plan.name.charAt(0).toUpperCase() + plan.name.slice(1)}</h2>
                            </div>
                            <div>
                                <div className={cx("Paypage-style-layout-box--price")}>
                                    <h3>${plan.price.toFixed(2)}</h3>
                                    <h3>US / mo</h3>
                                </div>
                                <ul className={cx("Card-Features")}>
                                    <li className={cx("")}>
                                        <FontAwesomeIcon icon={faCheck} />
                                        <div>
                                            <p className={cx("Style-para")}>Download {plan.purchases_remaining} images, GIFs, or videos each month</p>
                                        </div>
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faCheck} />
                                        <div>
                                            <p className={cx("Style-para")}>Hỗ trợ khách hàng ưu tiên</p>
                                        </div>
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faCheck} />
                                        <div>
                                            <p className={cx("Style-para")}>Duyệt web không có quảng cáo</p>
                                        </div>
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faCheck} />
                                        <div>
                                            <p className={cx("Style-para")}>Huy hiệu hồ sơ</p>
                                        </div>
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faCheck} />
                                        <div>
                                            <p className={cx("Style-para")}>Chia sẻ ảnh</p>
                                        </div>
                                    </li>
                                </ul>
                                <button
                                    style={{ marginBottom: "20px" }}
                                    className={cx("btn", "btn--primary", "btn_size--defaul")}
                                    onClick={() => {
                                        setSelectedPlan(plan); 
                                        handlePurchase(); 
                                    }}
                                >
                                    Buy now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Paypage;
