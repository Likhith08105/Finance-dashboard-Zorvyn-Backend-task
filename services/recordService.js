// Record service
const Record = require('../models/Record');

module.exports = {
  async createRecord(data) {
    return await Record.create(data);
  },
  async getRecords(filter, options) {
    const { skip, limit } = options;
    return await Record.find(filter).sort({ date: -1 }).skip(skip).limit(limit);
  },
  async countRecords(filter) {
    return await Record.countDocuments(filter);
  },
  async updateRecord(id, data) {
    return await Record.findByIdAndUpdate(id, data, { new: true });
  },
  async deleteRecord(id) {
    return await Record.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }
};
