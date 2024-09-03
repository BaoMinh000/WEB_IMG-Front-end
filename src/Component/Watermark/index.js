import React, { useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import style from '../../pages/User/profile/PhotoGallery/PhotoGallery.module.scss';

const cx = classNames.bind(style);

const positions = [
    { xPercent: 0.5, yPercent: 0.5, fontSizeRatio: 0.1, opacity: 0.5, textColor: 'rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(0, 0, 0, 0.3)', rotation: 15, blur: 0 },
    { xPercent: 0.2, yPercent: 0.9, fontSizeRatio: 0.1, opacity: 0.3, textColor: 'rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(0, 0, 0, 0.3)', rotation: 15, blur: 0 },
    { xPercent: 0.8, yPercent: 0.1, fontSizeRatio: 0.1, opacity: 0.5, textColor: 'rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(0, 0, 0, 0.3)', rotation: 15, blur: 0 },
];

const ImageWithWatermark = ({ imageUrl, watermarkText }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.src = imageUrl;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image onto the canvas
      ctx.drawImage(img, 0, 0);

      // Draw watermarks at the specified positions
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
    };
  }, [imageUrl, watermarkText]);

  return <canvas className={cx('product-image')} ref={canvasRef} />;
};

export default ImageWithWatermark;
