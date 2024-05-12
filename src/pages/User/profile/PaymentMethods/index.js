import React, { useState } from 'react';
import style from './PaymentMethods.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

const PaymentMethods = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePaymentSelection = (payment) => {
    setSelectedPayment(payment);
  };

  return (
    <div className={cx('container')}>
      <div className={cx('title')}>
        <h4>Select a <span style={{ color: '#6064b6' }}>Payment</span> method</h4>
      </div>

      <form action="#">
        <input type="radio" name="payment" id="visa" onChange={() => handlePaymentSelection('visa')} />
        <input type="radio" name="payment" id="mastercard" onChange={() => handlePaymentSelection('mastercard')} />
        <input type="radio" name="payment" id="paypal" onChange={() => handlePaymentSelection('paypal')} />
        <input type="radio" name="payment" id="AMEX" onChange={() => handlePaymentSelection('AMEX')} />

        <div className={cx('category')}>
          <label htmlFor="visa" className={cx('visaMethod', { 'selected': selectedPayment === 'visa' })}>
            <div className={cx('imgName')}>
              <div className={cx('imgContainer', 'visa')}>
                <img src="https://i.ibb.co/vjQCN4y/Visa-Card.png" alt="" />
              </div>
              <span className={cx('name')}>VISA</span>
            </div>
            <span className={cx('check')}><i className="fas fa-check" style={{ color: '#6064b6' }}></i></span>
          </label>

          <label htmlFor="mastercard" className={cx('mastercardMethod', { 'selected': selectedPayment === 'mastercard' })}>
            <div className={cx('imgName')}>
              <div className={cx('imgContainer', 'mastercard')}>
                <img src="https://i.ibb.co/vdbBkgT/mastercard.jpg" alt="" />
              </div>
              <span className={cx('name')}>Mastercard</span>
            </div>
            <span className={cx('check')}><i className="fas fa-check" style={{ color: '#6064b6' }}></i></span>
          </label>

          <label htmlFor="paypal" className={cx('paypalMethod', { 'selected': selectedPayment === 'paypal' })}>
            <div className={cx('imgName')}>
              <div className={cx('imgContainer', 'paypal')}>
                <img src="https://i.ibb.co/KVF3mr1/paypal.png" alt="" />
              </div>
              <span className={cx('name')}>Paypal</span>
            </div>
            <span className={cx('check')}><i className="fas fa-check" style={{ color: '#6064b6' }}></i></span>
          </label>

          <label htmlFor="AMEX" className={cx('amexMethod', { 'selected': selectedPayment === 'AMEX' })}>
            <div className={cx('imgName')}>
              <div className={cx('imgContainer', 'AMEX')}>
                <img src="https://i.ibb.co/wQnrX86/American-Express.jpg" alt="" />
              </div>
              <span className={cx('name')}>AMEX</span>
            </div>
            <span className={cx('check')}><i className="fas fa-check" style={{ color: '#6064b6' }}></i></span>
          </label>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethods;
