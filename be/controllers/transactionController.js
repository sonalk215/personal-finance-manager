const Transaction = require('../models/Transaction');

// POST /api/transactions
// Create transaction
const createTransaction = async (req, res) => {
  try {
    const { title, amount, category, type, date, notes } = req.body;

    const transaction = await Transaction.create({
      userId: req.user.id,
      title,
      amount,
      category,
      type,
      date,
      notes,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET /api/transactions
// Get logged-in user's transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id })
      .populate('category')
      .sort({
        createdAt: -1,
      });

    res.json(transactions);
    console.log(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// PUT /api/transactions/:id
// Update transaction
const updateTransaction = async (req, res) => {
  console.log('updateTransaction called with id: ', req);
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found',
      });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      req.body,
      { new: true }
    ).populate('category');
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE /api/transactions/:id
// Delete transaction
const deleteTransaction = async (req, res) => {
  console.log('DELETE     ', req.params, req);
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found',
      });
    }

    await Transaction.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Transaction deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
};
