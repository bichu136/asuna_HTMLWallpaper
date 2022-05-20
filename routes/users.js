var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:processname', function(req, res, next) {
  //show the 
  res.send(req.params.uname);
});

module.exports = router;
