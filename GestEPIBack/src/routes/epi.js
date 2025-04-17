const express = require('express');
const router = express.Router();
const epiController = require('../controllers/epiController');

// Routes EPI
router.get('/', epiController.getAllEpi);
router.post('/', epiController.addEpi);
router.put('/:id', epiController.updateEpi);
router.delete('/:id', epiController.deleteEpi);

// Routes Contrôles à venir (alertes)
router.get('/controles/alerts', epiController.getUpcomingControles);
router.get('/controles/send-alerts', epiController.sendControleAlerts);

module.exports = router;
