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
  const [selectedCategory, setSelectedCategory] = useState('profile');
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className={cx('container')} style={{padding:'0'}}>
      <div className={cx('category-list', 'col-lg-3 col-md-5 col-3')}>
        <CategoryList onSelectCategory={handleCategorySelect} />
      </div>
      <div className={cx('content','col-lg-9 col-md-7 col-9')}>
        {selectedCategory === 'profile' && <UserProfile/>}
        {selectedCategory === 'password' && <Password />}
        {selectedCategory === 'photo-gallery' && <PhotoGallery />}
        {selectedCategory === 'payment-methods' && <PaymentMethods />}
        {!selectedCategory && <h2>Please select a category from the list</h2>}
      </div>
    </div>
  );
};

export default UserProfilePage;
