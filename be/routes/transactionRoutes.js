const express = require('express');

const {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createTransaction);

router.get('/', authMiddleware, getTransactions);

router.put('/:id', authMiddleware, updateTransaction);

router.delete('/:id', authMiddleware, deleteTransaction);
// router.get('/me', authMiddleware, getCurrentUser);

module.exports = router;
