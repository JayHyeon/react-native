const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const saltRounds2 = 12;
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
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  loginToken: {
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

userScheme.pre("save", function(next) {
  let user = this;
  //model 안의 paswsword가 변환될때만 암호화
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);  
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userScheme.pre("findOneAndUpdate", function(next) {
  let update = {...this.getUpdate()};
  let _this = this;
  if (update.loginToken) {   
    bcrypt.genSalt(saltRounds2, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(update.loginToken, salt, function (err, hash) {
        if (err) return next(err);  
        update.loginToken = hash;
        _this.setUpdate(update);
        next();
      });
    });
  } else {
    next();
  }
});

userScheme.methods.comparePassword = function (plainPassword) {
  return bcrypt
    .compare(plainPassword, this.password)
    .then((isMatch) => isMatch)
    .catch((err) => err);
};

userScheme.statics.create = function (payload) {
  const users = new this(payload);
  return users.save();
};

userScheme.statics.findOneByLogin = function (id) {
  return this.findOne({ id: id });
};

userScheme.statics.updateLoginToken = function (id) {
  let value = id + Date.now();
  return this.findOneAndUpdate({ id: id }, { loginToken: value }, {new: true});
};


module.exports = mongoose.model("User", userScheme);