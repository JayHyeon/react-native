const router = require('express').Router();
const User = require('../models/user');

router.post('/join', (req, res) => {
  User.create(req.body)
    .then(users => res.send(users))
    .catch(err => res.status(500).send(err));
});

router.post('/login', (req, res) => {
  User.findOneByLogin(req.body.id)
    .then((users) => {
      if (!users) return res.status(404).send({ err: 'User not found' });

      users
      .comparePassword(req.body.password)
      .then((isMatch) => {
        if (!isMatch) {
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 일치하지 않습니다",
          });
        }
        
        User
        .updateLoginToken(users.id)
        .then((result) => {
          return res.json({
            loginSuccess: true,
            id: users.id,
            name: users.name,
            level: users.level,
            token: result.loginToken
          });                
        })
        .catch((err) => res.json({ loginSuccess: false, err }));
      })
      .catch((err) => res.json({ loginSuccess: false, err }));
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;