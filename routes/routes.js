var express = require('express');
var mongodb = require('../db');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  mongodb.getVal(res);
});

router.post('/create', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var val = req.body.value;

  if (val === undefined || val === "") {
    res.send(JSON.stringify({status: "error", value: "Value undefined"}));
    return
  }
  mongodb.sendVal(val, res);
});

router.get('/delete', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.query["id"] === undefined || req.query["id"] === "") {
    res.send(JSON.stringify({status: "error", value: "UUID undefined"}));
    return
  }
  mongodb.delVal(req.query["id"]);
  res.send(JSON.stringify({status: "ok", value: req.query["id"]}));
});

module.exports = router;
