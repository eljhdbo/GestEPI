const express = require('express');
const router = express.Router();
const {
  getAllEpi,
  addEpi,
  updateEpi,
  deleteEpi,
  getUpcomingControles
} = require('../controllers/epiController.js');

// 📄 Récupérer tous les EPI
router.get('/', getAllEpi);

// ➕ Ajouter un EPI
router.post('/', addEpi);

// 🔁 Modifier un EPI
router.put('/:id', updateEpi);

// ❌ Supprimer un EPI
router.delete('/:id', deleteEpi);

// 🚨 Récupérer les contrôles à venir
router.get('/controles/alerts', getUpcomingControles);

module.exports = router;
