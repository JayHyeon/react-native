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
    required: true,
    unique: true
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

categoryScheme.pre("save", async function(next) {
  let Category = this.constructor;
  let categories = this;  
  //model 안의 paswsword가 변환될때만 암호화
  if (categories.isModified("parent")) {
    if(categories.parent != ""){
      let parent = await Category.findOne({name : categories.parent});
      categories.depth = parent.depth + 1;
      categories.parent = parent.idx;
      next();
    }else{
      next();
    }
  } else {
    next();
  }
});

categoryScheme.statics.create = function (payload) {
  const categories = new this(payload);
  return categories.save();
};

categoryScheme.statics.findAll = function (parent) {
  return this.find({ parent: parent }, {name: 1} ).sort({ "idx" : 1 });
};

categoryScheme.statics.findParent = function (name) {
  return this.findOne({ name: name }, {idx: 1});
};

module.exports = mongoose.model("Category", categoryScheme);