import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Pgae_Admin_User-table.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function UsersContent() {
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [refreshKey, setRefreshKey] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: 'username', direction: 'ascending' });
  const accessToken = localStorage.getItem('token');

  const fetchUsers = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get('http://localhost:5000/user/getAllUsers', {
        headers: {
          token: accessToken,
        },
      });
      if (response.status === 200) {
        setUsers(response.data.users);
      } else {
        setError('Failed to fetch users');
      }
    } catch (err) {
      setError('An error occurred while fetching users');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [accessToken, refreshKey]);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsAdmin(user.admin);
    setShowEditModal(true);
  };

  const handleAddClick = () => {
    setNewUser({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setShowAddModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
    setIsAdmin(false);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewUser({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleSaveChanges = async () => {
    if (!selectedUser || !selectedUser._id) {
      alert('No user selected or user ID missing');
      return;
    }

    const updatedUser = {
      ...selectedUser,
      admin: isAdmin,
      role: isAdmin ? 'Admin' : 'User',
    };

    try {
      const response = await axios.put(`http://localhost:5000/user/updateUser/${selectedUser._id}`, updatedUser, {
        headers: {
          token: accessToken,
        },
      });

      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === selectedUser._id ? updatedUser : user
          )
        );
        handleCloseEditModal();
      } else {
        alert('Failed to update user');
      }
    } catch (err) {
      alert('An error occurred while updating the user');
    }
  };

  const handleAddUser = async () => {
    if (newUser.password !== newUser.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const userToAdd = {
      ...newUser,
    };

    try {
      const response = await axios.post('http://localhost:5000/auth/register', userToAdd, {
        headers: {
          token: accessToken,
        },
      });

      if (response.status === 200) {
        alert('User added successfully');
        setRefreshKey((prevKey) => prevKey + 1);
        handleCloseAddModal();
      } else {
        alert('Failed to add user');
      }
    } catch (err) {
      alert('An error occurred while adding the user');
    }
  };

  const handleDelete = async (user) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;
    try {
      const response = await axios.delete(`http://localhost:5000/user/deleteUser/${user._id}`, {
        headers: {
          token: accessToken,
        },
      });
      
      if (response.status === 200) {
        alert('User deleted successfully');
        setUsers((prevUsers) => prevUsers.filter((u) => u._id !== user._id));
      } else {
        alert('Failed to delete user');
      }
    } catch (err) {
      console.error('Error in handleDelete:', err);
      alert('An error occurred while deleting the user');
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={cx('users-content')}>
      <div className={cx('users-header')}>
        <h2>Users</h2>
        <button
          className={cx('refresh-btn')}
          onClick={handleRefresh}
          style={{ marginRight: '10px' }}
        >
          <FontAwesomeIcon icon={faArrowsRotate} />
        </button>
        <button className={cx('add-user-btn')} onClick={handleAddClick}>
          Add User
        </button>
      </div>
      <table className={cx('users-table')}>
        <thead>
          <tr>
            <th>ID</th>
            <th onClick={() => handleSort('username')}>Name {sortConfig.key === 'username' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
            <th onClick={() => handleSort('email')}>Email {sortConfig.key === 'email' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
            <th onClick={() => handleSort('admin')}>Role {sortConfig.key === 'admin' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.length > 0 ? (
            sortedUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.admin ? 'Admin' : 'User'}</td>
                <td>
                  <button className={cx('edit-btn')} onClick={() => handleEditClick(user)}>
                    Edit
                  </button>
                  <button className={cx('delete-btn')} onClick={() => handleDelete(user)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit User Modal */}
      {showEditModal && (
        <div className={cx('modal')}>
          <div className={cx('modal-content')}>
            <h2>Edit User</h2>
            <label>
              Name:
              <input
                type="text"
                value={selectedUser?.username || ''}
                onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={selectedUser?.email || ''}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              />
            </label>
            <div className={cx('checkbox-container')}>
              <p>Is Admin:</p>
              <label>
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              </label>
            </div>
            <div className={cx('modal-actions')}>
              <button onClick={handleSaveChanges}>Save Changes</button>
              <button onClick={handleCloseEditModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className={cx('modal')}>
          <div className={cx('modal-content')}>
            <h2>Add New User</h2>
            <label>
              Name:
              <input
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
            </label>
            <label>
              Confirm Password:
              <input
                type="password"
                value={newUser.confirmPassword}
                onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
              />
            </label>
            <div className={cx('modal-actions')}>
              <button onClick={handleAddUser}>Add User</button>
              <button onClick={handleCloseAddModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersContent;
