const express = require('express');
const mongodb = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  mongodb.getVal(res);
});

router.post('/values', (req, res) => {
  const val = req.body.value;
  if (!val) {
    return res.json({ status: 'error', value: 'Value undefined' });
  }
  mongodb.sendVal(val, res);
});

router.delete('/values/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.json({ status: 'error', value: 'UUID undefined' });
  }
  mongodb.delVal(id);
  res.json({ status: 'ok', value: id });
});

module.exports = router;
