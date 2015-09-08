var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'San Diego SweepAware' });
});

router.get('/addressSelect', function(req, res, next) {
  res.render('addressSelect', { title: 'San Diego SweepAware' });
});

router.get('/manualAddress', function(req, res, next) {
  res.render('manualAddress', { title: 'San Diego SweepAware' });
});

router.get('/radiusSelect', function(req, res, next) {
  res.render('radiusSelect', { title: 'San Diego SweepAware' });
});


module.exports = router;
