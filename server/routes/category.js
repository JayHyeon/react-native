const router = require('express').Router();
const Category = require('../models/category');

router.post('/add', (req, res) => {
  console.log(req.body)
  Category.create(req.body)
    .then(categories => res.send(categories))
    .catch(err => res.status(500).send(err));
});

router.get('/list', (req, res) => {  
  Category.findAll(0)
    .then((categories) => {           
      if (!categories) return res.status(404).send({ err: 'Category not found' }); 
      res.send(categories);
    })
    .catch(err => res.status(500).send(err));
});

router.get('/list/:parent', (req, res) => {
  Category.findParent(req.params.parent)
    .then((parent) => {
      if (!parent) return res.status(404).send({ err: 'Category not found' });

      Category.findAll(parent.idx)
        .then((categories) => {
          if (!categories) return res.status(404).send({ err: 'Category not found' });
          res.send(categories);
        }).catch(err => res.status(500).send(err));      
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;