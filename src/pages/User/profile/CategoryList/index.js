import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Nếu bạn đang sử dụng React Router
import style from './CategoryList.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
const cx = classNames.bind(style);

const getImageUrl = (path) => {
  const normalizedPath = path?.replace(/\\/g, "/"); // Chuyển đổi gạch chéo ngược thành gạch chéo
  return `http://localhost:5000${normalizedPath}`; // Thay đổi URL này theo đường dẫn của server
};

const CategoryList = ({ onSelectCategory }) => {
  const [file, setFile] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('account');
  const user = useSelector((state) => state.user?.userDetails);
  const username = user?.data?.username;
  const avatar = user?.data?.avatar;
  const userId = user?.data?._id;
  const token = localStorage.getItem('token');
  
  const handleSelectCategory = (category) => {
    onSelectCategory(category);
    setSelectedCategory(category);
  };
 // Mở modal
 const openModal = () => setModalIsOpen(true);

 // Đóng modal
 const closeModal = () => setModalIsOpen(false);
  // Xử lý upload file (chức năng cơ bản)
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(file);
    
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await axios.post(`${process.env.REACT_APP_URL_BE}/user/updateAvatar/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: token,
        },
      });
      if (response.status === 200) {
        toast.success('Avatar updated successfully');
        window.location.reload();
      };

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className={cx('category-list-container')}>
      <div className={cx('user-info')}>
        <div className={cx('user-avatar')} style={{position:'relative'}}>
          <img src={getImageUrl(avatar)} alt="Avatar" className={cx('avatar')}/>
          <button className={cx('edit-button')} onClick={openModal}>
            <FontAwesomeIcon icon={faPen} />
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Upload Image"
            className={cx('modal')}
            overlayClassName={cx('overlay')}
          >
            <h2>Upload Image</h2>
              <button className={cx('btn-close')} onClick={closeModal}>Close</button>
            <form onSubmit={handleSubmit}>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <button type="submit">Upload Avatar</button>
            </form>
          </Modal>
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
            to="#UploadCSV"
            onClick={() => handleSelectCategory("UploadCSV")}
            className={cx({ selected: selectedCategory === "UploadCSV" })}
          >
            Upload CSV
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
