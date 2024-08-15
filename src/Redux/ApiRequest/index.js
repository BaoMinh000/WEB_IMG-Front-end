import axios from "axios";

import {
    loginFailure,loginStart,loginSuccess,
    registerStart,registerSuccess,registerFailure,
} from "../authSlice";

import {
    usersStart,usersSuccess,usersFailure,
    userDetailsStart,userDetailsSuccess,userDetailsFailure,
    deleteUserStart,deleteUserSuccess,deleteUserFailure,
    updateUserStart,updateUserSuccess,updateUserFailure,
    addUserStart,addUserSuccess,addUserFailure,
} from "../UserSlice";
import { toast } from "react-toastify";

const URL_BE = process.env.REACT_APP_URL_BE;

export const loginUser = (user, setisOpen) => async (dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${URL_BE}/auth/login`, user);
        if (res.status === 200) {
            // Xử lý dữ liệu phản hồi ở đây nếu cần
            dispatch(loginSuccess(res.data)); // Assuming res.data contains user data
            // console.log("res.data", res.data);
            // Lưu token vào localStorage
            localStorage.setItem("token", res.data.access_token);
            //lưu thông tin user vào localStorage
            localStorage.setItem("user", JSON.stringify(res.data));

            toast.success("Login successful!");
            setisOpen(false);
            navigate("/");
            //reload lại trang
            window.location.reload();
        } else {
            // Xử lý trường hợp phản hồi không thành công (vd: mã trạng thái không phải 200)
            dispatch(loginFailure());
            toast.error("Login failed!");
        }
    } catch (err) {
        // Xử lý lỗi (vd: log lỗi hoặc hiển thị thông báo lỗi cho người dùng)
        console.error("Login failed:", err);
        dispatch(loginFailure());
        toast.error("Login failed!");
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await axios.post(`${URL_BE}/auth/register`,user);
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
        // Gửi yêu cầu refresh token đến server
        const response = await axios.post(`${process.env.REACT_APP_URL_BE}/auth/refresh-token`, null, {
            withCredentials: true, // Đảm bảo rằng cookie được gửi cùng với yêu cầu
        });

        if (response.status === 200) {
            const { access_token } = response.data;

            // Lưu access token mới vào localStorage
            localStorage.setItem("access_token", access_token);

            return access_token;
        } else {
            throw new Error('Failed to refresh token');
        }
    } catch (error) {
        console.error("Error refreshing access token:", error);

        // Xóa các thông tin liên quan đến phiên đăng nhập
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");

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

//Update user information
export const updateUser = async (access_token, dispatch, id, user, axiosJWT) => {
    dispatch(updateUserStart());
    try {
        const res = await axiosJWT.put(`${URL_BE}/user/updateUser/${id}`, user, {
            headers: {
                token: `Bearer ${access_token}`, // Note the 'Bearer' prefix, if needed
            },
        });
        if (res.status === 200) {
            dispatch(updateUserSuccess(res.data)); 
        } else {
            dispatch(updateUserFailure());
        }
    } catch (err) {
        console.error("User failed:", err);
        dispatch(updateUserFailure());
    }
};


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

// export const uploadFile = async (file, dispatch, access_token, axiosJWT) => {
//     dispatch(uploadFileStart());
//     try {
//         const res = await axiosJWT.post(`${URL_BE}/upload`, file, {
//             headers: {
//                 token: `${access_token}`,
//             },
//         });
//         if (res.status === 201) {
//             // Xử lý dữ liệu phản hồi ở đây nếu cần
//             dispatch(uploadFileSuccess(res.data)); // Assuming res.data contains user data.
//         } else {
//             // Xử lý trường hợp phản hồi không thành công (vd: mã trạng thái không phải 201)
//             dispatch(uploadFileFailure());
//         }
//     } catch (err) {
//         // Xử lý lỗi (vd: log lỗi hoặc hiển thị thông báo lỗi cho người dùng)
//         console.error("Upload failed:", err);
//         dispatch(uploadFileFailure());
//     }
// };
// export const getImage = async (access_token, dispatch, axiosJWT) => {
//     dispatch(getImageStart());
//     try {
//         const res = await axiosJWT.get(`${URL_BE}/user/images`, {
//             headers: {
//                 token: `${access_token}`,
//             },
//         });
//         if (res.status === 200) {
//             // Xử lý dữ liệu phản hồi ở đây nếu cần
//             dispatch(getImageSuccess(res.data)); // Assuming res.data contains user data.
//         } else {
//             // Xử lý trường hợp phản hồi không thành công (vd: mã trạng thái không phải 200)
//             dispatch(getImageFailure());
//         }
//     } catch (err) {
//         // Xử lý lỗi (vd: log lỗi hoặc hiển thị thông báo lỗi cho người dùng)
//         console.error("Get image failed:", err);
//         dispatch(getImageFailure());
//     }
// }

