import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPlay } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import style from './Video.module.scss';

const cx = classNames.bind(style);

const VideoComponent = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
        <div style={{ position: 'relative', height: '100%'}}>
          <div className={cx('box-item')}>
            <button
              onClick={openModal}
              className={cx('play-button')}
            >
              <FontAwesomeIcon icon={faPlay}/>
            </button>
          </div>
          <img
            src={`http://localhost:5000/${item.path}`}
            alt={item.filename}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '800px',
            height: 'auto',
            zIndex:'10'
          },
        }}
      >
        <button onClick={closeModal} style={{ float: 'right',fontSize:'20px', padding:'8px', background: 'transparent' ,cursor: 'pointer' }}><FontAwesomeIcon icon={faClose}/></button>
        <video
          src={`http://localhost:5000/${item.path}`}
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          controls
        />
      </Modal>
    </>
  );
};

export default VideoComponent;
