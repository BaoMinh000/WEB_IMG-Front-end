import React from 'react';
import classNames from 'classnames/bind';
import style from '../../pages/User/profile/PhotoGallery/PhotoGallery.module.scss';
import ImageWithWatermark from '../../Component/Watermark/index';
import VideoWithWatermark from '../../Component/Watermark/VideoWithWatermark';
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
const MediaPreview = ({ product, ispagephoto, isproductDetail }) => {
    // Xác định loại media từ type của sản phẩm
    const mediaType = getMediaType(product?.type);
    const watermarkText = 'Your Watermark';
    // Chuyển đổi đường dẫn hình ảnh
    const getImageUrl = (path) => {
        const normalizedPath = path.replace(/\\/g, "/"); // Chuyển đổi gạch chéo ngược thành gạch chéo
        return `http://localhost:5000/${normalizedPath}`; // Thay đổi URL này theo đường dẫn của server
    };

    return (
        <>
            {mediaType === 'image' ? (
                ispagephoto ? (
                    // Sử dụng thẻ img thông thường nếu ispagephoto là true
                    <img src={getImageUrl(product.path)} alt="Preview" className={cx('product-image')} />
                ) : (
                    // Sử dụng ImageWithWatermark nếu ispagephoto là false
                    <ImageWithWatermark className={cx('product-image')} imageUrl={getImageUrl(product.path)} watermarkText={watermarkText} />
                )
            ) : mediaType === 'video' ? (
                isproductDetail ? (
                    <video src={getImageUrl(product.path)} className={cx('product-image')} controls></video>
                ):(
                    <video src={getImageUrl(product.path)} className={cx('product-image')}
                        controls={false}      // Tắt các điều khiển của video
                        autoPlay={false}      // Video không tự động phát
                        loop={false}          // Video không phát lại liên tục
                        muted={true}          // Video không phát âm thanh
                        playsInline           // Video không mở full-screen trên di động
                    ></video>
                )
            ) : null}

        </>
    );
};

export default MediaPreview;
