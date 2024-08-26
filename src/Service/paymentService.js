import axios from "axios";

export const getConfig = async (access_token) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_URL_BE}/payment/config`)
        return res.data;
    } catch (error) {
        console.error('Error fetching config:', error);
        throw error; // Hoặc xử lý lỗi theo cách khác tùy vào nhu cầu của bạn
    }
};