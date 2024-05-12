import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Password.module.scss';

const cx = classNames.bind(styles);

const Password = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    repeatNewPassword: ''
  });

  const handleChange = (fieldName, event) => {
    const { value } = event.target;
    setPasswordData({
      ...passwordData,
      [fieldName]: value,
    });
  };

  const handleSubmit = () => {
    // Xử lý logic khi người dùng nhấn nút "Update" ở đây
  };

  return ( 
    <div style={{width:'100%'}}>
      <div style={{display: 'flex'}}>
        <h2 className={cx('title-page')} style={{width:'100%',alignItems:'center'}}>Password Setting</h2>
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
        <div style={{display: 'flex'}}>
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
