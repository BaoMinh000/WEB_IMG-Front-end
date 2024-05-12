import React, { useState } from 'react';
import style from './PhotoGallery.module.scss';
import classNames from 'classnames/bind';

import IMG from '../../../../Asset/Img/Logo/logo512.png';
const cx = classNames.bind(style);

const PhotoGallery = () => {
  const [activeTab, setActiveTab] = useState('photos');
  const [images, setImages] = useState([
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    { url: IMG },
    // Thêm các đường dẫn ảnh khác vào đây
  ]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <h2 className={cx('title-page')} style={{ width: '100%', alignItems: 'center' }}>Photo Gallery</h2>
      </div>
      <div className={cx('tabs')}>
        <div className={cx('tab', { 'active': activeTab === 'photos' })} onClick={() => handleTabClick('photos')}>Photos</div>
        <div className={cx('tab', { 'active': activeTab === 'videos' })} onClick={() => handleTabClick('videos')}>Videos</div>
        <div className={cx('tab', { 'active': activeTab === 'gifs' })} onClick={() => handleTabClick('gifs')}>GIFs</div>
      </div>
      {activeTab === 'photos' && (
        <div>
          {/* Hiển thị nội dung cho tab ảnh */}
          <div className={cx('content')}>
            {images.length === 0 ? (
              <p>No photos available.</p>
            ) : (
              <div className={cx('photo-grid')}>
                {images.map((image, index) => (
                  <div key={index} className={cx('photo')}>
                    <img src={image.url} alt={`Photo ${index}`} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {activeTab === 'videos' && (
        <div>
          {/* Hiển thị nội dung cho tab video */}
          <div className={cx('content')}>
            <p>This is the content for Videos tab.</p>
          </div>
        </div>
      )}
      {activeTab === 'gifs' && (
        <div>
          {/* Hiển thị nội dung cho tab GIFs */}
          <div className={cx('content')}>
            <p>This is the content for GIFs tab.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
