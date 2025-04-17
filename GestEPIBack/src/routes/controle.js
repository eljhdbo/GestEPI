const express = require('express');
const router = express.Router();
const controleController = require('../controllers/controleController');

// Récupérer tous les contrôles
router.get('/', controleController.getAllControles);

// Ajouter un nouveau contrôle
router.post('/', controleController.addControle);

// Supprimer un contrôle
router.delete('/:id', controleController.deleteControle);

module.exports = router;
