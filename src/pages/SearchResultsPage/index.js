import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SearchResultsPage.module.scss'; // Import the CSS module
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import axios from 'axios'; // Import axios for API calls
import Loading from '../../Component/Loading/index'; // Import the Loading component
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from '../../Redux/Slice/productSlice'; // Import actions
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

const categoriesimg = ['Nature', 'Animals', 'People', 'Tech', 'Architecture', 'Food', 'Travel', 'Fashion', 'Health', 'Art', 'Business', 'Music', 'Sports', 'Fitness', 'Education', 'Science', 'Transportation', 'Religion', 'History', 'Space', 'Other'];

const contentTypes = ['Image', 'Video', 'Gif'];

const SearchResultsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.product.products.list); // Get products from Redux store
    const totalPages = useSelector((state) => state.product.products?.totalPages); // Get total pages from Redux store
    const isLoading = useSelector((state) => state.product.products?.isFetching); // Get loading state from Redux store
    const [currentPage, setCurrentPage] = useState(useSelector((state) => state.product.products?.currentPage));
    const [filterCriteria, setFilterCriteria] = useState({
        name: "",
        category: "",
        type: "image",
    });

    const getImageUrl = (path) => {
        const normalizedPath = path.replace(/\\/g, "/");
        return `${process.env.REACT_APP_URL_BE}/${normalizedPath}`;
    };

    const handleFilterChange = (e) => {
        setFilterCriteria({
            ...filterCriteria,
            [e.target.name]: e.target.value,
        });
    };

    const fetchProducts = async (page) => {
        dispatch(fetchProductsStart());
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL_BE}/product/get-all-products`, {
                params: {
                    sortOrder: 'asc',
                    sortField: 'name',
                    category: filterCriteria.category === 'empty' ? '' : filterCriteria.category,
                    name: filterCriteria.name,
                    type: filterCriteria.type === 'empty' ? '' : filterCriteria.type,
                    limit: 12, // Adjust limit if needed
                    page: page,
                },
            });

            dispatch(fetchProductsSuccess(response.data));
        } catch (error) {
            console.error("Error fetching products:", error);
            dispatch(fetchProductsFailure());
        }
    };

    useEffect(() => {
        fetchProducts(currentPage);
    }, [filterCriteria, currentPage]);

    const handleProductClick = (productId) => {
        navigate(`/product-detail`, {state: {productId}});
    };
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
                    <option value='empty'>
                        Select category
                    </option>
                    {categoriesimg.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <select
                    name="type"
                    value={filterCriteria.type}
                    onChange={handleFilterChange}
                >
                    <option value='empty'>
                        Select type
                    </option>
                    {contentTypes.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
            <div className={cx('products-grid', 'row')}>
                <Loading isLoading={isLoading}>
                    {products.length > 0 ? (
                        <>
                            {products.map(product => (
                                <div key={product._id} className="col-md-4 col-lg-3 mb-4" style={{maxHeight:'320px'}} onClick={() => handleProductClick(product._id)}>
                                    <div className={cx('product-card')}>
                                        {product.type.toLowerCase().startsWith('image') ? (
                                            <img src={getImageUrl(product.path)} alt={product.name} className="img-fluid" style={{flex:'1 1'}} />
                                        ) : (
                                            <video
                                                style={{ width: '100%', height: 'auto' }}
                                                controls={false}      // Tắt các điều khiển của video
                                                autoPlay={false}      // Video không tự động phát
                                                loop={false}          // Video không phát lại liên tục
                                                muted={true}          // Video không phát âm thanh
                                                playsInline           // Video không mở full-screen trên di động
                                            >
                                                <source src={getImageUrl(product.path)} type="video/mp4" />
                                            </video>
                                        )}
                                        <div className={cx('product-info')}>
                                            <h3>{product.name}</h3>
                                            <p>{product.category}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <p>No products found</p>
                    )}
                </Loading>
            </div>
            {/* Pagination Controls */}
            <div className={cx('pagination-bar')}>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={cx('pagination-button', { active: index + 1 === currentPage })}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
    );
};

export default SearchResultsPage;
