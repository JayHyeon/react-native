const router = require('express').Router();
const Category = require('../models/category');

router.post('/new', (req, res) => {
  Category.create(req.body)
    .then(categories => res.send(categories))
    .catch(err => res.status(500).send(err));
});

router.get('/list', (req, res) => {  
  Category.findAll(0)
    .then((categories) => {            
      res.send(categories);
    })
    .catch(err => res.status(500).send(err));
});

router.get('/list/:parent', (req, res) => {
  Category.findAll(req.params.parent)
    .then((categories) => {
      if (!categories) return res.status(404).send({ err: 'Post not found' });
      res.send(categories);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;