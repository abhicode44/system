import React, { useState } from 'react';

const TransactionPopup = ({ type, balance, onClose, onSubmit }) => {
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const numericAmount = parseFloat(amount);
        if (type === 'withdrawal' && numericAmount > balance) {
            alert('Insufficient Funds');
        } else {
            onSubmit(numericAmount);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3 className="popup-title">{type === 'deposit' ? 'Deposit Money' : 'Withdraw Money'}</h3>
                <p className="popup-balance">Available Balance: <span>${balance.toFixed(2)}</span></p>
                <form onSubmit={handleSubmit} className="popup-form">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="popup-input"
                        required
                    />
                    <div className="popup-buttons">
                        <button type="submit" className="popup-submit-button">Submit</button>
                        <button type="button" onClick={onClose} className="popup-cancel-button">Cancel</button>
                    </div>
                </form>
            </div>

            <style jsx>{`
                .popup-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .popup-content {
                    background: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    width: 300px;
                    max-width: 90%;
                    text-align: center;
                }
                .popup-title {
                    font-size: 1.5em;
                    margin-bottom: 15px;
                    color: #333;
                }
                .popup-balance {
                    font-size: 1.2em;
                    margin-bottom: 20px;
                }
                .popup-balance span {
                    font-weight: bold;
                    color: #4caf50;
                }
                .popup-form {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .popup-input {
                    padding: 10px;
                    font-size: 1em;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    outline: none;
                    transition: border-color 0.3s;
                }
                .popup-input:focus {
                    border-color: #4caf50;
                }
                .popup-buttons {
                    display: flex;
                    justify-content: space-between;
                    gap: 10px;
                }
                .popup-submit-button {
                    padding: 10px 20px;
                    font-size: 1em;
                    border: none;
                    border-radius: 5px;
                    color: #fff;
                    background-color: #4caf50;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .popup-submit-button:hover {
                    background-color: #45a049;
                }
                .popup-cancel-button {
                    padding: 10px 20px;
                    font-size: 1em;
                    border: none;
                    border-radius: 5px;
                    color: #fff;
                    background-color: #f44336;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .popup-cancel-button:hover {
                    background-color: #e53935;
                }
            `}</style>
        </div>
    );
};

export default TransactionPopup;



