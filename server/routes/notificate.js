const router = require('express').Router();
const Notificate = require('../models/notificate');

router.get('/getData', (req, res) => {  
  Notificate.findAll(req.query.offset, req.query.limit)
    .then((notificates) => {      
      if (!notificates.length) return res.status(404).send({ err: 'Notificate not found' });
      res.send(notificates);
    })
    .catch(err => res.status(500).send(err));
});

router.get('/getData/:word', (req, res) => {
  Notificate.findByPostWord(req.params.word, req.query.offset, req.query.limit)
    .then((notificates) => {
      if (!notificates) return res.status(404).send({ err: 'Notificate not found' });
      res.send(notificates);
    })
    .catch(err => res.status(500).send(err));
});

router.post('/insertData', (req, res) => {
  Notificate.create(req.body)
    .then(notificates => res.send(notificates))
    .catch(err => res.status(500).send(err));
});

router.put('/updateData/:id', (req, res) => {
  Notificate.updateByPostid(req.params.id, req.body.params)
    .then(notificates => res.send(notificates))
    .catch(err => res.status(500).send(err));
});

router.delete('/deleteData/:id', (req, res) => {
  Notificate.deleteByPostid(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;