import React from 'react';
import styles from './productdetail.module.scss';
import classNames from 'classnames/bind';
import img from "../../Asset/Img/demo.jpg"; // Đường dẫn đến ảnh demo
import suggestionImg1 from "../../Asset/Img/demo.jpg"; // Đường dẫn đến ảnh gợi ý 1
import suggestionImg2 from "../../Asset/Img/demo.jpg"; // Đường dẫn đến ảnh gợi ý 2
import suggestionImg3 from "../../Asset/Img/demo.jpg"; // Đường dẫn đến ảnh gợi ý 3
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function ProductDetail() {

    const isEditing = useSelector((state) => state.user.isEditing);

    const image = {
        url: img,
        title: 'Anh chàng giao xe đạp',
        description: 'Anh chàng giao xe đạp với chiếc điện thoại.',
        dimensions: '6720 x 4480 px (56,90 x 37,93 cm) - 300 dpi',
        uploadDate: '7 Tháng sáu 2019',
        location: 'Serbia',
        category: 'Các bức ảnh sẵn có | Xe đạp'
    };

    const suggestions = [
        { url: suggestionImg1, title: 'Ảnh gợi ý 1' },
        { url: suggestionImg2, title: 'Ảnh gợi ý 2' },
        { url: suggestionImg3, title: 'Ảnh gợi ý 3' },
    ];

    return (
        <div className={cx('product-detail', 'container', 'mt-5')} style={{display: 'block'}}>
            <div className={cx('row', 'main-content')}>
                <div className={cx('col-8', 'image-section')}>
                    <img src={image.url} alt={image.title} className="img-fluid" />
                </div>
                <div className={cx('col-4', 'info-section')}>
                    <h2>{image.title}</h2>
                    <p>{image.description}</p>
                    <p><strong>Kích thước:</strong> {image.dimensions}</p>
                    <p><strong>Ngày tải lên:</strong> {image.uploadDate}</p>
                    <p><strong>Location:</strong> {image.location}</p>
                    <p><strong>Danh mục:</strong> {image.category}</p>
                    <button className="btn btn-danger btn-lg">Tải xuống miễn phí</button>

                    {!isEditing ? (
                        <button className="btn btn-outline-secondary btn-lg mt-3">Đăng nhập</button>
                    ) : null}


                </div>
            </div>
            <div className={cx('row', 'suggestions')}>
                <h3 className={cx('col-12', 'suggestion-title')}>Ảnh gợi ý</h3>
                {suggestions.map((suggestion, index) => (
                    <div key={index} className={cx('col-2', 'suggestion-item')}>
                        <img src={suggestion.url} alt={suggestion.title} className="img-fluid rounded" />
                        <p>{suggestion.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductDetail;
