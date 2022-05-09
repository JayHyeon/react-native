const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const postScheme = new mongoose.Schema({
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

postScheme.plugin(autoIncrement.plugin, {
  model: 'Post',
  field: 'idx',
  startAt: 1,
  increment: 1
});

postScheme.statics.create = function (payload) {
  const post = new this(payload);
  return post.save();
};

postScheme.statics.findAll = function (offset, limit) {
  return this.find({}).sort({ "idx" : -1 }).skip(offset).limit(limit);
};

postScheme.statics.findByPostWord = function (word, offset, limit) {
  return this.find({ $or : [{ content: { $regex: '.*' + word + '.*'} }, { title: { $regex: '.*' + word + '.*'}}]}).sort({ "idx" : -1 }).skip(offset).limit(limit);
};

postScheme.statics.updateByPostid = function (id, payload) {
  return this.updateOne({ _id: id }, payload);
};

postScheme.statics.deleteByPostid = function (id) {
  return this.deleteOne({ _id: id });
};

module.exports = mongoose.model("Post", postScheme);