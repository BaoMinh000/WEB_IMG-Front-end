import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Password.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Password = ({ accessToken, userId }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    repeatNewPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (fieldName, event) => {
    const { value } = event.target;
    setPasswordData({
      ...passwordData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async () => {
    // So sánh password mới và password mới lặp lại
    if (passwordData.newPassword !== passwordData.repeatNewPassword) {
      alert('New password and repeat new password do not match');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/user/changePassword/${userId}`, passwordData, {
        headers: {
          token: accessToken,
        },
      });

      if (response.status === 200) {
        alert('Password updated successfully');
        window.location.reload(); // Làm mới trang
        navigate("/"); // Điều hướng về trang chủ
      } else {
        alert(response.data.message || 'Failed to update password');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the password');
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex' }}>
        <h2 className={cx('title-page')} style={{ width: '100%', alignItems: 'center' }}>Password Setting</h2>
      </div>
      <div className={cx("card-body")}>
        <div className={cx("form-group")}>
          <label className={cx("form-label")} htmlFor="currentPassword">Current password</label>
          <input
            id="currentPassword"
            type="password"
            className={cx("form-control")}
            value={passwordData.currentPassword}
            onChange={(e) => handleChange('currentPassword', e)}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <div className={cx("form-group")}>
            <label className={cx("form-label")} htmlFor="newPassword">New password</label>
            <input
              id="newPassword"
              type="password"
              className={cx("form-control")}
              value={passwordData.newPassword}
              onChange={(e) => handleChange('newPassword', e)}
            />
          </div>
          <div className={cx("form-group")}>
            <label className={cx("form-label")} htmlFor="repeatNewPassword">Repeat new password</label>
            <input
              id="repeatNewPassword"
              type="password"
              className={cx("form-control")}
              value={passwordData.repeatNewPassword}
              onChange={(e) => handleChange('repeatNewPassword', e)}
            />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '14px' }}>
        <div className="btn btn--primary btn--size-m-" onClick={handleSubmit}>Update</div>
      </div>
    </div>
  );
}

export default Password;
