import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./upload.module.scss";
import axios from "axios";
const cx = classNames.bind(styles);

function Upload({ isShowUpLoad, onClose, user }) {
    const [file, setFile] = useState('null');
    const [images, setImages] = useState([]);//upload ảnh từ backend
    const [activeTab, setActiveTab] = useState('Media');
    if (!isShowUpLoad) return null;
    
    const handleclose = () => {
        onClose();
        setFile(null);
    };
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    
    //Upload
    const handleUpload = async (event) => {
        setFile(event.target.files[0]);
        console.log(event.target.files[0]);
        console.log("Media file uploaded");

    };
    console.log(file);
    const handleSubmitUpload = async (event) => {
        event.preventDefault();
        if (!file) {
            alert('Vui lòng chọn một file để tải lên.');
            return;
        }
        if(activeTab == 'Media'){
            console.log('UploadMedia', !file);

            const type = file.type.split('/')[0];
            // if (type != 'image' && type != 'video' && type != 'text'){
            //     alert('Loại file không hợp lệ');
            //     return;
            // }
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
                }else{
                    alert(data.message)
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }else{
            console.log('UploadCSV');

            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', user.user._id);
            formData.append('username', user.user.username);
    
            try {
                const response = await fetch('http://localhost:5000/uploadCSV', {
                    method: 'POST',
                    body: formData
                });
    
                const data = await response.json();
                console.log(data.message);
                if (data.message === 'Tải CSV lên và lưu vào MongoDB thành công, đã tạo hình ảnh từ CSV!') {
                    alert('Tải CSV lên và lưu vào MongoDB thành công, đã tạo hình ảnh từ CSV!');
                }else{
                    alert(data.message)
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        
        }
    }
    //Upload CSV
    const handleUploadCSV = async (event) => {
        setFile(event.target.files[0]); // Set file for CSV upload
        console.log(event.target.files[0]);
        console.log("CSV file uploaded");
    };


    return (
        <div>
            <div className={cx("modal_overlay")} onClick={handleclose}></div>

            <div className={cx("upload")}>
                <div className={cx("upload__content")}>
                    <div className={cx("upload__title")}>
                    <div className={cx('tabs')}>
                        <div className={cx('tab', { 'active': activeTab === 'Media' })} onClick={() => handleTabClick('Media')}>Upload Media</div>
                        <div className={cx('tab', { 'active': activeTab === 'csv' })} onClick={() => handleTabClick('csv')}>Upload CSV</div>
                    </div>
                        <button
                            onClick={onClose}
                            className={cx("upload__close")}
                        >
                            X
                        </button>
                    </div>
                    <div className={cx("upload__form")}>
                        <form className={cx("upload__form-content")} onSubmit={handleSubmitUpload}>

                            <div className={cx("upload__form-group")}>
                                {activeTab === 'Media' && (
                                    <div>
                                    {/* Hiển thị nội dung cho tab ảnh */}
                                        <label
                                            htmlFor="upload__form-file"
                                            className={cx("upload__form-label")}
                                        >
                                            Choose a Media file
                                        </label>
                                    </div>
                                )}
                                {activeTab === 'csv' && (
                                    <div>
                                    {/* Hiển thị nội dung cho tab ảnh */}
                                        <label
                                            htmlFor="upload__form-file"
                                            className={cx("upload__form-label")}
                                        >
                                            Choose a CSV file 
                                        </label>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    id="upload__form-file"
                                    className={cx("upload__form-input")}
                                    accept={activeTab === 'Media' ? "image/*, video/*" : ".csv"}
                                    onChange={activeTab === 'Media' ? handleUpload : handleUploadCSV}
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
