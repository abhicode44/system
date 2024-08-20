import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TransactionPopup from './TransactionPopup';
import { format, parseISO } from 'date-fns';


const TransactionPage = () => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransactions = async () => {
            const token = localStorage.getItem('token'); // Retrieve token
            try {
                const response = await axios.get('http://localhost:5000/api/transactions/all', {
                    headers: { Authorization: `Bearer ${token}` } // Include token in headers
                });
                setBalance(response.data.balance || 0);
                setTransactions(Array.isArray(response.data.transactions) ? response.data.transactions : []);
            } catch (error) {
                console.error("Error fetching transactions", error);
                setError("Failed to load transactions.");
                setTransactions([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    const handleDeposit = () => {
        setPopupType('deposit');
        setShowPopup(true);
    };

    const handleWithdrawal = () => {
        setPopupType('withdrawal');
        setShowPopup(true);
    };

    const handleClosePopup = () => setShowPopup(false);

    const handleTransaction = async (amount) => {
        const numericAmount = Number(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
            alert("Invalid amount.");
            return;
        }
        
        const token = localStorage.getItem('token'); // Retrieve token

        try {
            const response = await axios.post('http://localhost:5000/api/transactions/create', {
                type: popupType,
                amount: numericAmount
            }, {
                headers: { Authorization: `Bearer ${token}` } // Include token in headers
            });
            setBalance(response.data.balance || balance);
            setTransactions([response.data, ...transactions]);
            setShowPopup(false);
        } catch (error) {
            if (error.response && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                console.error("Error processing transaction", error);
                alert("Transaction failed. Please try again.");
            }
        }
    };

    const handleDelete = async (transactionId) => {
        const token = localStorage.getItem('token'); // Retrieve token

        try {
            await axios.delete(`http://localhost:5000/api/transactions/${transactionId}`, {
                headers: { Authorization: `Bearer ${token}` } // Include token in headers
            });
            const response = await axios.get('http://localhost:5000/api/transactions/all', {
                headers: { Authorization: `Bearer ${token}` } // Include token in headers
            });
            setBalance(response.data.balance || balance);
            setTransactions(Array.isArray(response.data.transactions) ? response.data.transactions : []);
        } catch (error) {
            console.error('Error deleting transaction', error);
            alert("Failed to delete transaction. Please try again.");
        }
    };

    

    
    const TransactionRow = ({ transaction }) => (
        
        <tr>
            <td>{transaction._id}</td>
            <td>{transaction.type}</td>
            <td>${transaction.amount ? transaction.amount.toFixed(2) : '0.00'}</td>
            <td>${transaction.balance ? transaction.balance.toFixed(2) : '0.00'}</td>
            <td>
                <button className="button delete" onClick={() => handleDelete(transaction._id)}>Delete</button>
            </td>
        </tr>
    );

    return (
        <div className="container">
            <h2 className="title">Welcome To Transaction Page</h2>
            
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {error && <p className="error-message">{error}</p>}
                    <div className="balance">
                        <p>Balance: <span>${balance ? balance.toFixed(2) : '0.00'}</span></p>
                    </div>
                    <div className="actions">
                        <button className="button deposit" onClick={handleDeposit}>Deposit</button>
                        <button className="button withdraw" onClick={handleWithdrawal}>Withdraw</button>
                    </div>

                    {showPopup && (
                        <TransactionPopup
                            type={popupType}
                            balance={balance}
                            onClose={handleClosePopup}
                            onSubmit={handleTransaction}
                        />
                    )}

                    {transactions.length > 0 ? (
                        <table className="transaction-table">
                            <thead>
                                <tr>
                                    <th>Transaction ID</th>
                                    
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Balance</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map(transaction => (
                                    <TransactionRow key={transaction._id} transaction={transaction} />
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        !loading && <p>No transactions found.</p>
                    )}

                    <button className="logout-button" onClick={() => navigate("/")}>
                        Logout
                    </button>
                </>
            )}

            <style jsx>{`
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                }
                .title {
                    text-align: center;
                    margin-bottom: 20px;
                    color: #333;
                }
                .balance {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .balance p {
                    font-size: 1.5em;
                    font-weight: bold;
                    color: #4caf50;
                }
                .actions {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin-bottom: 20px;
                }
                .button {
                    padding: 12px 25px;
                    font-size: 1em;
                    border: none;
                    border-radius: 8px;
                    color: #fff;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-weight: bold;
                    text-transform: uppercase;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }
                .button.deposit {
                    background: linear-gradient(45deg, #4caf50, #388e3c);
                }
                .button.deposit:hover {
                    background: linear-gradient(45deg, #45a049, #2e7d32);
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
                }
                .button.withdraw {
                    background: linear-gradient(45deg, #f44336, #c62828);
                }
                .button.withdraw:hover {
                    background: linear-gradient(45deg, #e53935, #b71c1c);
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
                }
                .button.delete {
                    background: linear-gradient(45deg, #ff9800, #f57c00);
                }
                .button.delete:hover {
                    background: linear-gradient(45deg, #fb8c00, #ef6c00);
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
                }
                .transaction-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                .transaction-table th, .transaction-table td {
                    border: 1px solid #ddd;
                    padding: 12px;
                    text-align: left;
                }
                .transaction-table th {
                    background-color: #f4f4f4;
                    color: #333;
                }
                .transaction-table tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
                .transaction-table tr:hover {
                    background-color: #e0e0e0;
                }
                .date-column {
                    width: 250px; /* Adjust this width as needed */
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
                .error-message {
                    color: red;
                    text-align: center;
                    font-size: 1.2em;
                }
            `}</style>
        </div>
    );
};

export default TransactionPage;
