const express = require('express');
const healthController = require('../controllers/healthController');

const router = express.Router();

// Liveness probe
router.get('/live', healthController.liveness);

// Readiness probe
router.get('/ready', healthController.readiness);

module.exports = router;