import React, { useRef, useState } from 'react';
import './Menu.css';

const MenuMobi = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const btnMenuRef = useRef(null);
    const menuRefMobi = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div ref={btnMenuRef} className="col-4 d-md-none d-block">
            <button className="menu-button" onClick={toggleMenu}>
                ☰ Menu
            </button>
            {menuOpen && (
                <div ref={menuRefMobi} className={`menu-box ${menuOpen ? 'show' : ''}`}>
                    <ul>
                        <li><a href="#home">Trang chủ</a></li>
                        <li><a href="#about">Giới thiệu</a></li>
                        <li><a href="#contact">Liên hệ</a></li>
                        <li><a href="#login">Đăng nhập</a></li>
                        <li><a href="#register">Đăng ký</a></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MenuMobi;
