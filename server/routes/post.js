const router = require('express').Router();
const Post = require('../models/post');

router.get('/getData', (req, res) => {  
  Post.findAll(req.query.offset, req.query.limit)
    .then((posts) => {      
      if (!posts.length) return res.status(404).send({ err: 'Post not found' });
      res.send(posts);
    })
    .catch(err => res.status(500).send(err));
});

router.get('/getData/:word', (req, res) => {
  Post.findByPostWord(req.params.word, req.query.offset, req.query.limit)
    .then((posts) => {
      if (!posts) return res.status(404).send({ err: 'Post not found' });
      res.send(posts);
    })
    .catch(err => res.status(500).send(err));
});

router.post('/insertData', (req, res) => {
  Post.create(req.body)
    .then(posts => res.send(posts))
    .catch(err => res.status(500).send(err));
});

router.put('/updateData/:id', (req, res) => {
  Post.updateByPostid(req.params.id, req.body.params)
    .then(posts => res.send(posts))
    .catch(err => res.status(500).send(err));
});

router.delete('/deleteData/:id', (req, res) => {
  Post.deleteByPostid(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;