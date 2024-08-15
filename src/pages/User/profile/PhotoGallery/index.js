import React, { useEffect, useState } from 'react';
import style from './PhotoGallery.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import axiosJWT from '../../../../api/axiosJWT';

const cx = classNames.bind(style);

const PhotoGallery = () => {
    // Dữ liệu sản phẩm
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', type: '', description: '', path: '', image: null });
    const token = localStorage.getItem('token');
    const [userid, setUserid] = useState('');

    useEffect(() => {
        // Lấy dữ liệu người dùng từ localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            // Chuyển đổi từ chuỗi JSON về đối tượng JavaScript
            const user = JSON.parse(storedUser);
            // Lưu userid vào state
            setUserid(user.user._id);
        } else {
            console.log('No user data found in localStorage.');
        }
    }, []); // Chỉ chạy một lần khi component mount

    const handleEditClick = (product) => {
        setSelectedProduct(product);
    };
    const handleClose = () => {
        setSelectedProduct(null);
    };
    const handleAddProductClick = () => {
        setShowAddProduct(true);
    };
    const handleCloseAddProduct = () => {
        setShowAddProduct(false);
        setNewProduct({ name: '', type: '', description: '', image:null ,path: '' });
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };
    const handleFileChange = (e) => {
        console.log('file truoc khi an submit',e.target.files[0]);
        const file = e.target.files[0];
        const limitsize = 20 * 1024 * 1024; // 20MB
        if (file) {
            if (file.size > limitsize) 
            { // 20MB
                alert('File size exceeds 20MB limit.');
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                setNewProduct((prev) => ({
                    ...prev,
                    name: file.name,
                    type: file.type,
                    description: '',
                    image: file,
                    path: e.target.result, //cho review hình ảnh

                }));
            };
            reader.readAsDataURL(file); // Đọc file dưới dạng base64
        }
    };
    const handleAddProductSubmit = async () => {
        try {
            // Kiểm tra xem tất cả các trường bắt buộc đã được điền chưa
            if (!newProduct.name || !newProduct.type || !newProduct.image) {
                alert('Vui lòng điền đầy đủ thông tin!');
                if(!newProduct.image) alert('Vui lòng chọn hình ảnh!');
                if(!newProduct.name) alert('Vui lòng điền tên sản phẩm!');
                if(!newProduct.type) alert('Vui lòng điền loại sản phẩm!');
                if(!newProduct.file) alert('Vui lòng điền file!');
                return;
            }
    
            // Tạo đối tượng FormData để gửi dữ liệu sản phẩm mới
            const formData = new FormData();
            formData.append('name', newProduct.name);
            formData.append('type', newProduct.type);
            // formData.append('description', newProduct.description);
            formData.append('image', newProduct.image); // Thêm file hình ảnh vào FormData
            console.log('image khi submit', newProduct.image);
            // //log formData
            // for (var pair of formData.entries()) {
            //     console.log(pair[0]+ ', ' + pair[1]);
            // }

            console.log('Sending form data to server...');
            // Gửi dữ liệu sản phẩm mới tới server
            const response = await axios.post('http://localhost:5000/product/create-product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token,
                },
            });
            console.log('Server response:', response);
            // Kiểm tra phản hồi từ server
            if (response.status === 201) {
                alert('Thêm sản phẩm thành công!');
                // Thêm sản phẩm mới vào danh sách sản phẩm
                const addedProduct = response.data.product; // Giả sử server trả về sản phẩm đã được thêm
                setProducts((prevProducts) => [
                    ...prevProducts,
                    {
                        id: addedProduct.id,
                        name: addedProduct.name,
                        type: addedProduct.type,
                        description: addedProduct.description,
                        path: addedProduct.path,
                    }
                ]);
                console.log('addedProduct',addedProduct);

                // Đóng form thêm sản phẩm và reset dữ liệu
                handleCloseAddProduct();
            } else {
                alert('Có lỗi xảy ra khi thêm sản phẩm. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Có lỗi xảy ra khi thêm sản phẩm:', error);
            alert('Có lỗi xảy ra khi thêm sản phẩm. Vui lòng thử lại.');
        }
    }

    useEffect(() => {
        console.log('userid:', userid);
        // Chỉ gọi API khi userid đã được lấy từ localStorage
        if (userid) {
            const getAllProductsUser = async () => {
                try {
                    console.log('Getting all products from server...');
                    const response = await axiosJWT.get(`http://localhost:5000/product/get-all-products/${userid}`, {
                        headers: {
                            'token': token,
                        },
                    });
                    console.log('Server response:', response.data.products);
                    if (response.status === 200) {
                        // Cập nhật danh sách sản phẩm
                        setProducts(response.data.products);
                        // toast.success('Lấy dữ liệu sản phẩm thành công!');
                    } else {
                        toast.error('Không có sản phẩm. Vui lòng thử lại.');
                    }
                } catch (error) {
                    console.error('Có lỗi xảy ra khi lấy dữ liệu sản phẩm:', error);
                    toast.error('Lỗi khi lấy dữ liệu. Vui lòng thử lại.');
                }
            };
            // Gọi hàm lấy dữ liệu
            getAllProductsUser();
        }else{
            console.log('No user data found in localStorage.');
        }
    }, [userid, token]); // Chỉ chạy khi userid hoặc token thay đổi

    // Chuyển đổi đường dẫn hình ảnh
    const getImageUrl = (path) => {
        const normalizedPath = path.replace(/\\/g, "/"); // Chuyển đổi gạch chéo ngược thành gạch chéo
        return `http://localhost:5000/${normalizedPath}`; // Thay đổi URL này theo đường dẫn của server
    };
    
    return (
        <div className={cx('container')}>
            <div style={{ position: 'relative' }}>
                <h4 className={cx('title')}>Quản lý Sản phẩm</h4>
                <button className={cx('btn-add')} style={{ position: 'absolute', right: '0', top: '0' }} onClick={handleAddProductClick}>
                    <i className="fas fa-plus" style={{ marginRight: '8px', fontSize: '16px' }}></i>
                    Add Product
                </button>
            </div>

            <div className={cx('product-list-section')}>
                <h4>Danh sách Sản phẩm</h4>
                <ul className={cx('product-list')}>
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <li key={product.id ? product.id : product.name} className={cx('product-item')}>
                            <div className={cx('product-info')}>
                                <img src={getImageUrl(product.path)} alt={product.name} className={cx('product-image')} />
                            </div>
                            <div className={cx('product-action')}>
                                <button className={cx('btn-edit')} onClick={() => handleEditClick(product)}>
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button className={cx('btn-delete')}>
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <div className={cx('boxproduct')}>   
                        <div className={cx('iconproduct')}>
                            <FontAwesomeIcon icon={faBoxOpen} />
                        </div>
                        <h6>Không có sản phẩm nào.</h6>
                    </div>
                )}


                </ul>
            </div>

            {selectedProduct && (
                <div className={cx('product-detail-overlay')}>
                    <div className={cx('product-detail')}>
                        <button className={cx('btn-close')} onClick={handleClose}>
                            <i className="fas fa-times"></i>
                        </button>
                        <div className={cx('product-detail-content')}>
                            <div className={cx('product-detail-image')}>
                                <img src={selectedProduct.path} alt={selectedProduct.name} />
                            </div>
                            <div className={cx('product-detail-info')}>
                                <h4 className={cx('product-detail-name')}>{selectedProduct.name}</h4>
                                <p className={cx('product-detail-description')}>{selectedProduct.description}</p>
                                <p className={cx('product-detail-type')}>{selectedProduct.type}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showAddProduct && (
                <div className={cx('product-add-overlay')}>
                    <div className={cx('product-add')}>
                        <button className={cx('btn-close')} onClick={handleCloseAddProduct}>
                            <i className="fas fa-times"></i>
                        </button>
                        <h4 className={cx('product-add-title')}>Thêm Sản phẩm Mới</h4>
                        <div className={cx('product-add-form')}>
                            <label>
                                Tên Sản phẩm:
                                <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} />
                            </label>
                            <label>
                                Loại:
                                <input type="text" name="type" value={newProduct.type} onChange={handleInputChange} />
                            </label>
                            <label>
                                Mô tả:
                                <input type="text" name="description" value={newProduct.description} onChange={handleInputChange} />
                            </label>
                            <label>
                                Hình ảnh:
                                <input type="file" name='image'  onChange={handleFileChange} />
                                {newProduct.path && <img src={newProduct.path} alt="Preview" className={cx('product-image-preview')} />}
                            </label>
                            <button className={cx('btn-add-product')} onClick={handleAddProductSubmit}>Save</button>
                            <button className={cx('btn-cancel')} onClick={handleCloseAddProduct}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotoGallery;
