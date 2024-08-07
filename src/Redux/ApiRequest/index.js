import axios from "axios";

import {
    loginFailure,
    loginStart,
    loginSuccess,
    registerStart,
    registerSuccess,
    registerFailure,
} from "../authSlice";

import {
    userFailure,
    userStart,
    userSuccess,
    DeleteUserStart,
    DeleteUserSuccess,
    DeleteUserFailure,
    uploadFileStart, uploadFileSuccess, uploadFileFailure,
    getImageStart, getImageSuccess, getImageFailure
} from "../UserSlice";

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

            alert("Login successful!");
            setisOpen(false);
            navigate("/");
        } else {
            // Xử lý trường hợp phản hồi không thành công (vd: mã trạng thái không phải 200)
            dispatch(loginFailure());
            alert("Error logging in");
        }
    } catch (err) {
        // Xử lý lỗi (vd: log lỗi hoặc hiển thị thông báo lỗi cho người dùng)
        console.error("Login failed:", err);
        dispatch(loginFailure());
        alert("Login failed!");
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await axios.post(`${URL_BE}/auth/register`,user);
        if (res.status === 200) {
            // Xử lý dữ liệu phản hồi ở đây nếu cần
            dispatch(registerSuccess());
            alert("Registration successful!");
            // navigate("/login");
        } else {
            // Xử lý trường hợp phản hồi không thành công (vd: mã trạng thái không phải 201)
            dispatch(registerFailure());
            alert("Registration failed!");
        }
    } catch (err) {
        // Xử lý lỗi (vd: log lỗi hoặc hiển thị thông báo lỗi cho người dùng)
        console.error("Registration failed:", err);
        dispatch(registerFailure());
        alert("Registration failed!");
    }
};
export const getAllUsers = async (access_token, dispatch, axiosJWT) => {
    dispatch(userStart());
    try {
        const res = await axiosJWT.get(`${URL_BE}/user`, {
            headers: {
                token: `${access_token}`,
            },
        });
        if (res.status === 200) {
            // Xử lý dữ liệu phản hồi ở đây nếu cần
            dispatch(userSuccess(res.data)); // Assuming res.data contains user data.
        } else {
            // Xử lý trường hợp phản hồi không thành công (vd: mã trạng thái không phải 200)
            dispatch(userFailure());
        }
    } catch (err) {
        // Xử lý lỗi (vd: log lỗi hoặc hiển thị thông báo lỗi cho người dùng)
        console.error("User failed:", err);
        dispatch(loginFailure());
    }
};

export const DeleteUser = async (access_token, dispatch, id, axiosJWT) => {
    dispatch(DeleteUserStart());
    console.log("Delete: access_token", access_token);
    try {
        const res = await axiosJWT.delete(`${URL_BE}/user/${id}`, {
            headers: {
                token: `${access_token}`,
            },
        });
        if (res.status === 200) {
            // Xử lý dữ liệu phản hồi ở đây nếu cần
            dispatch(DeleteUserSuccess(res.data)); // Assuming res.data contains user data.
        } else {
            // Xử lý trường hợp phản hồi không thành công (vd: mã trạng thái không phải 200)
            console.log("Mã trạng thái không phải 200");
            dispatch(DeleteUserFailure());
        }
    } catch (err) {
        // Xử lý lỗi (vd: log lỗi hoặc hiển thị thông báo lỗi cho người dùng)
        console.error("User failed:", err);
        dispatch(loginFailure());
    }
};

export const uploadFile = async (file, dispatch, access_token, axiosJWT) => {
    dispatch(uploadFileStart());
    try {
        const res = await axiosJWT.post(`${URL_BE}/upload`, file, {
            headers: {
                token: `${access_token}`,
            },
        });
        if (res.status === 201) {
            // Xử lý dữ liệu phản hồi ở đây nếu cần
            dispatch(uploadFileSuccess(res.data)); // Assuming res.data contains user data.
        } else {
            // Xử lý trường hợp phản hồi không thành công (vd: mã trạng thái không phải 201)
            dispatch(uploadFileFailure());
        }
    } catch (err) {
        // Xử lý lỗi (vd: log lỗi hoặc hiển thị thông báo lỗi cho người dùng)
        console.error("Upload failed:", err);
        dispatch(uploadFileFailure());
    }
};
export const getImage = async (access_token, dispatch, axiosJWT) => {
    dispatch(getImageStart());
    try {
        const res = await axiosJWT.get(`${URL_BE}/user/images`, {
            headers: {
                token: `${access_token}`,
            },
        });
        if (res.status === 200) {
            // Xử lý dữ liệu phản hồi ở đây nếu cần
            dispatch(getImageSuccess(res.data)); // Assuming res.data contains user data.
        } else {
            // Xử lý trường hợp phản hồi không thành công (vd: mã trạng thái không phải 200)
            dispatch(getImageFailure());
        }
    } catch (err) {
        // Xử lý lỗi (vd: log lỗi hoặc hiển thị thông báo lỗi cho người dùng)
        console.error("Get image failed:", err);
        dispatch(getImageFailure());
    }
}

