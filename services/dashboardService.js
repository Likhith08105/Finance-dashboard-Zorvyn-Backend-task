// Dashboard service
const Record = require('../models/Record');

module.exports = {
  async getSummary(userFilter = {}) {
    const match = { isDeleted: false, ...userFilter };
    const records = await Record.find(match);
    const totalIncome = records.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0);
    const totalExpense = records.filter(r => r.type === 'expense').reduce((sum, r) => sum + r.amount, 0);
    const netBalance = totalIncome - totalExpense;
    const categoryTotals = {};
    records.forEach(r => {
      if (!categoryTotals[r.category]) categoryTotals[r.category] = 0;
      categoryTotals[r.category] += r.amount;
    });
    const recent = records.sort((a, b) => b.date - a.date).slice(0, 5);
    return { totalIncome, totalExpense, netBalance, categoryTotals, recent };
  }
};
