const Transaction = require('../models/Transaction_model');
const User = require('../models/User');


// Create a new transaction
exports.createTransaction = async (req, res) => {
    console.log('User:', req.user); 

    if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    const { type, amount } = req.body;

    if (!type || amount === undefined) {
        return res.status(400).json({ error: 'Type and amount are required' });
    }

    try {
        // Find the user (assuming the user is logged in and their ID is stored in req.user)
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Validate and update balance
        if (type === 'withdrawal') {
            if (amount > user.balance) {
                return res.status(400).json({ error: 'Insufficient Funds' });
            }
            user.balance -= amount;
        } else if (type === 'deposit') {
            user.balance += amount;
        } else {
            return res.status(400).json({ error: 'Invalid transaction type' });
        }

        // Create and save the transaction
        const transaction = new Transaction({ 
            user: user._id, 
            username: user.username, // Include username
            type, 
            amount, 
            balance: user.balance 
        });
        await transaction.save();

        // Save updated user balance
        await user.save();

        return res.status(201).json({ 
            message: 'Transaction created successfully', 
            transaction: {
                _id: transaction._id,
                type: transaction.type,
                amount: transaction.amount,
                balance: transaction.balance,
                
            },
            balance: user.balance 
        });
    } catch (error) {
        console.error('Server Error:', error.message);
        return res.status(500).json({ error: 'Server Error', details: error.message });
    }
};



// Retrieve all transactions
exports.getAllTransactions = async (req, res) => {
    try {
        // Find the user
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Retrieve all transactions for this user
        const transactions = await Transaction.find({ user: user._id });


        // Map transactions to include _id, type, amount, balance, and date
        const formattedTransactions = transactions.map(transaction => ({
            _id: transaction._id,
            type: transaction.type,
            amount: transaction.amount,
            balance: transaction.balance,
            
        }));

        return res.status(200).json({ balance: user.balance, transactions: formattedTransactions });
    } catch (error) {
        console.error('Server Error:', error.message);
        return res.status(500).json({ error: 'Server Error', details: error.message });
    }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
    const { id } = req.params;

    try {
        const transaction = await Transaction.findById(id);

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        // Find the user
        const user = await User.findById(transaction.user);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update balance before deleting the transaction
        if (transaction.type === 'deposit') {
            user.balance -= transaction.amount;
        } else if (transaction.type === 'withdrawal') {
            user.balance += transaction.amount;
        }

        // Save updated user balance
        await user.save();

        // Remove the transaction using findByIdAndDelete
        await Transaction.findByIdAndDelete(id);

        return res.status(200).json({ 
            message: 'Transaction deleted successfully', 
            balance: user.balance 
        });
    } catch (error) {
        console.error('Server Error:', error.message);
        return res.status(500).json({ error: 'Server Error', details: error.message });
    }
};

