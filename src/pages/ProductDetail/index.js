import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Product.module.scss';
import MediaPreview from '../../Component/Mediatype/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getproductId, getAuthorbyId, getPlanbyUserid, buy_product_by_plan} from '../../Redux/ApiRequest';

import axios from 'axios';
const cx = classNames.bind(style);

function ProductDetail() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState('standard'); // Mặc định chọn gói tiêu chuẩn
  const { productId } = location.state || {};
  const product = useSelector((state) => state.product?.get_product?.data?.product_info);
  const userid = useSelector((state) => state.auth.login?.currentUser?.user?._id);
  const Author = useSelector((state) => state.user?.userDetails?.data);

  const productName = product?.name;
  const productType = product?.type;
  const productDecription = product?.description;
  const productAuthor= product?.userId;
  const price = product?.price;
  const isImage = productType?.startsWith('image');//check if the file is image or video
  const AuthorName = Author;
  const selectedCategory = product?.category; // Lấy category từ sản phẩm
  const [products, setProducts] = useState([]); // State để lưu trữ dữ liệu sản phẩm
  const [loading, setLoading] = useState(true); // State để xác định trạng thái loading
  const [error, setError] = useState(null); // State để xác định lỗi
  const planData  = useSelector((state) => state.plan.get_plan?.data);
  const isproductDetail = true;
  useEffect(() => {
    if (productId) { 
      getproductId(productId, dispatch);
      
    }
    if(productAuthor){
      getAuthorbyId(productAuthor, dispatch);
    }
  }, [productId, productAuthor ,dispatch]);

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

