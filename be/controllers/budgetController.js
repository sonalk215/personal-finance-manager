const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');

const createBudget = async (req, res) => {
  console.log('---------- cretae budget');
  try {
    const { categoryId, amount, month, year } = req.body;

    const budget = await Budget.create({
      userId: req.user.id,
      categoryId,
      amount,
      month,
      year,
    });
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({
      userId: req.user.id,
    }).populate('categoryId');
    const result = [];

    for (const budget of budgets) {
      const transactions = await Transaction.find({
        userId: req.user.id,
        category: budget.categoryId._id,
        type: 'Expense',
        date: {
          $gte: new Date(budget.year, budget.month - 1, 1),
          $lt: new Date(budget.year, budget.month, 1),
        },
      });

      const spent = transactions.reduce(
        (total, item) => total + Number(item.amount),
        0
      );

      result.push({
        id: budget._id,
        category: {
          id: budget.categoryId._id,
          name: budget.categoryId.name,
          icon: budget.categoryId.icon,
          color: budget.categoryId.color,
        },
        budgetAmount: budget.amount,
        month: budget.month,
        year: budget.year,
        spent,
        remaining: budget.amount - spent,
        exceeded: spent > budget.amount,
      });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      req.body,
      { new: true }
    );
    res.json(budget);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteBudget = async (req, res) => {
  try {
    await Budget.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    res.json({
      message: 'Budget deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
};
