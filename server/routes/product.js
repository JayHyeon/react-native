const router = require('express').Router();
const Product = require('../models/product');

router.post('/new', (req, res) => {
  Product.create(req.body)
    .then(products => res.send(products))
    .catch(err => res.status(500).send(err));
});

router.post('/getinfo', (req, res) => {
  
});

module.exports = router;