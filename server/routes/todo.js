const router = require('express').Router();
const Todo = require('../models/todo');

router.get('/getData', (req, res) => {
  Todo.findAll()
    .then((todos) => {      
      if (!todos.length) return res.status(404).send({ err: 'Todo not found' });
      res.send(todos);
    })
    .catch(err => res.status(500).send(err));
});

router.get('/getData/:id', (req, res) => {
  Todo.findOneByTodoid(req.params.id)
    .then((todos) => {
      if (!todos) return res.status(404).send({ err: 'Todo not found' });
      res.send(`findOne successfully: ${todos}`);
    })
    .catch(err => res.status(500).send(err));
});

router.post('/insertData', (req, res) => {
  Todo.create(req.body)
    .then(todos => res.send(todos))
    .catch(err => res.status(500).send(err));
});

router.put('/updateData/:id', (req, res) => {
  Todo.updateByTodoid(req.params.id, req.body.params)
    .then(todos => res.send(todos))
    .catch(err => res.status(500).send(err));
});

router.delete('/deleteData/:id', (req, res) => {
  Todo.deleteByTodoid(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;