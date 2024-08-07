import React, { useState, useEffect } from 'react';
import './Slider.css';

const images = [
    'https://toigingiuvedep.vn/wp-content/uploads/2021/06/hinh-anh-lang-que-viet-nam.jpg',
    'https://th.bing.com/th/id/OIP.Yin4GEOYv68h74ATfgVVjwAAAA?rs=1&pid=ImgDetMain',
    'https://images.pexels.com/photos/4712723/pexels-photo-4712723.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    };

    const nextSlide = () => {
        setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000); // Chuyển động tự động sau mỗi 3 giây

        return () => clearInterval(interval); // Dọn dẹp interval khi component bị unmount
    }, [currentIndex]);

    return (
        <div className="slider">
            <button className="prev" onClick={prevSlide}>❮</button>
            <div className="slider-content" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={index === currentIndex ? 'slide active' : 'slide'}
                    >
                        <img src={image} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </div>
            <button className="next" onClick={nextSlide}>❯</button>
            <div className="dots">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={index === currentIndex ? 'dot active' : 'dot'}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
