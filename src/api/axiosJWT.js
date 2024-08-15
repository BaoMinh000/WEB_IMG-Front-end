import axios from 'axios';
import { refreshAccessToken } from '../Redux/ApiRequest'; // Đường dẫn tới hàm refreshAccessToken mà bạn đã định nghĩa

const axiosJWT = axios.create({
  baseURL: process.env.REACT_APP_URL_BE,
});

axiosJWT.interceptors.request.use(
  (config) => {
    // Thêm access_token vào headers của mỗi yêu cầu
    const token = localStorage.getItem('token'); // Hoặc từ Redux store
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
  }  
    return config;
  },
  (error) => Promise.reject(error)
);

axiosJWT.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Yêu cầu refresh token để lấy access token mới
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
          // Lưu token mới vào headers và lưu vào localStorage
          localStorage.setItem('access_token', newAccessToken);
          originalRequest.headers['token'] = `Bearer ${newAccessToken}`;

          // Thực hiện lại yêu cầu ban đầu với access_token mới
          return axiosJWT(originalRequest);
        }
      } catch (err) {
        console.error("Failed to refresh token", err);
        // Có thể điều hướng người dùng đến trang đăng nhập nếu làm mới token thất bại
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosJWT;
