const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    type: { type: String, enum: ['deposit', 'withdrawal'], required: true },
    amount: { type: Number, required: true },
    balance: { type: Number, required: true },
    date: {  type: Date, default: Date.now,
    },
});


module.exports = mongoose.model('Transaction', transactionSchema);


