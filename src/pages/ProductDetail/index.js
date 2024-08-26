import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './Product.module.scss';
import MediaPreview from '../../Component/Mediatype/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getproductId } from '../../Redux/ApiRequest';
const cx = classNames.bind(style);

function ProductDetail() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState('standard'); // Mặc định chọn gói tiêu chuẩn
  const { productId } = location.state || {};
  const product = useSelector((state) => state.product?.get_product?.data?.product_info);
  console.log("Product data received:", product);
  const productName = product?.name;
  const productType = product?.type;
  const productDecription = product?.description;
  const productAuthor= product?.userid;
  const price = product?.price;
  const isImage = productType?.startsWith('image');//check if the file is image or video

  useEffect(() => {
    if (productId) { 
      getproductId(productId, dispatch);
    }
  }, [productId, dispatch]);
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
  const items = [
    {
      title: "GoPro HERO6 4K Action Camera - Black",
      price: "$790.50",
      img: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/9.webp",
      href: "#"
    },
    {
      title: "Canon camera 20x zoom, Black color",
      price: "$320.00",
      img: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp",
      href: "#"
    },
    {
      title: "Xiaomi Redmi 8 Original Global Version 4GB",
      price: "$120.00",
      img: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/11.webp",
      href: "#"
    },
    {
      title: "Apple iPhone 12 Pro 6.1\" RAM 6GB 512GB",
      price: "$1450.00",
      img: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/12.webp",
      href: "#"
    },
    {
      title: "Samsung Galaxy S21 Ultra",
      price: "$1200.00",
      img: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/13.webp",
      href: "#"
    },
    {
      title: "Sony WH-1000XM4",
      price: "$350.00",
      img: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/14.webp",
      href: "#"
    },
    {
      title: "Sony WH-1000XM4",
      price: "$350.00",
      img: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/14.webp",
      href: "#"
    },
    {
      title: "Samsung Galaxy S21 Ultra",
      price: "$1200.00",
      img: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/13.webp",
      href: "#"
    },
    {
      title: "Sony WH-1000XM4",
      price: "$350.00",
      img: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/14.webp",
      href: "#"
    },
    {
      title: "Sony WH-1000XM4",
      price: "$350.00",
      img: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/14.webp",
      href: "#"
    },
    {
      title: "Samsung Galaxy S21 Ultra",
      price: "$1200.00",
      img: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/13.webp",
      href: "#"
    },
    {
      title: "Sony WH-1000XM4",
      price: "$350.00",
      img: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/14.webp",
      href: "#"
    },
    {
      title: "Sony WH-1000XM4",
      price: "$350.00",
      img: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/14.webp",
      href: "#"
    },    {
      title: "Samsung Galaxy S21 Ultra",
      price: "$1200.00",
      img: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/13.webp",
      href: "#"
    },
    {
      title: "Sony WH-1000XM4",
      price: "$350.00",
      img: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/14.webp",
      href: "#"
    },
    {
      title: "Sony WH-1000XM4",
      price: "$350.00",
      img: "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/14.webp",
      href: "#"
    },
    // Add more items here if needed
  ];

  //related product
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;
  const handleNext = () => {
    if (currentIndex < Math.ceil(items.length / itemsPerPage) - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  console.log(items.length);
  // xử lý sự kiện khi mua hàng
  const handlePurchase = () => {
    if(selectedPlan === 'standard'){
      navigator('/checkout', { state: { productId: productId, price: price} });
    }
    else if(selectedPlan === 'premium'){

    }
  }
  const getImageUrl = (path) => {
    const normalizedPath = path?.replace(/\\/g, "/"); // Chuyển đổi gạch chéo ngược thành gạch chéo
    return `http://localhost:5000/${normalizedPath}`; // Thay đổi URL này theo đường dẫn của server
  };
  return (
    <>
      <section className={cx('product-detail-section')}>
        <div className="container">
          <div className="row gx-5" style={{width:'100%'}}>
            <aside className="col-lg-8">
              <div className={cx('main-image-wrapper')}>
                <a
                  data-fslightbox="mygalley"
                  className={cx('main-image-link')}
                  target="_blank"
                  data-type="image"
                  href={getImageUrl(product?.path)} rel="noreferrer"
                >
                  <MediaPreview product={product}/>
                </a>
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
                        {isImage?(
                          <span> -Cho tấm ảnh này</span>
                        ):(
                          <span> -Cho đoạn video này</span>
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
                      data-testid="radio-premium"
                      onChange={handlePlanChange}
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
                        <dd>{productAuthor}</dd>
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
                  {items.map((item, index) => (
                    <div className={cx('similar-item-card')} key={index} 
                      style={{ width: `${100 / itemsPerPage}%` }}>
                      <a href={item.href} className={cx('similar-item-link')}>
                        <img
                          src={item.img}
                          className={cx('similar-item-image')}
                          alt={item.title}
                        />
                      </a>
                    </div>
                  ))}
                </div>
                <button
                  className={cx('slide-btn', 'next-btn')}
                  onClick={handleNext}
                  disabled={currentIndex >= Math.ceil(items.length / itemsPerPage) - 1}
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
