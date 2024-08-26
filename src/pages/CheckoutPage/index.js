import React from 'react';
import classNames from 'classnames/bind';
import styles from './CheckoutPage.module.scss'; // Giả sử bạn có file CSS riêng
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { getproductId } from '../../Redux/ApiRequest';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MediaPreview from '../../Component/Mediatype';
import { PayPalButton } from "react-paypal-button-v2";
import { getConfig } from '../../Service/paymentService';

const cx = classNames.bind(styles);

function Checkout() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const product = useSelector((state) => state.product?.get_product?.data?.product_info);
    const [sdkReady, setSdkReady] = useState(false);
    const { productId, price } = location.state || {};
    const product_name = product?.name;
    console.log('productId', productId);

    const user = localStorage.getItem('user');
    const user_id = JSON.parse(user)?.user?._id;
    console.log('userid',user_id);
    
    // Tạo hàm để thêm script PayPal SDK vào trang web
    const addPaypalScript = async () => {
        const { data } = await getConfig();
        console.log('data', data);
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
        script.async = true;
        script.onload = () => setSdkReady(true);
        document.body.appendChild(script);
    };
    
    // Gọi hàm addPaypalScript khi component được render
    useEffect(() => {
        if (!window.paypal) {
            addPaypalScript();
        } else {
            setSdkReady(true);
            console.log(sdkReady);
            
        }
    }, []);
    
    // Hàm tạo đơn hàng
    const createOrder = async (data, actions) => {
        console.log('product',product);
            
        try {
          // Gửi yêu cầu đến backend để tạo đơn hàng
          const response = await fetch(`${process.env.REACT_APP_URL_BE}/payment/create-order`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              items: [
                {
                    name: product.name,  // Tên sản phẩm
                    quantity: 1,  // Số lượng
                    product: product,  // Thông tin sản phẩm
                },
              ],
              user_Id: user_id,
            }),
          });
    
            const order = await response.json();
            console.log('order', order);
            if (!order.orderId) {
                throw new Error('Order ID is missing from backend response.');
            }
    
            // Trả về order ID để PayPal xử lý thanh toán
            return order.orderId;

        } catch (error) {
          console.error('Error creating order:', error);
          throw error;
        }
    }
    
    // Hàm xử lý khi người dùng xác nhận thanh toán
    const onApprove = async (data, actions) => {
        try {
            // Xác nhận thanh toán
            const details = await actions.order.capture();
            
            // Hiển thị thông báo cho người dùng
            alert('Transaction completed by ' + (details.payer.name ? details.payer.name.given_name : 'Unknown'));
            console.log('DETAILS', details);
            
            // Gửi thông tin thanh toán đến backend để cập nhật cơ sở dữ liệu
            const response = await fetch(`${process.env.REACT_APP_URL_BE}/payment/update-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: data.orderID,  // ID của đơn hàng PayPal
                    payerId: data.payerID,  // ID của người thanh toán
                    paymentDetails: details, // Thông tin chi tiết giao dịch
                    ispay: true,  // Cập nhật trạng thái đã thanh toán
                    user_Id: user_id,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update order status');
            }
    
            const result = await response.json();
            console.log('Order updated successfully:', result);
            
            // Thực hiện các hành động bổ sung nếu cần

            // await updateUserProducts(user, product);

        } catch (error) {
            console.error('Error capturing order:', error);
            alert('Error capturing order');
        }
    };
    
    // Hàm cập nhật thông tin sản phẩm sau khi thanh toán
    const updateUserProducts = async (user, product) => {
        try {
            // Gửi yêu cầu cập nhật thông tin sản phẩm
            const response = await fetch(`${process.env.REACT_APP_URL_BE}/product/create-product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user,  // Thông tin người dùng
                    product: product,  // Thông tin sản phẩm
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update user products');
            }
    
            const result = await response.json();
            console.log('User products updated successfully:', result);
            
            // Thực hiện các hành động bổ sung nếu cần
        } catch (error) {
            console.error('Error updating user products:', error);
            alert('Error updating user products');
        }
    };
    useEffect(() => {
        if (productId) {
            getproductId(productId, dispatch);
        }
    }, [productId, dispatch]);

    return (
        <div className='row' style={{ width: '100%', height: "100%", minHeight:'700px' }}>
            <div className={cx('checkout-container', 'container-fluid')}>
                <div className={cx('left-side', 'col-lg-8')}>
                    <div className={cx('text-box')}>
                        <h1 className={cx('home-heading')}>Summary</h1>
                    </div>
                    <hr className={cx('left-hr')} />
                    <div className={cx('home-product-list')}>
                        <div className={cx('home-product-item')}>
                            <MediaPreview product={product} />
                        </div>
                    </div>
                    <hr className={cx('left-hr')} />
                    <div>
                        <p className={cx('home-desc')}>
                            <em>Entire home</em> for <em>2 guest</em>
                        </p>
                        <p className={cx('home-desc')}>
                            <em>Tue, July 23, 2022</em> to <em>Thu, July 25, 2022</em>
                        </p>
                    </div>
                </div>

                <div className={cx('right-side', 'col-lg-4')}>
                    <div className={cx('receipt')}>
                        <h2 className={cx('receipt-heading')}>Receipt Summary</h2>
                        <table className={cx('table')}>
                            <tbody>
                                <tr>
                                    <td>{product_name}</td>
                                    <td className={cx('price')}>{price}</td>
                                </tr>
                                <tr>
                                    <td>Discount</td>
                                    <td className={cx('price')}>0.00 USD</td>
                                </tr>
                                <tr className={cx('total')}>
                                    <td>Total</td>
                                    <td className={cx('price')}>546.41 USD</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={cx('payment-info')}>
                        <h3 className={cx('payment-heading')}>Payment Method</h3>
                        <form className={cx('form-box')} 
                            encType="text/plain" 
                            method="get" 
                            target="_blank"
                        >
                            <div>
                                {user ? (
                                    sdkReady ? (
                                        <PayPalButton
                                            createOrder={createOrder}
                                            onApprove={onApprove}
                                            onError={(error) => {
                                                alert('Error', error);
                                            }}
                                        />
                                    ) : (
                                        <div>Loading PayPal...</div>
                                    )
                                ) : (
                                    <button className={cx('btn')} onClick={()=>{window.location.href = '/login'}}>
                                        Đăng nhập để thực hiện thanh toán
                                    </button>                             
                                    )}
                            </div>
                        </form>

                        <p className={cx('footer-text')}>
                            <i className={cx('fa-solid', 'fa-lock')}></i>
                            Your credit card information is encrypted
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
