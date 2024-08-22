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
    axios.get('https://system-1wf6.onrender.com/api/users')
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

    axios.get(`https://system-1wf6.onrender.com/api/users/${user._id}/transactions`, {
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
    <div className="container " >
      <header className="header" style={headerStyles}>
        <h2 className="title">ADMIN PORTAL</h2>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="table-container">
        <div className="table-wrapper">
          <table className="styled-table">
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
                    <button className="button view" onClick={() => handleUserClick(user)} style={roundedButtonStyles}>
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
            <table className="styled-table">
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

        <button className="logout-button" onClick={() => navigate("/")} style={logoutButtonStyles}>
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
  fontSize: '1rem', 
  cursor: 'pointer',
  padding: '5px 10px',
  borderRadius: '50%',
  width: '30px', 
  height: '30px', 
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.3s',
};

const modalTitleStyles = {
  fontSize: '1.85rem', 
  margin: '0',
};

// Adjusted styles for the button
const roundedButtonStyles = {
  borderRadius: '20px', 
  padding: '5px 10px', 
  backgroundColor: ' #4B0082',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  width: '180px', 
};

// Adjust header styles to add space
const headerStyles = {
  textAlign: 'center', 
  padding: '20px 0', 
  marginBottom: '20px', 
};

// Adjust logout button styles
const logoutButtonStyles = {
  width: '100px', 
  padding: '8px 0',
  backgroundColor: '#4B0082',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '5px', 
};

// Styled table CSS
const styledTable = `
  .styled-table {
    width: 90%;
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9rem;
    font-family: 'Arial', sans-serif;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    textAlign: 'center',
    margin: '0 auto',
  }

  .styled-table thead tr {
    background-color: #4B0082;
    color: #ffffff;
    text-align: center;
  }

  .styled-table th,
  .styled-table td {
    padding: 12px 15px;
    text-align: center;
  }

  .styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  .styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  .styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

  .styled-table tbody tr:hover {
    background-color: #f1f1f1;
  }
`;

// Inject the styles into the document
document.head.insertAdjacentHTML("beforeend", `<style>${styledTable}</style>`);

export default BankerAccount;
