import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userDetailsStart, userDetailsFailure} from '../../../../Redux/UserSlice';
import { getUserDetails, updateUser } from '../../../../Redux/ApiRequest';
import style from './Profile.module.scss';
import classNames from 'classnames/bind';
import axiosJWT from '../../../../api/axiosJWT';
import axios from 'axios';

const cx = classNames.bind(style);

const UserProfile = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const userDetails = useSelector((state) => state.user?.userDetails);
  const isFetching = useSelector((state) => state.user?.isFetching);
  const error = useSelector((state) => state.user.error);
  const [isEditing, setIsEditing] = useState(false);

  const user = JSON.parse(localStorage.getItem('user')) || {};
  const accessToken = localStorage.getItem('token');
  const userId = user.user?._id;

  console.log('userdataSave:', userData); 
  useEffect(() => {
    if (!userId || !accessToken) {
      return;
    }

    dispatch(userDetailsStart());

    const UserDetails = async () => {
      try {
        const response = await getUserDetails(accessToken, dispatch, userId, axiosJWT);
        setUserData(response.data);
      } catch (err) {
        dispatch(userDetailsFailure());
        console.error('Error fetching user details:', err);
      }
    };

    UserDetails();
  }, [dispatch, accessToken, userId]);

  useEffect(() => {
    if (userDetails?.data) {
      setUserData(userDetails.data);
    }
  }, [userDetails]);

  const handleChange = (fieldName, event) => {
    const { value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const getValueOrDefault = (fieldName) => {
    return userData ? userData[fieldName] || '' : '';
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUserData(userDetails?.data || {});
  };

  const handleSave = async () => {
    try {
        console.log('Token from update:', accessToken);

        const res = await axios.put(`http://localhost:5000/user/updateUser/${userId}`, userData, {
            headers: {
                token: accessToken, // Correct header for token
            },
        });

        console.log('Response:', res);
    } catch (err) {
        console.error('Error updating user details:', err);
    }
};


  if (!user || !user.user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <h2 className={cx('title-page')} style={{ width: '100%', alignItems: 'center' }}>
          Profile Information
        </h2>
        {!isEditing && (
          <button
            className='btn btn--primary btn--size-m-'
            style={{ marginLeft: 'auto', marginRight: '12px' }}
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
      </div>
      {isFetching && <p>Loading...</p>}
      {error && <p>Error fetching user details</p>}
      <div className={cx("card-body")}>
        <div className={cx("form-group")}>
          <label className={cx("form-label")} htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            className={cx("form-control")}
            value={getValueOrDefault('firstName')}
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
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '14px' }}>
          <button className='btn btn--primary btn--size-m-' onClick={handleCancel} style={{ marginRight: '12px' }}>
            Cancel
          </button>
          <button className='btn btn--primary btn--size-m-' onClick={handleSave} style={{ marginRight: '12px' }}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
