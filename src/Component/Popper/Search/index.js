import React, { useState } from "react";
import styles from "./Search.module.scss";
import classNames from "classnames/bind";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const Searchbar = () => {
    const [searchValue, setSearchValue] = useState("");
    const [showClearButton, setShowClearButton] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your logic for handling the form submission here
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

    return (
        <div className={cx("search-box")}>
            <form onSubmit={handleSubmit} role="search">
                {/* <label htmlFor="search">Search for stuff</label> */}
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
    );
};

export default Searchbar;
