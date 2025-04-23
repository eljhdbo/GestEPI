const express = require('express');
const cors = require('cors');
const app = express();

// Middleware JSON & CORS
app.use(express.json());
app.use(cors());

// Import des routes
const epiRoutes = require('./src/routes/epi');
const controleRoutes = require('./src/routes/controle');

// Routes principales
app.use('/api/epi', epiRoutes);
app.use('/api/controles', controleRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend démarré sur le port ${PORT}`);
});
