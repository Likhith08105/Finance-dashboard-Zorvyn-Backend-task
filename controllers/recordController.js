// Record controller
const recordService = require('../services/recordService');

module.exports = {
  async createRecord(req, res, next) {
    try {
      const record = await recordService.createRecord({ ...req.body, createdBy: req.user._id });
      res.status(201).json(record);
    } catch (err) {
      next(err);
    }
  },
  async getRecords(req, res, next) {
    try {
      const { type, category, startDate, endDate, page = 1, limit = 10 } = req.query;
      const filter = { isDeleted: false };
      if (type) filter.type = type;
      if (category) filter.category = category;
      if (startDate || endDate) filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const records = await recordService.getRecords(filter, { skip, limit: parseInt(limit) });
      const total = await recordService.countRecords(filter);
      res.json({ records, total, page: parseInt(page), limit: parseInt(limit) });
    } catch (err) {
      next(err);
    }
  },
  async updateRecord(req, res, next) {
    try {
      const record = await recordService.updateRecord(req.params.id, req.body);
      if (!record) return res.status(404).json({ message: 'Record not found' });
      res.json(record);
    } catch (err) {
      next(err);
    }
  },
  async deleteRecord(req, res, next) {
    try {
      const record = await recordService.deleteRecord(req.params.id);
      if (!record) return res.status(404).json({ message: 'Record not found' });
      res.json({ message: 'Record deleted (soft)', record });
    } catch (err) {
      next(err);
    }
  }
};
