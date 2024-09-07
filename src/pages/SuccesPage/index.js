// SuccessPage.js
import React from 'react';
import styles from './SuccessPage.module.scss'; // Import CSS Module

const SuccessPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className={styles.checkIcon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className={styles.title}>Thanh toán thành công!</h1>
        <p className={styles.message}>Cảm ơn bạn đã mua sắm với chúng tôi.</p>
        <button className={styles.button} onClick={() => window.location.href = '/'}>
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
