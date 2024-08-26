import React, { useEffect } from 'react';

const PayPalButton = () => {
  useEffect(() => {
    // Đảm bảo rằng PayPal SDK đã được tải
    if (window.paypal) {
      // Khởi tạo PayPal Hosted Buttons
      window.paypal.HostedButtons({
        hostedButtonId: 'JG64KS6FQN9SN'
      }).render('#paypal-container-JG64KS6FQN9SN');
    } else {
      console.error('PayPal SDK is not loaded');
    }
  }, []);

  return (
    <div id="paypal-container-JG64KS6FQN9SN"></div>
  );
};

export default PayPalButton;
