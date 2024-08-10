import axios from 'axios';

// Cấu hình Axios để gửi cookie
axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_URL_BE,
    withCredentials: true, // Điều này sẽ cho phép gửi cookie trong tất cả các yêu cầu
});

export default axiosInstance;
