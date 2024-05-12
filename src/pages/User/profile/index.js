import React, { useState } from 'react';
import CategoryList from './CategoryList';
import UserProfile from './Profile';
import PhotoGallery from './PhotoGallery';
import PaymentMethods from './PaymentMethods';
import Password from './Password';
import style from './Userprofile.module.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

const cx = classNames.bind(style);

const UserProfilePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('profile');
  const user = useSelector((state) => state.auth.login.currentUser);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className={cx('container')}>
      <div className={cx('category-list col l-3')}>
        <CategoryList onSelectCategory={handleCategorySelect} />
      </div>
      <div className={cx('content','col l-9')}>
        {selectedCategory === 'profile' && <UserProfile user={user} />}
        {selectedCategory === 'password' && <Password />}
        {selectedCategory === 'photo-gallery' && <PhotoGallery />}
        {selectedCategory === 'payment-methods' && <PaymentMethods />}
        {!selectedCategory && <h2>Please select a category from the list</h2>}
      </div>
    </div>
  );
};

export default UserProfilePage;
