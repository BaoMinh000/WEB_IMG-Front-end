import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Nếu bạn đang sử dụng React Router
import style from './CategoryList.module.scss';
import classNames from 'classnames/bind';
import IMG from '../../../../Asset/Img/Logo/logo512.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';


const cx = classNames.bind(style);

const CategoryList = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState('account');
  const user = useSelector((state) => state.user?.userDetails);
  const username = user?.data?.username;
  const handleSelectCategory = (category) => {
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
        <h3 className={cx('user-name')}>{username}</h3>
      </div>
      <ul className={cx('CategoryList')}>
        <li>
          <Link
            to="#account"
            onClick={() => handleSelectCategory("account")}
            className={cx({ selected: selectedCategory === "account" })}
          >
            Account
          </Link>
        </li>
        <li>
          <Link
            to="#password"
            onClick={() => handleSelectCategory("password")}
            className={cx({ selected: selectedCategory === "password" })}
          >
            Password
          </Link>
        </li>
        <li>
          <Link
            to="#photo-gallery"
            onClick={() => handleSelectCategory("photo-gallery")}
            className={cx({ selected: selectedCategory === "photo-gallery" })}
          >
            Kho ảnh
          </Link>
        </li>
        <li>
          <Link
            to="#payment-methods"
            onClick={() => handleSelectCategory("payment-methods")}
            className={cx({ selected: selectedCategory === "payment-methods" })}
          >
            Phương thức thanh toán
          </Link>
        </li>
        <li>
          <Link
            to="#settings"
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
