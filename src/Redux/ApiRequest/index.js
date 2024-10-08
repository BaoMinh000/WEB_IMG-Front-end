import axios from "axios";
import Cookies from "js-cookie";
import { toast, Bounce  } from "react-toastify";

import {
    loginFailure,loginStart,loginSuccess,
    registerStart,registerSuccess,registerFailure,
} from "../Slice/authSlice";

import {
    usersStart,usersSuccess,usersFailure,
    userDetailsStart,userDetailsSuccess,userDetailsFailure,
    deleteUserStart,deleteUserSuccess,deleteUserFailure,
    updateUserStart,updateUserSuccess,updateUserFailure,
    addUserStart,addUserSuccess,addUserFailure,
} from "../Slice/userSlice";

import{
    fetchProductsStart,fetchProductsSuccess,fetchProductsFailure,
    updateProductStart,updateProductSuccess,updateProductFailure,
    getproductIdStart,getproductIdSuccess,getproductIdFailure
    
} from  "../Slice/productSlice";

import {
    getPlanIdStart,
    getPlanIdSuccess,
    getPlanIdFailure,
} from "../Slice/PlanSlice";
import axiosJWT from "../../api/axiosJWT";

const URL_BE = process.env.REACT_APP_URL_BE;

export const loginUser = (user, setisOpen) => async (dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axiosJWT.post(`${URL_BE}/auth/login`, user);
        console.log("res", res);

        if (res.status === 200) {
            dispatch(loginSuccess(res.data));
            // Lưu token vào localStorage
            localStorage.setItem("token", res.data.access_token);
            // Lưu thông tin người dùng vào localStorage
            localStorage.setItem("user", JSON.stringify(res.data));

            toast.success(res.data.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
            setisOpen(false);
        } else {
            toast.error(res.data.message);
        }
    } catch (err) {
        console.error("Login failed:", err);
        if (err.response) {
            console.error("Response error:", err.response.data);
            toast.error(`Login failed! ${err.response.data.message}`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                }
            );
        } else {
            console.error("Unknown error:", err);
            toast.error("Unknown error occurred during login!",{
                position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
            });
        }
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await axiosJWT.post(`${URL_BE}/auth/register`,user);
        if (res.status === 200) {
            // Xử lý dữ liệu phản hồi ở đây nếu cần
            dispatch(registerSuccess());
            toast.success("Registration successful!");
            // navigate("#login");
        } else {
            // Xử lý trường hợp phản hồi không thành công (vd: mã trạng thái không phải 201)
            dispatch(registerFailure());
            toast.error("Registration failed!");
        }
    } catch (err) {
        // Xử lý lỗi (vd: log lỗi hoặc hiển thị thông báo lỗi cho người dùng)
        console.error("Registration failed:", err);
        dispatch(registerFailure());
        alert("Registration failed!");
    }
};

export const refreshAccessToken = async () => {
    try {
        const userId = JSON.parse(localStorage.getItem("user"))?.user?._id;
        console.log("userId", userId);
        
        // Gửi yêu cầu refresh token đến server
        const response = await axiosJWT.post(`${process.env.REACT_APP_URL_BE}/auth/refesh-token`, {
            userId: userId,
        });
        if (response.status === 200) {
            console.log("Refresh token successful", response.data.access_token);
            return response.data.access_token;
        } else {
            throw new Error('Failed to refresh token');
        }
    } catch (error) {
        // Xóa các thông tin liên quan đến phiên đăng nhập
        localStorage.clear();
        // Bạn có thể điều hướng người dùng đến trang đăng nhập hoặc hiển thị thông báo lỗi
        window.location.href = "/"; // Điều hướng người dùng đến trang đăng nhập
        return null;
    }
};

export const addUser = async (user, dispatch) => {
    dispatch(addUserStart());
    try {
        const res = await axios.post(`${URL_BE}/auth/register`, user);
        if (res.status === 200) {
            dispatch(addUserSuccess());
            alert("User added successfully!");
            // Thêm logic cập nhật danh sách người dùng nếu cần thiết
        } else {
            dispatch(addUserFailure());
            alert("Failed to add user!");
        }
    } catch (err) {
        console.error("Failed to add user:", err);
        dispatch(addUserFailure());
        alert("Failed to add user!");
    }
};

