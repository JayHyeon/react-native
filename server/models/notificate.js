const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const notificateScheme = new mongoose.Schema({
  idx: {
    type: Number,
    required: true,
    default: 1
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
},
{
  timestamps: true
});

notificateScheme.plugin(autoIncrement.plugin, {
  model: 'Notificate',
  field: 'idx',
  startAt: 1,
  increment: 1
});

notificateScheme.statics.create = function (payload) {
  const post = new this(payload);
  return post.save();
};

notificateScheme.statics.findAll = function (offset, limit) {
  return this.find({}).sort({ "idx" : -1 }).skip(offset).limit(limit);
};

notificateScheme.statics.findByPostWord = function (word, offset, limit) {
  return this.find({ $or : [{ content: { $regex: '.*' + word + '.*'} }, { title: { $regex: '.*' + word + '.*'}}]}).sort({ "idx" : -1 }).skip(offset).limit(limit);
};

notificateScheme.statics.updateByPostid = function (id, payload) {
  return this.updateOne({ _id: id }, payload);
};

notificateScheme.statics.deleteByPostid = function (id) {
  return this.deleteOne({ _id: id });
};

module.exports = mongoose.model("Notificate", notificateScheme);