const mongoose = require('mongoose');
const statsd = require('./statsd');

const schema = new mongoose.Schema({ value: String });
const Values = mongoose.model('values', schema);

module.exports = {
  connectDB() {
    mongoose.connect(process.env.MONGODB_ADDON_URI);
  },

  async updateGauge() {
    try {
      const count = await Values.countDocuments();
      statsd.gauge('values', count);
    } catch (err) {
      console.error(err);
    }
  },

  async getVal(res) {
    try {
      const result = await Values.find();
      const values = {};
      for (const val of result) {
        values[val._id] = val.value;
      }
      const title = process.env.TITLE || 'NodeJS MongoDB demo';
      res.render('index', { title, values });
    } catch (err) {
      console.error(err);
      res.send('database error');
    }
  },

  async sendVal(val, res) {
    try {
      const doc = new Values({ value: val });
      const result = await doc.save();
      this.updateGauge();
      statsd.increment('creations');
      res.status(201).json({ status: 'ok', value: result.value, id: result._id });
    } catch (err) {
      console.error(err);
      res.json({ status: 'error', value: 'Error, db request failed' });
    }
  },

  async delVal(id) {
    try {
      await Values.deleteOne({ _id: id });
      this.updateGauge();
      statsd.increment('deletions');
    } catch (err) {
      console.error(err);
    }
  }
};