export const getAuthorbyId = async (id, dispatch) => {
    dispatch(userDetailsStart());
    try {
        const res = await axios.get(`${URL_BE}/user/AuthorId/${id}`);
        if (res.status === 200) {
            dispatch(userDetailsSuccess(res.data));
            return res.data; // Return data for use in the component
        } else {
            dispatch(userDetailsFailure());
            throw new Error(`Unexpected status code: ${res.status}`);
        }
    } catch (err) {
        console.error("Failed to get user:", err);
        dispatch(userDetailsFailure());
        throw err;
    }
}
export const getAllUsers = async (access_token, dispatch, axiosJWT) => {
    dispatch(usersStart());
    try {
        const res = await axiosJWT.get(`${URL_BE}/user`, {
            headers: {
                token: `${access_token}`,
            },
        });
        if (res.status === 200) {
            // Xử lý dữ liệu phản hồi ở đây nếu cần
            dispatch(usersSuccess(res.data)); // Assuming res.data contains user data.
        } else {
            // Xử lý trường hợp phản hồi không thành công (vd: mã trạng thái không phải 200)
            dispatch(usersFailure());
        }
    } catch (err) {
        // Xử lý lỗi (vd: log lỗi hoặc hiển thị thông báo lỗi cho người dùng)
        console.error("User failed:", err);
        dispatch(loginFailure());
    }
};

export const getUserDetails = async (access_token, dispatch, id, axiosJWT) => {
    dispatch(userDetailsStart());
    try {
        const res = await axiosJWT.get(`${URL_BE}/user/${id}`, {
            headers: {
                token: `${access_token}`,
            },
        });
        if (res.status === 200) {
            // Xử lý dữ liệu phản hồi ở đây nếu cần
            dispatch(userDetailsSuccess(res.data));
            return res.data; // Return data for use in the component
        } else {
            dispatch(userDetailsFailure());
            throw new Error(`Unexpected status code: ${res.status}`);
        }
    } catch (err) {
        // Xử lý lỗi (vd: log lỗi hoặc hiển thị thông báo lỗi cho người dùng)
        dispatch(loginFailure());
        throw err;
    }
};

// //Update user information
// export const updateUser = async (access_token, dispatch, id, user, axiosJWT) => {
//     dispatch(updateUserStart());
//     try {
//         const res = await axiosJWT.put(`${URL_BE}/user/updateUser/${id}`, user, {
//             headers: {
//                 token: `Bearer ${access_token}`, // Note the 'Bearer' prefix, if needed
//             },
//         });
//         if (res.status === 200) {
//             dispatch(updateUserSuccess(res.data)); 
//         } else {
//             dispatch(updateUserFailure());
//         }
//     } catch (err) {
//         console.error("User failed:", err);
//         dispatch(updateUserFailure());
//     }
// };


export const DeleteUser = async (access_token, dispatch, id, axiosJWT) => {
    dispatch(deleteUserStart());
    console.log("Delete: access_token", access_token);
    try {
        const res = await axiosJWT.delete(`${URL_BE}/user/${id}`, {
            headers: {
                token: `${access_token}`,
            },
        });
        if (res.status === 200) {
            // Xử lý dữ liệu phản hồi ở đây nếu cần
            dispatch(deleteUserSuccess(res.data)); // Assuming res.data contains user data.
        } else {
            // Xử lý trường hợp phản hồi không thành công (vd: mã trạng thái không phải 200)
            console.log("Mã trạng thái không phải 200");
            dispatch(deleteUserFailure());
        }
    } catch (err) {
        // Xử lý lỗi (vd: log lỗi hoặc hiển thị thông báo lỗi cho người dùng)
        console.error("User failed:", err);
        dispatch(loginFailure());
    }
};

