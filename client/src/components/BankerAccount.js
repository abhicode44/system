import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BankerAccount = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [balance, setBalance] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/usersList')
      .then(response => {
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          setError('Invalid data format received.');
        }
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load user data.');
      });
  }, []);

  const handleUserClick = (userId) => {
    setSelectedUser(userId);
    axios.get(`http://localhost:5000/api/accounts/${userId}`)
      .then(response => setBalance(response.data.balance))
      .catch(err => {
        console.error(err);
        setError('Failed to load balance data.');
      });
  };

  return (
    <div className="container">
      <header className="header">
        <h2 className="title">ADMIN PORTAL</h2>
      </header>

      {error && <div className="error-message">{error}</div>}
      
      <div className="table-container">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.role || 'N/A'}</td>
                  <td>
                    <button className="button view" onClick={() => handleUserClick(user._id)}>
                      Show Balance
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedUser && (
          <div className="balance-container">
            <h5>Balance for User {selectedUser}</h5>
            <p className="balance">${balance !== null ? balance.toFixed(2) : 'Loading...'}</p>
          </div>
        )}

        <button className="logout-button" onClick={() => navigate("/")}>
          Logout
        </button>
      </div>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .title {
          color: #333;
        }
        .error-message {
          color: red;
          text-align: center;
          font-size: 1.2em;
          margin-bottom: 15px;
        }
        .table-container {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
        }
        .table-wrapper {
          overflow-x: auto;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        .table th, .table td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }
        .table th {
          background-color: #f4f4f4;
          color: #333;
        }
        .table tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .table tr:hover {
          background-color: #e0e0e0;
        }
        .button {
          padding: 8px 16px;
          font-size: 0.9em;
          border: none;
          border-radius: 8px;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: bold;
          text-transform: uppercase;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .button.view {
          background: linear-gradient(45deg, #4caf50, #388e3c);
        }
        .button.view:hover {
          background: linear-gradient(45deg, #45a049, #2e7d32);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        }
        .balance-container {
          margin-top: 20px;
          text-align: center;
        }
        .balance {
          font-size: 1.5em;
          font-weight: bold;
          color: #4caf50;
        }
        .logout-button {
          display: block;
          width: 150px;
          margin: 20px auto;
          padding: 12px;
          font-size: 1em;
          border: none;
          border-radius: 8px;
          color: #fff;
          background: linear-gradient(45deg, #2196f3, #1976d2);
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: bold;
          text-transform: uppercase;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .logout-button:hover {
          background: linear-gradient(45deg, #42a5f5, #1e88e5);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default BankerAccount;
