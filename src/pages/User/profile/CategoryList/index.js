import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Nếu bạn đang sử dụng React Router
import style from './CategoryList.module.scss';
import classNames from 'classnames/bind';
import IMG from '../../../../Asset/Img/Logo/logo512.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

const CategoryList = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (category) => {
    console.log(onSelectCategory);
    onSelectCategory(category);
    setSelectedCategory(category);
  };

  return (
    <div className={cx('category-list-container')}>
      <div className={cx('user-info')}>
        <div className={cx('user-avatar')}>
          <img src={IMG} alt="Avatar" className={cx('avatar')}/>
          <button className={cx('edit-button')}>
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
        <h3 className={cx('user-name')}>Bao Minh</h3>
      </div>
      <ul className={cx('CategoryList')}>
        <li>
          <Link
            to="#"
            onClick={() => handleSelectCategory("profile")}
            className={cx({ selected: selectedCategory === "profile" })}
          >
            Account
          </Link>
        </li>
        <li>
          <Link
            to="#"
            onClick={() => handleSelectCategory("password")}
            className={cx({ selected: selectedCategory === "password" })}
          >
            Password
          </Link>
        </li>
        <li>
          <Link
            to="#"
            onClick={() => handleSelectCategory("photo-gallery")}
            className={cx({ selected: selectedCategory === "photo-gallery" })}
          >
            Kho ảnh
          </Link>
        </li>
        <li>
          <Link
            to="#"
            onClick={() => handleSelectCategory("payment-methods")}
            className={cx({ selected: selectedCategory === "payment-methods" })}
          >
            Phương thức thanh toán
          </Link>
        </li>
        <li>
          <Link
            to="#"
            onClick={() => handleSelectCategory("settings")}
            className={cx({ selected: selectedCategory === "settings" })}
          >
            Cài đặt
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CategoryList;
