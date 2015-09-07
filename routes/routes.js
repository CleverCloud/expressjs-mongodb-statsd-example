var express = require('express');
var uuid = require('node-uuid');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NodeJS MongoDB demo' });
});

router.get('/create', function(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.query["value"] === undefined || req.query["value"] === "") {
    res.send(JSON.stringify({status: "error", value: "Value undefined"}))
    return
  }
  var valUUID = uuid.v4();
  res.send(JSON.stringify({status: "ok", value: req.query["value"], id: valUUID}))
});

router.get('/delete', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.query["id"] === undefined || req.query["id"] === "") {
    res.send(JSON.stringify({status: "error", value: "UUID undefined"}));
    return
  }

  res.send(JSON.stringify({status: "ok", value: req.query["id"]}));
});

module.exports = router;
