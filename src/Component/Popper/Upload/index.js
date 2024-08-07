import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./upload.module.scss";
import axios from "axios";
const cx = classNames.bind(styles);

function Upload({ isShowUpLoad, onClose, user }) {
    const [file, setFile] = useState(null);
    const [images, setImages] = useState([]);

    if (!isShowUpLoad) return null;

    const handleClose = () => {
        onClose();
        setFile(null);
    };

    const handleUpload = (event) => {
        setFile(event.target.files[0]);
        console.log(event.target.files[0]);
        console.log("Media file uploaded");
    };

    const handleSubmitUpload = async (event) => {
        event.preventDefault();
        if (!file) {
            alert('Vui lòng chọn một file để tải lên.');
            return;
        }

        const type = file.type.split('/')[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', user.user._id);
        formData.append('username', user.user.username);
        formData.append('type', type);

        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log(data.message);
            if (data.message === 'File uploaded successfully') {
                alert('File uploaded successfully');
                setImages([...images, data.image]);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div>
            <div className={cx("modal_overlay")} onClick={handleClose}></div>
            <div className={cx("upload")}>
                <div className={cx("upload__content")}>
                    <div className={cx("upload__title")}>
                        <div className={cx('tabs')}>
                            Upload Media
                        </div>
                        <button
                            onClick={handleClose}
                            className={cx("upload__close")}
                        >
                            X
                        </button>
                    </div>
                    <div className={cx("upload__form")}>
                        <form className={cx("upload__form-content")} onSubmit={handleSubmitUpload}>
                            <div className={cx("upload__form-group")}>
                                <label
                                    htmlFor="upload__form-file"
                                    className={cx("upload__form-label")}
                                >
                                    Choose a Media file
                                </label>
                                <input
                                    type="file"
                                    id="upload__form-file"
                                    className={cx("upload__form-input")}
                                    accept="image/*, video/*"
                                    onChange={handleUpload}
                                />
                            </div>
                            <button
                                type="submit"
                                className={cx("upload__form-submit")}
                            >
                                Upload
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Upload;
