import React, { useState, useEffect } from 'react';
import style from './PhotoGallery.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';

import IMG from '../../../../Asset/Img/Logo/logo512.png';
const cx = classNames.bind(style);

const PhotoGallery = () => {
  const [activeTab, setActiveTab] = useState('photos');
  const [images, setImages] = useState([]);

  // useEffect(() => {
  //   // Fetch images from the backend API when the component mounts
  //   axios.get('http://localhost:5000/user/images')
  //     .then(console.log("get images success"))
  //     .catch(error => {
  //       console.error('Error fetching images:', error);
  //     });
  // }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };  

  return (
    <div style={{width:"100%"}}>
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
                    <img src={image.path} alt={`Photo ${index}`}/>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {activeTab === 'videos' && (
        <div style={{with: '100%'}}>
          {/* Hiển thị nội dung cho tab video */}
          <div className={cx('content')}>
            <p>This is the content for Videos tab.</p>
          </div>
        </div>
      )}
      {activeTab === 'gifs' && (
        <div style={{with: '100%'}}>
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
