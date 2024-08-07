import React, { useState, useRef, useEffect } from "react";
import styles from "./Search.module.scss";
import classNames from "classnames/bind";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTimes, faChevronDown, faChevronUp, faBorderAll } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const Searchbar = () => {
    const [searchValue, setSearchValue] = useState("");
    const [showClearButton, setShowClearButton] = useState(false);
    const [showMenuCategory, setShowMenuCategory] = useState(false);
    const menuRef = useRef(null); // Ref để theo dõi menu
    const btnRef = useRef(null);   // Ref để theo dõi nút btn-type-search



    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Search for:", searchValue);
        setSearchValue("");
    };

    const handleClearInput = () => {
        setSearchValue("");
        setShowClearButton(false);
    };

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
        setShowClearButton(e.target.value !== "");
    };

    const handleMenuCategory = () => {
        setShowMenuCategory(!showMenuCategory);
    };

    const handleClickOutside = (event) => {
        // Kiểm tra nếu sự kiện xảy ra bên ngoài cả menu và btn
        if (
            menuRef.current && !menuRef.current.contains(event.target) &&
            btnRef.current && !btnRef.current.contains(event.target)
        ) {
            setShowMenuCategory(false);  // Ẩn menu nếu click ra ngoài
        }
    };

    useEffect(() => {
        if (showMenuCategory) {
            document.addEventListener("mousedown", handleClickOutside);
            
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMenuCategory]);

    return (
        <div className={cx("search-bar")}>
            <div ref={btnRef} className={cx("btn-type-search")} onClick={handleMenuCategory}>
                <FontAwesomeIcon icon={faBorderAll} style={{ marginRight: "20px", fontSize: '1.8rem' }} />
                <span style={{ marginRight: '10px' }}>Danh mục</span>
                <FontAwesomeIcon
                    icon={showMenuCategory ? faChevronUp : faChevronDown}
                    className={cx("type-search-icon")}
                    style={{ fontSize: "1rem" }}
                />
                {showMenuCategory && (
                    <div ref={menuRef} className={cx("menu-category-search")}>
                        <ul>
                            <li><a href="/danh mục 1">Danh mục 1</a></li>
                            <li><a href="/danh mục 2">Danh mục 2</a></li>
                            <li><a href="/danh mục 3">Danh mục 3</a></li>
                            <li><a href="/danh mục 4">Danh mục 4</a></li>
                        </ul>
                    </div>
                )}
            </div>

            <div className={cx("search-box")}>
                <form onSubmit={handleSubmit} role="search">
                    <input
                        id="search"
                        type="text"
                        placeholder="Search..."
                        autoFocus
                        required
                        value={searchValue}
                        onChange={handleInputChange}
                    />
                    <button className={cx("button-search")} type="submit">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    {showClearButton && (
                        <button
                            className={cx("button-clear")}
                            type="button"
                            onClick={handleClearInput}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Searchbar;
