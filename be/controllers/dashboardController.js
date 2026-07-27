const Transaction = require('../models/Transaction');

const getDashboardSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id,
    }).populate('category', 'name color icon');

    let totalIncome = 0;
    let totalExpense = 0;

    const expenseByCategory = {};

    transactions.forEach((transaction) => {
      const amount = Number(transaction.amount);

      if (transaction.type === 'Income') {
        totalIncome += amount;
      } else {
        totalExpense += amount;

        const categoryName = transaction.category?.name || 'Other';
        if (!expenseByCategory[categoryName]) {
          expenseByCategory[categoryName] = {
            name: categoryName,
            value: 0,
          };
        }
        expenseByCategory[categoryName].value += amount;
      }
    });

    const balance = totalIncome - totalExpense;

    const savingRate =
      totalIncome > 0 ? Number(((balance / totalIncome) * 100).toFixed(2)) : 0;

    const recentTransactions = transactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    res.json({
      totalIncome,
      totalExpense,
      balance,
      savingRate,
      expenseByCategory: Object.values(expenseByCategory),
      recentTransactions,
    });
  } catch (err) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardSummary,
};
