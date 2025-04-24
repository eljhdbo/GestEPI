const db = require('../models/db');

// ✅ Récupérer tous les contrôles
exports.getAllControles = async (req, res) => {
  const sql = `
    SELECT controle.*, epi.identifiant_custom, epi.marque, epi.modele
    FROM controle
    JOIN epi ON controle.epi_id = epi.id
    ORDER BY date_controle DESC
  `;
  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error("❌ Erreur lors de la récupération des contrôles :", err);
    res.status(500).send("Erreur lors de la récupération des contrôles");
  }
};

// ✅ Ajouter un contrôle
exports.addControle = async (req, res) => {
  const { epi_id, date_controle, statut, commentaire, controleur } = req.body;

  const sql = `
    INSERT INTO controle (epi_id, date_controle, statut, commentaire, controleur)
    VALUES (?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await db.query(sql, [epi_id, date_controle, statut, commentaire, controleur]);
    res.status(201).json({ message: "Contrôle ajouté avec succès", id: result.insertId });
  } catch (err) {
    console.error("❌ Erreur lors de l’ajout du contrôle :", err);
    res.status(500).send("Erreur lors de l’ajout du contrôle");
  }
};

// ✅ Supprimer un contrôle
exports.deleteControle = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM controle WHERE id = ?', [id]);
    res.json({ message: "Contrôle supprimé avec succès" });
  } catch (err) {
    console.error("❌ Erreur lors de la suppression du contrôle :", err);
    res.status(500).send("Erreur lors de la suppression du contrôle");
  }
};

// ✅ Simulation d’envoi automatique d’alertes
exports.sendControleAlerts = async (req, res) => {
  const sql = `
    SELECT controle.date_controle, epi.identifiant_custom, epi.marque, epi.modele
    FROM controle
    JOIN epi ON controle.epi_id = epi.id
    WHERE DATE(controle.date_controle) BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)
  `;

  try {
    const [results] = await db.query(sql);
    results.forEach(ctrl => {
      console.log(`📢 Alerte - Contrôle à venir le ${ctrl.date_controle} pour l’EPI ${ctrl.identifiant_custom} (${ctrl.marque} ${ctrl.modele})`);
    });
    res.json({
      message: `${results.length} alertes simulées`,
      controles: results
    });
  } catch (err) {
    console.error("❌ Erreur lors de la simulation d’envoi d’alertes :", err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
