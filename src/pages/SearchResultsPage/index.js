import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SearchResultsPage.module.scss'; // Import the CSS module
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import Loading from '../../Component/Loading/index'; // Import the Loading component
const cx = classNames.bind(styles); // Bind the styles to cx

const SearchResultsPage = () => {
    const location = useLocation();
    const products = location.state?.products || []; // Ensure products is an array
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [visibleProducts, setVisibleProducts] = useState(24); // State để quản lý số lượng sản phẩm được hiển thị ban đầu
    const [isLoading, setIsLoading] = useState(false); // Start with no loading
    const [filterCriteria, setFilterCriteria] = useState({
        name: "",
        category: "",
    });

    // Function to normalize the image path
    const getImageUrl = (path) => {
        const normalizedPath = path.replace(/\\/g, "/");
        return `${process.env.REACT_APP_URL_BE}/${normalizedPath}`;
    };

    // Handle filter changes
    const handleFilterChange = (e) => {
        setFilterCriteria({
            ...filterCriteria,
            [e.target.name]: e.target.value,
        });
    };

    // Hàm để xử lý nút "Xem thêm"
    const handleLoadMore = () => {
        setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 12);
    };

    // Delay before applying filters (debounce effect)
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setIsLoading(true); // Set loading to true before applying filter

            // Simulate a 1-second loading delay before updating filtered products
            const loadingTimeout = setTimeout(() => {
                const filtered = products.data.filter(product => {
                    const productName = product.name || ""; // Default to empty string if name is undefined
                    const productCategory = product.category || ""; // Default to empty string if category is undefined
                    return (
                        productName.toLowerCase().includes(filterCriteria.name.toLowerCase()) &&
                        productCategory.toLowerCase().includes(filterCriteria.category.toLowerCase())
                    );
                });
                setFilteredProducts(filtered);
                setIsLoading(false); // Set loading to false after filtering and delay
            }, 1000); // 1 second loading delay

            return () => clearTimeout(loadingTimeout); // Cleanup the loading timeout if filterCriteria changes
        }, 1000); // 1 second delay for debounce

        return () => clearTimeout(delayDebounceFn); // Cleanup debounce timeout if filterCriteria changes
    }, [filterCriteria, products]);

    return (
        <div className={cx('search-results-page')}>
            <h1>Search Results</h1>
            <div className={cx('filter-bar')}>
                <input
                    type="text"
                    name="name"
                    placeholder="Filter by name..."
                    value={filterCriteria.name}
                    onChange={handleFilterChange}
                />
                <select
                    name="category"
                    value={filterCriteria.category}
                    onChange={handleFilterChange}
                >
                    <option value="">Select a category...</option>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                    <option value="category3">Category 3</option>
                    {/* Thêm các option khác tương ứng với các category */}
                </select>

                {/* Add more filters as needed */}
            </div>
            <div className={cx('products-grid', 'row')}>
                <Loading isLoading={isLoading}>
                    {filteredProducts.length > 0 ? (
                        <>
                            {filteredProducts.slice(0, visibleProducts).map(product => (
                                <div key={product._id} className="col-md-4 col-lg-3 mb-4">
                                    <div className={cx('product-card')}>
                                        <img src={getImageUrl(product.path)} alt={product.name} 
                                            className="img-fluid" />
                                        <div className={cx('product-info')}>
                                            <h3>{product.name}</h3>
                                            <p>{product.category}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* Nút Xem thêm */}
                            {visibleProducts < filteredProducts.length && (
                                <div className={cx("load-more-container")}>
                                    <button className={cx("load-more-btn")} onClick={handleLoadMore}>
                                        Xem thêm
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <p>No products found</p>
                    )}
                </Loading>
            </div>
        </div>
    );
};

export default SearchResultsPage;
