import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../../src/Component/Layout/component/Header'; // Ensure the correct path
import Footer from '../../src/Component/Layout/component/Footer'; // Ensure the correct path
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AuthenticatedRoute = ({ element: Element, adminOnly, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    const userString = localStorage.getItem('user');

    let user = null; // Khai báo biến `user` ngoài khối `if` để sử dụng sau đó

    if (userString) {
        // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
        user = JSON.parse(userString);
    } else {
        console.log("No user data found in localStorage");
    }
    const isAdmin = user?.user.admin;
    // console.log("Authenticated:", isAuthenticated);
    // console.log("Current User:", user);
    // console.log("Is Admin:", isAdmin);
    // console.log("Admin Only:", adminOnly);  
    if (!isAuthenticated) {
        console.log('not authenticated');
        toast.error('You must be logged in to view this page');
        return <Navigate to="/login" />;
    }

    // Redirect to unauthorized if the route is admin-only and the user is not an admin
    if (adminOnly && !isAdmin) {
        console.log('not admin');
        toast.error('You are not authorized to view this page');
        return <Navigate to="/unauthorized" />;
    }

    return (
        <>
            <Header />
            <main>
                <Element {...rest} />
            </main>
            <Footer />
        </>
    );
};

export default AuthenticatedRoute;
