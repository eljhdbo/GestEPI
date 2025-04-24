const db = require('../models/db');

// ✅ Récupérer tous les EPI
exports.getAllEpi = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM epi');
    res.json(rows);
  } catch (err) {
    console.error("❌ Erreur SQL dans getAllEpi :", err.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ✅ Ajouter un nouvel EPI
exports.addEpi = async (req, res) => {
  try {
    const {
      identifiant_custom,
      marque,
      modele,
      numero_serie,
      taille,
      couleur,
      type_epi,
      periodicite_controle,
      date_achat,
      date_fabrication,
      date_mise_service
    } = req.body;

    const sql = `
      INSERT INTO epi 
      (identifiant_custom, marque, modele, numero_serie, taille, couleur, type_epi, periodicite_controle, date_achat, date_fabrication, date_mise_service)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      identifiant_custom,
      marque,
      modele,
      numero_serie,
      taille,
      couleur,
      type_epi,
      periodicite_controle,
      date_achat,
      date_fabrication,
      date_mise_service
    ];

    const [result] = await db.query(sql, values);
    res.status(201).json({ message: "EPI ajouté avec succès", id: result.insertId });
  } catch (err) {
    console.error("❌ Erreur SQL dans addEpi :", err.message);
    res.status(500).json({ error: "Erreur lors de l’ajout de l’EPI" });
  }
};

// ✅ Mettre à jour un EPI existant
exports.updateEpi = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      marque,
      modele,
      taille,
      couleur,
      type_epi,
      periodicite_controle,
      date_achat,
      date_fabrication,
      date_mise_service
    } = req.body;

    const sql = `
      UPDATE epi 
      SET marque = ?, modele = ?, taille = ?, couleur = ?, type_epi = ?, periodicite_controle = ?, date_achat = ?, date_fabrication = ?, date_mise_service = ?
      WHERE id = ?
    `;

    const values = [
      marque,
      modele,
      taille,
      couleur,
      type_epi,
      periodicite_controle,
      date_achat,
      date_fabrication,
      date_mise_service,
      id
    ];

    await db.query(sql, values);
    res.json({ message: "EPI mis à jour avec succès" });
  } catch (err) {
    console.error("❌ Erreur SQL dans updateEpi :", err.message);
    res.status(500).json({ error: "Erreur lors de la mise à jour de l’EPI" });
  }
};

// ✅ Supprimer un EPI
exports.deleteEpi = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'DELETE FROM epi WHERE id = ?';
    await db.query(sql, [id]);
    res.json({ message: "EPI supprimé avec succès" });
  } catch (err) {
    console.error("❌ Erreur SQL dans deleteEpi :", err.message);
    res.status(500).json({ error: "Erreur lors de la suppression de l’EPI" });
  }
};

// ✅ Contrôles à venir
exports.getUpcomingControles = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT c.*, e.identifiant_custom, e.marque, e.modele
       FROM controle c
       JOIN epi e ON c.epi_id = e.id
       WHERE DATE(c.date_controle) BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)
       ORDER BY c.date_controle ASC`
    );
    res.json(rows);
  } catch (err) {
    console.error('❌ Erreur SQL dans getUpcomingControles :', err.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ✅ Simulation d'envoi automatique d'une notification pour les contrôles à venir
exports.sendControleAlerts = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.id, c.date_controle, e.identifiant_custom, e.marque, e.modele
      FROM controle c
      JOIN epi e ON c.epi_id = e.id
      WHERE DATE(c.date_controle) BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)
    `);

    rows.forEach(controle => {
      console.log(`📧 Alerte : Contrôle à venir le ${controle.date_controle} pour EPI ${controle.identifiant_custom} (${controle.marque} ${controle.modele})`);
    });

    res.json({ message: `${rows.length} alertes simulées pour envoi automatique`, controles: rows });
  } catch (err) {
    console.error('❌ Erreur simulation alerte automatique :', err.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
