const db = require('../models/db');
// Récupérer tous les EPI
exports.getAllEpi = (req, res) => {
  db.query('SELECT * FROM epi', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des EPI');
      return;
    }
    res.json(results);
  });
};

// Ajouter un nouvel EPI
exports.addEpi = (req, res) => {
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

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur lors de l’ajout de l’EPI");
      return;
    }
    res.status(201).json({ message: "EPI ajouté avec succès", id: result.insertId });
  });
};

// Mettre à jour un EPI existant
exports.updateEpi = (req, res) => {
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

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur lors de la mise à jour de l’EPI");
      return;
    }
    res.json({ message: "EPI mis à jour avec succès" });
  });
};

// Supprimer un EPI
exports.deleteEpi = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM epi WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur lors de la suppression de l’EPI");
      return;
    }
    res.json({ message: "EPI supprimé avec succès" });
  });
};

// Ajoute ce contrôleur à la fin du fichier epiController.js
exports.getUpcomingControles = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT c.*, e.identifiant_custom, e.marque, e.modele
       FROM controle c
       JOIN epi e ON c.epi_id = e.id
       WHERE DATE(c.date_controle) BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)
       ORDER BY c.date_controle ASC`
    )
    res.json(rows)
  } catch (err) {
    console.error('❌ Erreur SQL dans getUpcomingControles :', err.message)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}

// Simulation d'envoi automatique d'une notification pour les contrôles à venir
exports.sendControleAlerts = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.id, c.date_controle, e.identifiant_custom, e.marque, e.modele
      FROM controle c
      JOIN epi e ON c.epi_id = e.id
      WHERE DATE(c.date_controle) BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)
    `)

    // Simulation d'envoi d'alerte (console + réponse JSON)
    rows.forEach(controle => {
      console.log(`📧 Alerte : Contrôle à venir le ${controle.date_controle} pour EPI ${controle.identifiant_custom} (${controle.marque} ${controle.modele})`)
    })

    res.json({ message: `${rows.length} alertes simulées pour envoi automatique`, controles: rows })
  } catch (err) {
    console.error('❌ Erreur simulation alerte automatique :', err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}
