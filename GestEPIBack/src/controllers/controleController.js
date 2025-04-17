const db = require('../models/db');

// Récupérer tous les contrôles
exports.getAllControles = (req, res) => {
  const sql = `
    SELECT controle.*, epi.identifiant_custom, epi.marque, epi.modele
    FROM controle
    JOIN epi ON controle.epi_id = epi.id
    ORDER BY date_controle DESC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des contrôles");
      return;
    }
    res.json(results);
  });
};

// Ajouter un contrôle
exports.addControle = (req, res) => {
  const { epi_id, date_controle, statut, commentaire, controleur } = req.body;
  const sql = `
    INSERT INTO controle (epi_id, date_controle, statut, commentaire, controleur)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [epi_id, date_controle, statut, commentaire, controleur], (err, result) => {
    if (err) {
      res.status(500).send("Erreur lors de l’ajout du contrôle");
      return;
    }
    res.status(201).json({ message: "Contrôle ajouté avec succès", id: result.insertId });
  });
};

// Supprimer un contrôle
exports.deleteControle = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM controle WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).send("Erreur lors de la suppression du contrôle");
      return;
    }
    res.json({ message: "Contrôle supprimé avec succès" });
  });
};
