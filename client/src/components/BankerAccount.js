import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

// Set the root element for accessibility
Modal.setAppElement('#root');

const BankerAccount = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [userTransactions, setUserTransactions] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState('');
  const navigate = useNavigate();

  // Fetch all users
  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
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

  // Handle user selection
  const handleUserClick = (user) => {
    setSelectedUserName(user.username); // Set username
    const token = localStorage.getItem('token');

    axios.get(`http://localhost:5000/api/users/${user._id}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setUserTransactions(response.data);
        setModalIsOpen(true);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load transactions.');
      });
  };

  // Close modal
  const closeModal = () => {
    setModalIsOpen(false);
    setUserTransactions([]);
    setSelectedUserName('');
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
                <th>USER ID</th>
                <th>Username</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.role || 'N/A'}</td>
                  <td>
                    <button className="button view" onClick={() => handleUserClick(user)}>
                      Show Transactions
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="User Transactions"
          style={modalStyles}
        >
          <div style={modalHeaderStyles}>
            <h5 style={modalTitleStyles}>Transactions for {selectedUserName}</h5>
            <button onClick={closeModal} style={closeButtonStyles}>X</button>
          </div>
          {userTransactions.length > 0 ? (
            <table style={tableStyles}>
              <thead>
                <tr>
                <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Balance</th>
                  
                </tr>
              </thead>
              <tbody>
                {userTransactions.map(transaction => (
                  <tr key={transaction._id}>
                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                    <td>{transaction.type}</td>
                    <td>${transaction.amount.toFixed(2)}</td>
                    <td>${transaction.balance.toFixed(2)}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No transactions found.</p>
          )}
        </Modal>

        <button className="logout-button" onClick={() => navigate("/")}>
          Logout
        </button>
      </div>
    </div>
  );
};

// Custom styles for the modal
const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '800px',
    padding: '20px',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
  },
};

const modalHeaderStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
};

const closeButtonStyles = {
  background: '#ff5c5c',
  border: 'none',
  color: '#fff',
  fontSize: '1rem', // Adjust font size
  cursor: 'pointer',
  padding: '5px 10px',
  borderRadius: '50%',
  width: '30px', // Fixed width
  height: '30px', // Fixed height to make it circular
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.3s',
};

const modalTitleStyles = {
  fontSize: '1.25rem', // Adjust title font size
  margin: '0',
};

const tableStyles = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '10px',
};

export default BankerAccount;
