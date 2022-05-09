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
  },
  autoLoginToken: {
    type: String,
    default: ''
  }
},
{
  timestamps: true
});

userScheme.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'idx',
  startAt: 1,
  increment: 1
});

userScheme.statics.create = function (payload) {
  const todo = new this(payload);
  return todo.save();
};

userScheme.statics.findOneByLogin = function (payload) {
  return this.findOne({ $and : [{ id: payload.id }, { password: payload.password }] });
};

module.exports = mongoose.model("User", userScheme);