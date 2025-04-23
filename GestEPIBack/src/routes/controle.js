const express = require('express');
const router = express.Router();
const controleController = require('../controllers/controleController');

// ➕ Ajouter un nouveau contrôle
router.post('/', controleController.addControle);

// 📄 Récupérer tous les contrôles
router.get('/', controleController.getAllControles);

// ❌ Supprimer un contrôle
router.delete('/:id', controleController.deleteControle);

// 🚨 Simuler l’envoi automatique d’alertes
router.get('/send-alerts', controleController.sendControleAlerts);

module.exports = router;