//Get product by id
export const getproductId = async (id, dispatch) => {
    if(!id){
        return;
    }
    dispatch(getproductIdStart());
    try {
        const res = await axios.get(`${URL_BE}/product/get-product/${id}`, {

        });
        if (res.status === 200) {
            dispatch(getproductIdSuccess(res.data)); // Giả sử res.data chứa dữ liệu của sản phẩm.
        } else {
            dispatch(getproductIdFailure());
        }
    } catch (err) {
        console.error("Failed to get product:", err);
        dispatch(getproductIdFailure());
    }
};
//Get all products
export const getAllProductsUser = async (access_token, dispatch, axiosJWT) => {
    dispatch(fetchProductsStart());
    try {
        const res = await axiosJWT.get(`${URL_BE}/product`, {
            headers: {
                token: `${access_token}`,
            },
        });
        if (res.status === 200) {
            // Xử lý dữ liệu phản hồi ở đây nếu cần
            dispatch(fetchProductsSuccess(res.data)); // Assuming res.data contains user data.
        } else {
            // Xử lý trường hợp phản hồi không thành công (vd: mã trạng thái không phải 200)
            dispatch(fetchProductsFailure());
        }
    } catch (err) {
        // Xử lý lỗi (vd: log lỗi hoặc hiển thị thông báo lỗi cho người dùng)
        console.error("User failed:", err);
        dispatch(fetchProductsFailure());
    }
}

export const updateUserProduct = async (access_token, id, product, dispatch, axiosJWT) => {
    console.log("Updating product:", product);

    // dispatch(updateProductStart());

    try {
        const res = await axiosJWT.put(`${URL_BE}/product/update-product/${id}`, product, {
            headers: {
                Authorization: access_token, // 'Authorization' is the standard header name
            },
        });

        if (res.status === 200) {
            // dispatch(updateProductSuccess(res.data)); 
            toast.success("Product updated successfully!");
        } else {
            // dispatch(updateProductFailure());
        }
    } catch (err) {
        console.error("Product update failed:", err);
        // dispatch(updateProductFailure());
    }
};

export const DeleteProduct = (id, access_token) => async (dispatch) => {
    dispatch(deleteUserStart());
    console.log("Delete: access_token", access_token);
    console.log('Delete: id', id);
    try {
        const res = await axios.delete(`${URL_BE}/product/delete-product/${id}`, {
            headers: {
                token: `${access_token}`,
            },
        });

        if (res.status === 200) {
            dispatch(deleteUserSuccess(res.data));
            toast.success("Product deleted successfully!");
        } else {
            toast.error("Failed to delete product!");
            dispatch(deleteUserFailure());
        }
    } catch (err) {
        console.error("Failed to delete product:", err);
        toast.error("Failed to delete product!");
        dispatch(deleteUserFailure());
    }
};

export const getPlanid = async (id, dispatch) => {
    dispatch(getPlanIdStart());
    try {
        const res = await axios.get(`${URL_BE}/plans/get_plan/${id}`);
        if (res.status === 200) {
            dispatch(getPlanIdSuccess(res.data));
        } else {
            dispatch(getPlanIdFailure());
        }
    } catch (err) {
        console.error("Failed to get plan:", err);
        dispatch(getPlanIdFailure());
    }
}

export const getPlanbyUserid = async (id, dispatch) => {
    dispatch(getPlanIdStart());
    try {
        const res = await axios.get(`${URL_BE}/plans/get_plan_by_user/${id}`);
        if (res.status === 200) {
            dispatch(getPlanIdSuccess(res.data));
        } else {
            dispatch(getPlanIdFailure());
        }
    } catch (err) {
        console.error("Failed to get plan:", err);
        dispatch(getPlanIdFailure());
    }
}

export const buy_product_by_plan = async (product, userId) => {
    try {
        const res = await axios.post(`${URL_BE}/plans/buy_product_by_plan`, { product, userId });
        if (res.status === 201) {  // Sử dụng mã 201 cho yêu cầu thành công
            toast.success("Product purchased successfully!");
        } else {
            toast.error("Failed to purchase product!");
        }
    } catch (err) {
        console.error("Failed to purchase product:", err.response ? err.response.data : err.message);
        toast.error("Failed to purchase product!");
    }
};
