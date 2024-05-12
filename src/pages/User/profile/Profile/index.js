import React, { useState } from 'react';
import style from './Profile.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

const UserProfile = ({ user }) => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(user?.user);

  const handleChange = (fieldName, event) => {
    const { value } = event.target;
    setUserData({
      ...userData,
      [fieldName]: value,
    });
  };

  const getValueOrDefault = (fieldName) => {
    return userData ? userData[fieldName] : '';
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset userData to original value if needed
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save userData if needed
  };

  return (
    <div>
      <div style={{display: 'flex'}}>
        <h2 className={cx('title-page')} style={{width:'100%',alignItems:'center'}}>Profile Information</h2>
        <div className='btn btn--primary btn--size-m-' style={{marginLeft:'auto', marginRight:'12px'}} onClick={handleEdit}>Edit</div>  
      </div>
      <div className={cx("card-body")}>
        <div className={cx("form-group")}>
          <label className={cx("form-label")} htmlFor="firstName">First Name</label>
          <input 
            id="firstName" 
            type="text" className={cx("form-control")} 
            defaultValue={getValueOrDefault('firstName')} 
            onChange={(e) => handleChange('firstName', e)} 
            readOnly={!isEditing}
          />
        </div>
        <div className={cx("form-group")}>
          <label className={cx("form-label")} htmlFor="lastName">Last Name</label>
          <input 
            id="lastName" 
            type="text" 
            className={cx("form-control")} 
            value={getValueOrDefault('lastName')} 
            onChange={(e) => handleChange('lastName', e)} 
            readOnly={!isEditing}
          />
        </div>
        <div className={cx("form-group")}>
          <label className={cx("form-label")} htmlFor="username">Username</label>
          <input 
            id="username" 
            type="text" 
            className={cx("form-control", "mb-1")} 
            value={getValueOrDefault('username')} 
            onChange={(e) => handleChange('username', e)} 
            readOnly={!isEditing}
          />
        </div>
        <div className={cx("form-group")}>
          <label className={cx("form-label")} htmlFor="email">E-mail</label>
          <input 
            id="email" 
            type="text" 
            className={cx("form-control", "mb-1")} 
            value={getValueOrDefault('email')} 
            onChange={(e) => handleChange('email', e)} 
            readOnly={!isEditing}
          />
        </div>
        <div className={cx("form-group")}>
          <label className={cx("form-label")} htmlFor="phone">Phone</label>
          <input 
            id="phone" 
            type="text" 
            className={cx("form-control")} 
            value={getValueOrDefault('phone')} 
            onChange={(e) => handleChange('phone', e)} 
            readOnly={!isEditing}
          />
        </div>
        <div className={cx("form-group")}>
          <label className={cx("form-label")} htmlFor="address">Address</label>
          <input 
            id="address" 
            type="text" 
            className={cx("form-control")} 
            value={getValueOrDefault('address')} 
            onChange={(e) => handleChange('address', e)} 
            readOnly={!isEditing}
          />
        </div>
      </div>
      {isEditing && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '14px'}}>
          <div className='btn btn--primary btn--size-m-' onClick={handleCancel} style={{marginRight:'12px'}}>Cancel</div>  
          <div className='btn btn--primary btn--size-m-' onClick={handleSave} style={{marginRight:'12px'}}>Save</div>  
        </div>
      )}
    </div>
  );
};

export default UserProfile;
