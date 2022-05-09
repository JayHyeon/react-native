const router = require('express').Router();
const User = require('../models/user');

router.post('/getUserInfo', (req, res) => {
  User.findOneByLogin(req.body)
    .then((users) => {
      if (!users) return res.status(404).send({ err: 'User not found' });
      res.send(users);
    })
    .catch(err => res.status(500).send(err));
});

router.post('/join', (req, res) => {
  User.create(req.body)
    .then(users => res.send(users))
    .catch(err => res.status(500).send(err));
});

module.exports = router;