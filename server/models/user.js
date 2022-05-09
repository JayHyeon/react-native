const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const userScheme = new mongoose.Schema({
  idx: {
    type: Number,
    required: true,
    default: 1
  },
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userScheme.plugin(autoIncrement.plugin, {
  model: 'Todo',
  field: 'idx',
  startAt: 1,
  increment: 1
});

userScheme.statics.create = function (payload) {
  const todo = new this(payload);
  return todo.save();
};

userScheme.statics.findAll = function () {
  return this.find({}).sort({ "idx" : -1 });
};

userScheme.statics.findOneByTodoid = function (id) {
  return this.findOne({ _id: id });
};

userScheme.statics.updateByTodoid = function (id, payload) {
  return this.updateOne({ _id: id }, payload);
};

userScheme.statics.deleteByTodoid = function (id) {
  return this.deleteOne({ _id: id });
};

module.exports = mongoose.model("User", userScheme);