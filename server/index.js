const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db_connection');
const UserModel = require('./models/User');
const dotenv = require('dotenv');
const transactionRoutes = require("./routes/transactionsRoute")
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

// Connect to the database
connectDB();

app.use(cors());
app.use(express.json());

// Authentication routes
app.use('/api', authRoutes  );

//Transaction Routes
app.use('/api/transactions', transactionRoutes);

//getall uses 
app.use('/api/users', userRoutes); 



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
