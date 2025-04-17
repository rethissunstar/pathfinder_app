require('dotenv').config();
const express = require('express');
const app = express();

const { loadRoutes } = require('./src');
const sequelize = require('./shared/db/connection');
const initializeModels = require('./src/models'); 

const PORT = process.env.PORT || 3001;

app.use(express.json());

initializeModels(sequelize);

loadRoutes(app);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Pathfinder API running on http://localhost:${PORT}`);
  });
});
