import React, { useState, useEffect } from 'react';
import style from './PhotoGallery.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


import Video from '../../../../Component/Video';

const cx = classNames.bind(style);

const PhotoGallery = () => {
  const [activeTab, setActiveTab] = useState('photos');
  const [media, setMedia] = useState([]);

  const typeMap = {
    photos: 'image',
    videos: 'video',
    gifs: 'gif'
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async (type) => {
      try {
        const res = await axios.get(`http://localhost:5000/user/media?type=${typeMap[type]}`, {
          headers: {
            token: token
          }
        });
        setMedia(res.data.media); 
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setMedia([]); 
          alert('No media found for this user');
        } else {
          console.error('Error fetching media:', err.response?.data || err.message);
        }
      }
    };

    fetchData(activeTab); 

  }, [activeTab]); 

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleDelete = async (type, id) => {
    const token = localStorage.getItem('token');
    console.log('id', id);
    try {
      await axios.delete(`http://localhost:5000/user/delete-media/${type}/${id}`, {
        headers: {
          token: token
        },
      });
      setMedia(media.filter(item => item.id !== id));
      alert('Media deleted successfully');
    } catch (error) {
      console.error('Error deleting media:', error.response?.data || error.message);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div style={{ display: 'flex' }}>
        <h2 className={cx('title-page')} style={{ width: '100%', alignItems: 'center' }}>Media Gallery</h2>
      </div>
      <div className={cx('tabs')}>
        <div className={cx('tab', { 'active': activeTab === 'photos' })} onClick={() => handleTabClick('photos')}>Photos</div>
        <div className={cx('tab', { 'active': activeTab === 'videos' })} onClick={() => handleTabClick('videos')}>Videos</div>
        <div className={cx('tab', { 'active': activeTab === 'gifs' })} onClick={() => handleTabClick('gifs')}>GIFs</div>
        <div className={cx('tab', { 'active': activeTab === 'csv' })} onClick={()=> handleTabClick('csv')}>CSV</div>
      </div>
      <div className={cx('tab-content')}>
        <div className={cx('list-item')}>
          {media.length === 0 ? (
            <p>Empty</p>
          ) : (
            media.map((item, index) => (
              <div key={index} className={cx('item')}>
                {activeTab === 'photos' && (
                  <img src={`http://localhost:5000/${item.path}`} alt={item.filename} />
                  // <Image item={item} />
                )}
                {activeTab === 'videos' && (
                  <Video item={item} />
                )}
                {activeTab === 'gifs' && (
                  <img src={`http://localhost:5000/${item.path}`} alt={item.filename} />
                  // <GiF item={item} />
                )}
                {activeTab === 'csv' && (
                  <img src={`http://localhost:5000/${item.path}`} alt={item.filename} />
                  // <CSV item={item} />
                )}

                <p>{item.filename}</p>
                <button className={cx('delete-button')} onClick={() => handleDelete(typeMap[activeTab], item.id)}>
                  <FontAwesomeIcon icon={faTrash}/>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
