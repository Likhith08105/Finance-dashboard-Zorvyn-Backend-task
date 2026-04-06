// Dashboard controller
const dashboardService = require('../services/dashboardService');

module.exports = {
  async getSummary(req, res, next) {
    try {
      const summary = await dashboardService.getSummary();
      res.json(summary);
    } catch (err) {
      next(err);
    }
  }
};
