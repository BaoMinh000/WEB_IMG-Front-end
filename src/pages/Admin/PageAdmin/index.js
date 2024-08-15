import React, { useState } from 'react';
import styles from './Pagement.module.scss';
import UsersContent from '../PageAdmin/Component/usertable/index.js';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faGear, faUser } from '@fortawesome/free-solid-svg-icons';
//conponent


const cx = classNames.bind(styles);

function Sidebar({ onSelect }) {
    return (
        <div className={cx('sidebar')}>
            <h2>Admin Dashboard</h2>
            <ul>
                <li><a href="#dashboard" onClick={() => onSelect('dashboard')}>Dashboard</a></li>
                <li>
                    <a href="#users" onClick={() => onSelect('users')}>
                        <FontAwesomeIcon icon={faUser} style={{marginRight:'10px'}}/>
                        Users
                    </a>
                </li>
                <li><a href="#settings" onClick={() => onSelect('settings')}>
                    <FontAwesomeIcon icon={faGear} style={{marginRight:'10px'}}/>
                    Settings
                </a></li>
                <li><a href="#reports" onClick={() => onSelect('reports')}>
                    <FontAwesomeIcon icon={faFlag} style={{marginRight:'10px'}}/>
                    Reports
                </a></li>
            </ul>
        </div>
    );
}
function Header() {
    return (
        <header className={cx('header')}>
            <h1>Admin Panel</h1>
            {/* <div className={cx('header-right')}>
                <a href="#profile">Profile</a>
                <a href="#logout">Logout</a>
            </div> */}
        </header>
    );
}

// function Footer() {
//     return (
//         <footer className={cx('footer')}>
//             <p>&copy; 2024 Your Company. All rights reserved.</p>
//         </footer>
//     );
// }

function DashboardContent() {
    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome to the Dashboard! Here you can find an overview of the system.</p>
        </div>
    );
}

function SettingsContent() {
    return (
        <div>
            <h2>Settings</h2>
            <p>Configure system settings and preferences here.</p>
        </div>
    );
}

function ReportsContent() {
    return (
        <div>
            <h2>Reports</h2>
            <p>View system reports and analytics here.</p>
        </div>
    );
}

function Pagemain() {
    const [activeContent, setActiveContent] = useState('dashboard');

    const renderContent = () => {
        switch (activeContent) {
            case 'dashboard':
                return <DashboardContent />;
            case 'users':
                return <UsersContent />;
            case 'settings':
                return <SettingsContent />;
            case 'reports':
                return <ReportsContent />;
            default:
                return <DashboardContent />;
        }
    };

    return (
        <div className={cx('admin-container')}>
            <Sidebar onSelect={setActiveContent} />
            <div className={cx('main-content')}>
                <Header />
                <div className={cx('content')}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default Pagemain;
