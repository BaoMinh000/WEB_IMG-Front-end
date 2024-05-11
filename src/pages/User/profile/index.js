import React, { useState } from 'react';
import CategoryList from './CategoryList';
import UserProfile from './Profile';
import PhotoGallery from './PhotoGallery';
import PaymentMethods from './PaymentMethods';
import style from './Userprofile.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

const UserProfilePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className={cx('container')}>
      <div className={cx('category-list col l-3')}>
        <h2>Categories</h2>
        <CategoryList onSelectCategory={handleCategorySelect} />
      </div>
      <div className={cx('content col l-9')}>
        {selectedCategory === 'profile' && <UserProfile />}
        {selectedCategory === 'photo-gallery' && <PhotoGallery />}
        {selectedCategory === 'payment-methods' && <PaymentMethods />}
        {!selectedCategory && <h2>Please select a category from the list</h2>}
      </div>
    </div>
  );
};

export default UserProfilePage;
