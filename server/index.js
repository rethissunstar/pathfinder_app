
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./shared/db/connection");
const initializeModels = require("./src/models");
const seedUsers = require("./src/users/User.seeds");
const { loadRoutes } = require("./src");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === "production" ? "" : "http://localhost:3005", //Add production site from Heroku
  credentials: true
}));

app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Pathfinder API!" });
});

const runServer = async () => {
  try {
    console.log("📡 Connecting to database...");
    await sequelize.authenticate();

    console.log("🔧 Initializing models...");
    initializeModels(sequelize);

    console.log("🧱 Syncing database...");
    await sequelize.sync({ force: true });

    if (process.env.NODE_ENV !== "production") {
      console.log("🌱 Seeding database...");
      await seedUsers();
    }

    console.log("🚀 Starting server...");
    loadRoutes(app);
    app.listen(PORT, () => {
      console.log(`✅ Pathfinder API running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(" Startup failed:", error);
    process.exit(1);
  }
};

runServer();

// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const app = express();

// const { loadRoutes } = require('./src');
// const sequelize = require('./shared/db/connection');
// const initializeModels = require('./src/models');

// const PORT = process.env.PORT || 3001;

// // ✅ CORS dynamic origin
// const allowedOrigins = [
//   'http://localhost:3005',                      // local dev
//   process.env.FRONTEND_URL                     // production URL from .env
// ];

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     }
//     return callback(new Error('Not allowed by CORS'));
//   },
//   credentials: true,
// }));

// app.use(express.json());

// initializeModels(sequelize);
// loadRoutes(app);

// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to the Pathfinder API!' });
// });

// sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(`🚀 Pathfinder API running on http://localhost:${PORT}`);
//   });
// });