// Hàm lấy tất cả sản phẩm từ API với các tham số lọc
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL_BE}/product/get-all-products`, {
          params: {
            sortOrder: 'asc',
            sortField: 'name',
            category: selectedCategory, // Thêm tham số category
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
  }, []); // Thay đổi các phụ thuộc theo nhu cầu

  // State để quản lý số lượng sản phẩm
  const [quantity, setQuantity] = useState(1);

  // Xử lý sự kiện khi tăng số lượng
  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Xử lý sự kiện khi giảm số lượng
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  // xử lý sự kiện khi chọn gói thanh toán
  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };
  //

  //related product
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;
  const handleNext = () => {
    if (currentIndex < Math.ceil(products.length / itemsPerPage) - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  // xử lý sự kiện khi mua hàng
  const handlePurchase = () => {
    if(selectedPlan === 'standard'){
      navigator('/checkout', { state: { productId: productId, price: price} });
    }
    else if(selectedPlan === 'premium'){
      navigator('/payPlans');  
    }
  }
  const getImageUrl = (path) => {
    const normalizedPath = path?.replace(/\\/g, "/"); // Chuyển đổi gạch chéo ngược thành gạch chéo
    return `http://localhost:5000/${normalizedPath}`; // Thay đổi URL này theo đường dẫn của server
  };
  const handleDownload = async () => {
    await buy_product_by_plan(product, userid);
  }
  const handleProductClick = (productId) => {
          window.scrollTo(0, 0);
    navigator(`/product-detail`, {state: {productId}});
  };

  return (
    <>
      <section className={cx('product-detail-section')}>
        <div className="container">
          <div className="row gx-5" style={{width:'100%'}}>
            <aside className="col-lg-8">
              <div className={cx('main-image-wrapper')}>
              <div
                className={cx('main-image-container')}
                style={{ cursor: 'pointer' }} // Hiển thị con trỏ chuột như khi nhấp vào liên kết
              >
                <MediaPreview product={product}  isproductDetail={isproductDetail}/>
              </div>
              </div>
              {/* <div className={cx('thumbnail-wrapper')}>
                {['big1.webp', 'big2.webp', 'big3.webp', 'big4.webp', 'big.webp'].map((img, index) => (
                  <a
                    key={index}
                    data-fslightbox="mygalley"
                    className={cx('thumbnail-link')}
                    target="_blank"
                    data-type="image"
                    href={`https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/${img}`}
                  >
                    <img
                      className={cx('thumbnail-image')}
                      src={`https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/${img}`}
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </a>
                ))}
              </div> */}
            </aside>
            <main className="col-lg-4" style={{textAlign:'left'}}>

              <div className={cx('checkout-container')} style={{marginBottom:'20px'}}>
                {userid === productAuthor ? (
                  <div className={cx('ownership-info')}>
                    <p>Bạn đã sở hữu sản phẩm này.</p>
                  </div>
                ) : (
                  <>
                    {planData.length > 0 ? (
                      // If the user has purchased a plan, show the download button
                      <div className={cx('download-section')}>
                        <p>Bạn đã mua gói này.</p>
                        <button 
                          type="button" 
                          className={cx('download-button')} 
                          data-testid="download-button" 
                          onClick={handleDownload}
                        >
                          Lấy ảnh
                        </button>
                      </div>
                    ) : (
                      // If the user hasn't purchased a plan, show the payment options
                      <>
                        <div className={cx('checkout-header')}>
                          <h3 className={cx('checkout-title')} data-testid="checkout-title">Chọn gói thanh toán của bạn</h3>
                          <p className={cx('checkout-description')} data-testid="checkout-description">Lựa chọn gói phù hợp cho dự án của bạn</p>
                        </div>

                        <div className={cx('payment-options')} data-testid="payment-options">
                          <div className={cx('payment-option',  { 'selected-option': selectedPlan === 'standard' })} data-testid="payment-option-standard">
                            <input
                              type="radio"
                              name="payment-plan"
                              id="standardPlan"
                              value="standard"
                              checked={selectedPlan === 'standard'}
                              onChange={handlePlanChange}
                              data-testid="radio-standard"
                            />
                            <label htmlFor="standardPlan" className={cx('option-label')}>
                              <div className={cx('option-content')}>
                                <strong>{price}</strong>
                                {isImage ? (
                                  <span> - Cho tấm ảnh này</span>
                                ) : (
                                  <span> - Cho đoạn video này</span>
                                )}
                              </div>
                              <p className={cx('option-description')}>Thích hợp cho các dự án nhỏ</p>
                            </label>
                          </div>

                          <div className={cx('payment-option', { 'selected-option': selectedPlan === 'premium' })} data-testid="payment-option-premium">
                            <input
                              type="radio"
                              name="payment-plan"
                              id="premiumPlan"
                              value="premium"
                              checked={selectedPlan === 'premium'}
                              onChange={handlePlanChange}
                              data-testid="radio-premium"
                            />
                            <label htmlFor="premiumPlan" className={cx('option-label')}>
                              <div className={cx('option-content')}>
                                <strong>$4.99</strong> - Cho gói tháng
                              </div>
                              <p className={cx('option-description')}>Mua 5 tấm ảnh//video//gif mỗi tháng</p>
                            </label>
                          </div>
                        </div>

                        <div className={cx('checkout-footer')} data-testid="checkout-footer" >
                          <button 
                            type="button" 
                            className={cx('confirm-button')} 
                            data-testid="confirm-button" 
                            onClick={handlePurchase}
                          >
                            Xác nhận mua hàng
                          </button>
                        </div>
                      </>
                    )}
                  </>
                )}

              </div>


              <div className={cx('product-info')}>
                <div className={cx('product-title')}>
                  {productName}
                </div>
                <p className={cx('product-description')}>
                  {productDecription}
                </p>

                <div className={cx('product-details')}>
                <dl className={cx('details-list')}>
                    <div>
                        <dt>Type:</dt>
                        <dd>{productType}</dd>
                    </div>
                    <div>
                        <dt>Author:</dt>
                        <dd>{AuthorName}</dd>
                    </div>
                    </dl>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      <hr />

      {/* related product */}
      <section className={cx('tabs-section')}>
      <div className="container">
        <div className="row" style={{ margin: '32px 0', width: '100%' }}>
          <div className="col">
            <div className={cx('similar-items-wrapper')}>
              <h5 className={cx('similar-items-title')}>Similar items</h5>
              <div className={cx('similar-items-container-wrapper')}>
                <button
                  className={cx('slide-btn', 'prev-btn')}
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                >
                  ‹
                </button>
                <div className={cx('similar-items-container')} 
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: 'transform 0.5s ease-in-out',
                  }}>
                  {products.map((product, index) => (
                    <div className={cx('similar-item-card')} key={index} onClick={()=>{handleProductClick(product._id)}}
                      style={{ width: `${100 / itemsPerPage}%` }}>
                      <a className={cx('similar-item-link')}>
                        <MediaPreview  className={cx('similar-item-image')} product={product} />
                      </a>
                    </div>
                  ))}
                </div>
                <button
                  className={cx('slide-btn', 'next-btn')}
                  onClick={handleNext}
                  disabled={currentIndex >= Math.ceil(products.length / itemsPerPage) - 1}
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>

    </>
  );
}

export default ProductDetail;
