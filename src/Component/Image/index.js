import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faExpand } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import style from './MediaComponent.module.scss';

const cx = classNames.bind(style);

const ImageComponent = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={cx('media-item')}>
        <img
          src={`http://localhost:5000/${item.path}`}
          alt={item.filename}
          onClick={openModal}
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
            zIndex: '10'
          },
        }}
      >
        <button onClick={closeModal} className={cx('close-button')}>
          <FontAwesomeIcon icon={faClose} />
        </button>
        <img
          src={`http://localhost:5000/${item.path}`}
          alt={item.filename}
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        />
      </Modal>
    </>
  );
};

export default ImageComponent;
