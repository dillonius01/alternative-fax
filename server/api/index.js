const router = require('express').Router();
const fax = require('./fax');

router.use('/fax', fax);

module.exports = router;
