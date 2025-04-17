const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Importation de routes
const epiRoutes = require('./src/routes/epi');

// Utilisation sous le bon préfixe
app.use('/api', epiRoutes);

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
