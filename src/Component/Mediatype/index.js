import React from 'react';
import classNames from 'classnames/bind';
import style from '../../pages/User/profile/PhotoGallery/PhotoGallery.module.scss';

// Tạo classNames với style module
const cx = classNames.bind(style);

// Hàm để xác định loại media (hình ảnh hoặc video)
const getMediaType = (type) => {
    const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    const videoTypes = ['video/mp4', 'video/webm', 'video/ogg'];

    if (imageTypes.includes(type)) {
        return 'image';
    } else if (videoTypes.includes(type)) {
        return 'video';
    }
    return null;
};

// Component để hiển thị media
const MediaPreview = ({ product }) => {
    // Xác định loại media từ type của sản phẩm
    const mediaType = getMediaType(product?.type);

    // Chuyển đổi đường dẫn hình ảnh
    const getImageUrl = (path) => {
        const normalizedPath = path.replace(/\\/g, "/"); // Chuyển đổi gạch chéo ngược thành gạch chéo
        return `http://localhost:5000/${normalizedPath}`; // Thay đổi URL này theo đường dẫn của server
    };

    return (
        <>
            {mediaType === 'image' ? (
                <img src={getImageUrl(product.path)} alt="Preview" className={cx('product-image')} />
            ) : mediaType === 'video' ? (
                <video src={getImageUrl(product.path)} className={cx('product-image')} controls></video>
            ) : null}
        </>
    );
};

export default MediaPreview;
