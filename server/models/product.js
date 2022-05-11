const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const productScheme = new mongoose.Schema({
  idx: {
    type: Number,
    required: true,
    default: 1
  },
  name: {
    type: String,
    required: true
  },
  buyPrice: {
    type: Number,
    default: 0
  },
  sellPrice: {
    type: Number,
    default: 0
  }
},
{
  timestamps: true
});

productScheme.plugin(autoIncrement.plugin, {
  model: 'Product',
  field: 'idx',
  startAt: 1,
  increment: 1
});

productScheme.statics.create = function (payload) {
  const users = new this(payload);
  return users.save();
};

productScheme.statics.findOneByLogin = function (id) {
  return this.findOne({ id: id });
};

module.exports = mongoose.model("Product", productScheme);