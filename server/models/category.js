const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const categoryScheme = new mongoose.Schema({
  idx: {
    type: Number,
    required: true,
    default: 1
  },
  name: {
    type: String,
    required: true
  },
  depth: {
    type: Number,
    default: 1
  },
  parent: {
    type: Number,
    default: 0
  }
},
{
  timestamps: true
});

categoryScheme.plugin(autoIncrement.plugin, {
  model: 'Category',
  field: 'idx',
  startAt: 1,
  increment: 1
});

categoryScheme.statics.create = function (payload) {
  const users = new this(payload);
  return users.save();
};

categoryScheme.statics.findAll = function (parent) {
  return this.find({ parent: parent } ).sort({ "idx" : -1 });
};

module.exports = mongoose.model("Category", categoryScheme);