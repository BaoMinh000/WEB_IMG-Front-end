import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DeleteUser, getAllUsers } from "../../../Redux/ApiRequest";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classNames from "classnames/bind";
import style from "./PageListUser.module.scss";
import { loginSuccess } from "../../../Redux/authSlice";

const cx = classNames.bind(style);

function PageListUser() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login.currentUser);
    const AllUser = useSelector((state) => state.user.allUser);
    const msg = useSelector((state) => state.user.msg);
    const users = AllUser?.users;
    const [isRefreshingToken, setIsRefreshingToken] = useState(false); // Thêm state để theo dõi việc làm mới token
    const navigate = useNavigate();

    useEffect(() => {
        const axiosJWT = axios.create();

        const refreshToken = async (refreshToken) => {
            try {
                setIsRefreshingToken(true); // Bắt đầu quá trình làm mới token
                const res = await axios.post(
                    "http://localhost:5000/auth/refresh",
                    { refreshToken },
                    { withCredentials: true }
                );
                localStorage.setItem("token", res.data.access_token);
                dispatch(loginSuccess({ access_token: res.data.access_token }));
                setIsRefreshingToken(false); // Kết thúc quá trình làm mới token
                return res.data;
            } catch (err) {
                setIsRefreshingToken(false); // Kết thúc quá trình làm mới token nếu có lỗi xảy ra
                console.log(err);
                throw err;
            }
        };

        if (user?.access_token && !AllUser) {
            getAllUsers(user.access_token, dispatch, axiosJWT);
        }

        axiosJWT.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (
                    error.response.status === 401 &&
                    !originalRequest._retry &&
                    !isRefreshingToken // Kiểm tra xem token có đang được làm mới không
                ) {
                    originalRequest._retry = true;
                    try {
                        const res = await refreshToken(user.refreshToken);
                        originalRequest.headers.Authorization = `Bearer ${res.access_token}`;
                        return axiosJWT(originalRequest);
                    } catch (error) {
                        console.error("Refresh token failed:", error);
                    }
                }
                return Promise.reject(error);
            }
        );
    }, [user, AllUser, dispatch, isRefreshingToken]); // Thêm isRefreshingToken vào dependencies

    const handleDelete = async (id) => {
        try {
            // if (!isRefreshingToken) {
            //     // Chỉ thực hiện xóa nếu không có quá trình làm mới token đang diễn ra
            //     await refreshToken(user.refreshToken);
            // }
            DeleteUser(user?.access_token, dispatch, id);
        } catch (error) {
            console.error("Delete user failed:", error);
        }
    };

    return (
        <main className={cx("Pagemain")}>
            {!users ? (
                <div>
                    <h2>Empty</h2>
                </div>
            ) : (
                <div className={cx("box-table-header")}>
                    <h2>User List</h2>
                    <table style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th style={{ width: "10%" }}>STT</th>
                                <th style={{ width: "35%" }}>Name</th>
                                <th style={{ width: "35%" }}>Email</th>
                                <th style={{ width: "20%" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(users) &&
                                users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button
                                                className={cx(
                                                    "btn",
                                                    "btn--primary"
                                                )}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className={cx(
                                                    "btn",
                                                    "btn--danger"
                                                )}
                                                onClick={() => {
                                                    handleDelete(user._id);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div>{msg}</div>
        </main>
    );
}

export default PageListUser;
