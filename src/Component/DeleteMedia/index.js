import React from 'react';
import axios from 'axios';

const MediaItem = ({ media, type, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/delete-media/${type}/${media.id}`, {
        headers: {
          token: `Bearer YOUR_JWT_TOKEN_HERE`
        }
      });
      console.log(`${type} deleted successfully`);
      // Gọi hàm onDelete để cập nhật giao diện sau khi xóa
      onDelete(media.id);
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  return (
    <div className="media-item">
      <img src={`http://localhost:5000/${media.path}`} alt={media.filename} />
      <button onClick={handleDelete}>Xóa</button>
    </div>
  );
};

export default MediaItem;
