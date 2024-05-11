import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Nếu bạn đang sử dụng React Router
import style from './CategoryList.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

const CategoryList = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (category) => {
    console.log(onSelectCategory);
    onSelectCategory(category);
    setSelectedCategory(category);
  };

  return (
    <div>
      <ul>
        <li>
          <Link
            to="#"
            onClick={() => handleSelectCategory("profile")}
            className={cx({ selected: selectedCategory === "profile" })}
          >
            Profile
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
