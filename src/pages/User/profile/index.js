import React, { useState } from 'react';
import CategoryList from './CategoryList';
import UserProfile from './Profile';
import PhotoGallery from './PhotoGallery';
import PaymentMethods from './PaymentMethods';
import Password from './Password';
import style from './Userprofile.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

const UserProfilePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('account');
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  const accessToken = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const userId = user.user?._id;
  return (
    <div className={cx('container')} style={{padding:'0'}}>
      <div className={cx('category-list', 'col-lg-3 col-md-5 col-3')}>
        <CategoryList onSelectCategory={handleCategorySelect} />
      </div>
      <div className={cx('content','col-lg-9 col-md-7 col-9')}>
        {selectedCategory === 'account' && <UserProfile accessToken={accessToken} userId={userId}/>}
        {selectedCategory === 'password' && <Password accessToken={accessToken} userId={userId}/>}
        {selectedCategory === 'photo-gallery' && <PhotoGallery />}
        {selectedCategory === 'payment-methods' && <PaymentMethods />}
        {!selectedCategory && <h2>Please select a category from the list</h2>}
      </div>
    </div>
  );
};

export default UserProfilePage;
