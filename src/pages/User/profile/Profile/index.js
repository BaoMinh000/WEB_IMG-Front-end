import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <img src="../../../../../public/logo192.png" alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
      </div>
      <p>Name: Bao MInh</p>
      <p>Email: baominh@gmail.com</p>
      <p>Age: 20</p>
      <p>Phone: 000-xxxx-xxx</p>
      {/* Thêm các thông tin khác về người dùng tại đây */}
    </div>
  );
};

export default UserProfile;
