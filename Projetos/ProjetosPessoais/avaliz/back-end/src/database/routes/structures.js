const express = require('express');

const router = express.Router();

const { getAllCercas, isInPolugon } =  require('../controllers/structures');

router.get('/', getAllCercas);

router.post('/', isInPolugon)

module.exports = router;