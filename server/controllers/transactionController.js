const Transaction = require('../models/Transaction_model');

let balance = 0; // Initial mock balance

// Create a new transaction
exports.createTransaction = async (req, res) => {
    const { type, amount } = req.body;

    if (!type || amount === undefined) {
        return res.status(400).json({ error: 'Type and amount are required' });
    }

    try {
        // Validate and update balance
        if (type === 'withdrawal') {
            if (amount > balance) {
                return res.status(400).json({ error: 'Insufficient Funds' });
            }
            balance -= amount;
        } else if (type === 'deposit') {
            balance += amount;
        } else {
            return res.status(400).json({ error: 'Invalid transaction type' });
        }

        // Create and save the transaction
        const transaction = new Transaction({ type, amount, balance });
        await transaction.save();

        return res.status(201).json({ message: 'Transaction created successfully', balance });
    } catch (error) {
        console.error('Server Error:', error.message);
        return res.status(500).json({ error: 'Server Error', details: error.message });
    }
};

// Retrieve all transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        return res.status(200).json({ transactions });
    } catch (error) {
        console.error('Server Error:', error.message);
        return res.status(500).json({ error: 'Server Error', details: error.message });
    }
};




// Retrieve all transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        return res.status(200).json({ balance, transactions });
    } catch (error) {
        console.error('Server Error:', error.message);
        return res.status(500).json({ error: 'Server Error', details: error.message });
    }
};
