import React, { useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import style from '../../pages/User/profile/PhotoGallery/PhotoGallery.module.scss';

const cx = classNames.bind(style);

const positions = [
  { xPercent: 0.5, yPercent: 0.5, fontSizeRatio: 0.1, opacity: 0.5, textColor: 'rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(0, 0, 0, 0.3)', rotation: 15, blur: 0 },
];

const VideoWithWatermark = ({ videoUrl, watermarkText, className }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const updateCanvasSize = () => {
      if (video && canvas) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }
    };

    const drawWatermark = () => {
      if (video && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa canvas trước khi vẽ mới
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        positions.forEach(({ xPercent, yPercent, fontSizeRatio, textColor, backgroundColor, rotation, blur, opacity }) => {
          // Calculate the font size based on image size and specified ratio
          const fontSize = canvas.width * fontSizeRatio;
          ctx.font = `${fontSize}px Arial`;

          // Calculate the position and size of the watermark
          const textWidth = ctx.measureText(watermarkText).width;
          const textHeight = fontSize; // Approximation of text height
          const x = canvas.width * xPercent;
          const y = canvas.height * yPercent;

          // Save the context state
          ctx.save();

          // Move the origin to the position where the text should be
          ctx.translate(x, y);

          // Rotate the canvas by the specified angle (in degrees)
          ctx.rotate((rotation * Math.PI) / 180);

          // Apply the blur filter
          ctx.filter = `blur(${blur}px)`;

          // Set the global opacity for the background rectangle
          ctx.globalAlpha = opacity;

          // Draw the background rectangle
          const padding = fontSize * 0.2; // Padding around the text based on font size
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(-textWidth / 2 - padding, -textHeight / 2 - padding, textWidth + padding * 2, textHeight + padding * 2);

          // Reset the filter and globalAlpha for drawing the text
          ctx.filter = 'none';
          ctx.globalAlpha = opacity;  // Set the opacity for the text

          // Draw the text on top of the background
          ctx.fillStyle = textColor;
          ctx.fillText(watermarkText, -textWidth / 2, textHeight / 2);

          // Restore the context to its original state
          ctx.restore();
        });

        requestAnimationFrame(drawWatermark);
      }
    };

    const onLoadedData = () => {
      updateCanvasSize();
      drawWatermark();
    };

    // Đảm bảo vẽ watermark ngay khi video được tải xong
    video.addEventListener('loadeddata', onLoadedData);

    // Theo dõi kích thước của phần tử chứa video
    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });
    resizeObserver.observe(video.parentElement);

    return () => {
      video.removeEventListener('loadeddata', onLoadedData);
      resizeObserver.disconnect();
    };
  }, [videoUrl, watermarkText]);

  return (
    <div className={cx('video-container', className)}>
      <video ref={videoRef} src={videoUrl} className={cx('video-element')} controls></video>
      <canvas ref={canvasRef} className={cx('canvas-overlay')} />
    </div>
  );
};

export default VideoWithWatermark;
