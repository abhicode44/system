const express = require('express');
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const verifyUser = require('../middlewares/verifyid');


router.post('/create', verifyUser ,  transactionController.createTransaction);
router.get('/all',  verifyUser , transactionController.getAllTransactions);
router.delete('/:id', verifyUser , transactionController.deleteTransaction);


module.exports = router;


