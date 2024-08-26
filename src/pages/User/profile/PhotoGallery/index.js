import React, { useEffect, useState } from 'react';
import style from './PhotoGallery.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faSpaceShuttle } from '@fortawesome/free-solid-svg-icons';
import axiosJWT from '../../../../api/axiosJWT';
import MediaPreview from '../../../../Component/Mediatype/index';
import { DeleteProduct,  updateUserProduct } from '../../../../Redux/ApiRequest';
import { useDispatch } from 'react-redux';
const cx = classNames.bind(style);

const PhotoGallery = () => {
    // Dữ liệu sản phẩm
    const [products, setProducts] = useState([]);
    const categoriesimg = ['Nature', 'Animals', 'People', 'Tech', 'Architecture', 'Food', 'Travel', 'Fashion', 'Health', 'Art', 'Business', 'Music', 'Sports', 'Fitness', 'Education', 'Science', 'Transportation', 'Religion', 'History', 'Space', 'Other'];
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [newCategory, setNewCategory] = useState('');
    const [newProduct, setNewProduct] = useState({ name: '', type: '', description: '',price:'' ,path: '', image: null, category: categoriesimg[0]});
    const token = localStorage.getItem('token');
    const [userid, setUserid] = useState('');
    const accessToken = localStorage.getItem('token');

    const dispatch = useDispatch();
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

    //khóa thanh scroll
    useEffect(() => {
        if (showAddProduct || selectedProduct) {
            document.body.style.overflow = 'hidden'; // Khóa cuộn khi form mở
        } else {
            document.body.style.overflow = ''; // Mở lại cuộn khi form đóng
        }
    }, [showAddProduct, selectedProduct]);

    const handleEditClick = (product) => {
        console.log('Edit product:', product);
        setSelectedProduct(product);
    };
    const handdlepreview = (product) => {
        setPreviewImage(product);
    };

    const handleDeleteClick = async (product) => {
        // Hiển thị hộp thoại xác nhận trước khi thực hiện thao tác xóa
        const confirmMessage = `Bạn có chắc chắn muốn xóa sản phẩm "${product.name}"?`;
        if (window.confirm(confirmMessage)) {
            try {
                // Thực hiện xóa sản phẩm nếu người dùng xác nhận
                await dispatch(DeleteProduct(product._id, accessToken));
                // Có thể thêm thông báo thành công hoặc làm gì đó sau khi xóa
                console.log('Sản phẩm đã được xóa thành công.');
            } catch (error) {
                // Xử lý lỗi nếu có
                console.error('Có lỗi xảy ra khi xóa sản phẩm:', error);
            }
        }
    };
    
    
    const handleAddCategory = () => {
        if (newCategory.trim() !== '') {
            // Thêm danh mục mới vào mảng categories của selectedProduct
            const updatedCategories = [...selectedProduct.categories, newCategory];
            handleInputEditChange({
                target: {
                    name: 'categories',
                    value: updatedCategories,
                },
            });
            setNewCategory(''); // Reset input sau khi thêm
        }
    };
    const handleClose = () => {
        setSelectedProduct(null);
        setPreviewImage(null);
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
    const handleInputEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedProduct((prev) => ({ ...prev, [name]: value }));        
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
            // // Kiểm tra xem tất cả các trường bắt buộc đã được điền chưa
            // if (!newProduct.name || !newProduct.type || !newProduct.path || !newProduct.category || !newProduct.image) {
            //     alert('Vui lòng điền đầy đủ thông tin!');
            //     if(!newProduct.path) alert('Vui lòng chọn hình ảnh!');
            //     if(!newProduct.name) alert('Vui lòng điền tên sản phẩm!');
            //     if(!newProduct.type) alert('Vui lòng điền loại sản phẩm!');
            //     if(!newProduct.image) alert('Vui lòng điền file!');
            //     if(!newProduct.category) alert('Vui lòng chọn danh mục!');
            //     return;
            // }
            console.log('newProduct',newProduct);
            
            // Tạo đối tượng FormData để gửi dữ liệu sản phẩm mới
            const formData = new FormData();
            formData.append('name', newProduct.name);
            formData.append('type', newProduct.type);
            formData.append('description', newProduct.description);
            formData.append('image', newProduct.image); // Thêm file hình ảnh vào FormData
            formData.append('category', newProduct.category);
            formData.append('price', newProduct.price);
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
                toast.success('Thêm sản phẩm thành công!');
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
                toast.error('Có lỗi xảy ra khi thêm sản phẩm. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Có lỗi xảy ra khi thêm sản phẩm:', error);
            toast.error('Lỗi khi thêm sản phẩm. Vui lòng thử lại.');
        }
    };
    // Function to handle save changes
    const handleSaveChanges = async () => {
        const updatedProduct = {
            ...selectedProduct,
            name: selectedProduct.name,
            type: selectedProduct.type,
            description: selectedProduct.description,
            category: selectedProduct.category,
        };        
        console.log('Saving changes to product:', updatedProduct);
        console.log(`${process.env.REACT_APP_URL_BE}/product/update-product/${selectedProduct._id}`);
        
        const { type, ...productWithoutType } = selectedProduct;

        try {
            const response = await axios.put(
                `${process.env.REACT_APP_URL_BE}/product/update-product/${selectedProduct._id}`, 
                productWithoutType, 
                {
                    headers: {
                        token: accessToken, // Ensure you include 'Bearer' if required
                    },
                }
            );
    
            if (response.status === 200) {
                toast.success("Product updated successfully!");
            } else {
                toast.error("Failed to update product. Please try again.");
            }
        } catch (error) {
            console.error("Product update failed:", error);
            toast.error("Failed to update product. Please try again.");
        }
    };
    
    useEffect(() => {
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
                <h4>Product List</h4>
                <ul className={cx('product-list')}>
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <li key={product.id ? product.id : product.name} className={cx('product-item')}>
                                <div className={cx('product-info')}>
                                    <MediaPreview product={product} />
                                </div>
                                <div className={cx('product-action')}>
                                    <button className={cx('btn-edit')} onClick={() => handleEditClick(product)}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className={cx('btn-delete')} onClick={() =>handleDeleteClick(product)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                                <div className={cx('product-action-preview')}>
                                    <button className={cx('btn-preview')} onClick={() => handdlepreview(product)}>
                                        <i className="fas fa-eye"></i>
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <div className={cx('boxproduct')}>
                            <div className={cx('iconproduct')}>
                                <FontAwesomeIcon icon={faBoxOpen} />
                            </div>
                            <h6>No products available.</h6>
                        </div>
                    )}
                </ul>
            </div>
            {/* boxx preview */}
            {previewImage && (
                <div className={cx('product-detail-overlay')}>
                    <div className={cx('product-detail')}>
                        <button className={cx('btn-close')} onClick={()=>{setPreviewImage(false)}}>
                            <i className="fas fa-times"></i>
                        </button>
                        <div className={cx('product-detail-content--preview')} style={{justifyContent:'center'}}>
                            <div className={cx('product-detail-image')}>
                                <MediaPreview product={previewImage}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* bos edit */}
            {selectedProduct && (
                <div className={cx('product-detail-overlay')}>
                    <div className={cx('product-detail')}>
                        <h4>Thông tin chi tiết </h4>
                        <button className={cx('btn-close')} onClick={handleClose}>
                            <i className="fas fa-times"></i>
                        </button>
                        <div className={cx('product-detail-content')}>
                            <div className={cx('product-detail-info')}>
                                <div style={{width:'100%'}}>
                                    <label className='col-lg-6 col-md-6 col-sm-12'>
                                        Tên Sản phẩm:
                                        <input
                                            type="text"
                                            name="name"
                                            value={selectedProduct.name}
                                            onChange={handleInputEditChange}
                                            className={cx('product-detail-name')}
                                        />
                                    </label>
                                    
                                    <label className='col-lg-6 col-md-6 col-sm-12'>
                                        Loại Sản phẩm:
                                        <input
                                            type="text"
                                            name="type"
                                            value={selectedProduct.type}
                                            onChange={handleInputEditChange}
                                            className={cx('product-detail-type')}
                                            disabled={true}
                                        />
                                    </label>
                                </div>


                                <label className="col-lg-6 col-md-6 col-sm-12">
                                    Giá:
                                    <input 
                                    type="number" 
                                    name="price" 
                                    value={selectedProduct.price} 
                                    onChange={handleInputChange} 
                                    />
                                </label>
                                {/* Thẻ select box mới */}
                                <label className='col-lg-6 col-md-6 col-sm-12'>
                                    Chọn danh mục:
                                    <select
                                        name="category"
                                        value={selectedProduct.category}
                                        onChange={(e) => {
                                            if (e.target.value === 'addNewCategory') {
                                                // Mở hộp thoại thêm danh mục mới
                                                const newCategory = prompt('Nhập tên danh mục mới:');
                                                if (newCategory) {
                                                    handleAddCategory(newCategory);
                                                }
                                            } else {
                                                handleInputEditChange(e);
                                            }
                                        }}
                                        className={cx('product-detail-category')}
                                    >
                                        {categoriesimg.length > 0 ? (
                                            categoriesimg.map((category, index) => (
                                                <option key={index} value={category}>
                                                    {category}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="none">None</option>
                                        )}
                                        <option value="addNewCategory">+ Thêm danh mục mới</option> {/* Option để thêm danh mục mới */}
                                    </select>
                                </label>
                                <label className='col-lg-6 col-md-6 col-sm-12'>
                                    Mô tả Sản phẩm:
                                    <textarea
                                        name="description"
                                        value={selectedProduct.description}
                                        onChange={handleInputEditChange}
                                        className={cx('product-detail-description')}
                                    />
                                </label>
                                
                            </div>
                        </div>

                        <button className={cx('btn-add-product')} style={{marginLeft:'auto'}} onClick={handleSaveChanges}>
                            Save
                        </button>
                    </div>
                </div>
            )}
            {/* box add  */}
            {showAddProduct && (
                <div className={cx('product-add-overlay')}>
                    <div className={cx('product-add')}>
                        <button className={cx('btn-close')} onClick={handleCloseAddProduct}>
                            <i className="fas fa-times"></i>
                        </button>
                        <div className={cx('product-add-form')}>
                            <div className='row'>
                                <h4 className={cx('product-add-title', 'col-lg-12', 'col-md-6', 'col-sm-12')}>Thêm Sản phẩm Mới</h4>

                                <label className="col-lg-6 col-md-6 col-sm-12">
                                    Tên Sản phẩm:
                                    <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} />
                                </label>
                                <label className="col-lg-6 col-md-6 col-sm-12">
                                    Loại:
                                    <input type="text" name="type" disabled={true} value={newProduct.type} onChange={handleInputChange} />
                                </label>
                                
                                <label className="col-lg-6 col-md-6 col-sm-12">
                                    Giá:
                                    <input 
                                    type="number" 
                                    name="price" 
                                    value={newProduct.price} 
                                    onChange={handleInputChange} 
                                    />
                                </label>
                                
                                <label className="col-lg-6 col-md-6 col-sm-12">
                                    Mô tả:
                                    <input type="text" name="description" value={newProduct.description} onChange={handleInputChange} />
                                </label>
                                <label className='col-lg-6 col-md-6 col-sm-12'>
                                    Chọn danh mục:
                                    <select
                                        name="category"
                                        value={newProduct.category}
                                        onChange={(e) => {
                                            if(e.target.value === '') {
                                                setNewProduct((prev) => ({ 
                                                    ...prev,
                                                    category: categoriesimg[0],
                                                }));
                                            }
                                            else if (e.target.value === 'addNewCategory') {
                                                // Mở hộp thoại thêm danh mục mới
                                                const newCategory = prompt('Nhập tên danh mục mới:');
                                                if (newCategory) {
                                                    handleAddCategory(newCategory);
                                                }
                                            }else {
                                                handleInputChange(e);
                                            }
                                        }}
                                        className={cx('product-detail-category')}
                                    >
                                        {categoriesimg.length > 0 ? (
                                            categoriesimg.map((category, index) => (
                                                <option key={index} value={category}>
                                                    {category}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="none">None</option>
                                        )}
                                        <option value="addNewCategory">+ Thêm danh mục mới</option> {/* Option để thêm danh mục mới */}
                                    </select>
                                </label>
                            </div>

                            <label className="col-lg-12 col-md-12 col-sm-12" style={{display:'flex', marginTop:'20px'}}>
                                <h4 style={{marginTop:'10px'}}>Hình ảnh:</h4>
                                <input type="file" name='image'  onChange={handleFileChange} />
                                {newProduct.path && <img src={newProduct.path} alt="Preview" className={cx('product-image-preview')} />}
                            </label>
                            
                            <div className={cx('buttons-row')}>
                                <button className={cx('btn-cancel')} onClick={handleCloseAddProduct}>Cancel</button>
                                <button className={cx('btn-add-product')} onClick={handleAddProductSubmit}>Save</button>
                            </div>
                    </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotoGallery;
