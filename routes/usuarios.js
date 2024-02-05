var express = require('express');

var router = express.Router();

/* GET usuarios listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

module.exports = router;
