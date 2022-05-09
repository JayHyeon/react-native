const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const todoScheme = new mongoose.Schema({
  idx: {
    type: Number,
    required: true,
    default: 1
  },
  content: {
    type: String
  },
  checked: {
    type: Boolean,
    default: false
  }
});

todoScheme.plugin(autoIncrement.plugin, {
  model: 'Todo',
  field: 'idx',
  startAt: 1,
  increment: 1
});

todoScheme.statics.create = function (payload) {
  const todo = new this(payload);
  return todo.save();
};

todoScheme.statics.findAll = function () {
  return this.find({}).sort({ "idx" : -1 });
};

todoScheme.statics.findOneByTodoid = function (id) {
  return this.findOne({ _id: id });
};

todoScheme.statics.updateByTodoid = function (id, payload) {
  return this.updateOne({ _id: id }, payload);
};

todoScheme.statics.deleteByTodoid = function (id) {
  return this.deleteOne({ _id: id });
};

module.exports = mongoose.model("Todo", todoScheme);