require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const sequelize = require("./shared/db/connection");
const initializeModels = require("./src/models");
const seedUsers = require("./src/users/User.seeds");
const defineUserModel = require("./src/users/User.model");
const { loadRoutes } = require("./src");

const PORT = process.env.PORT || 3001;
const SECRET = process.env.JWT_SECRET || "supersecret";

const app = express();

// ✅ Middleware
app.use(cors({
  origin: process.env.NODE_ENV === "production" ? "" : "http://localhost:3005",
  credentials: true,
}));
app.use(express.json());

// ✅ Protected route to return authenticated user info
app.get("/", async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
    console.log("this is the token sent", token)
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, SECRET);
    const { userId } = decoded;

    const User = defineUserModel(sequelize);
    const user = await User.findOne({ where: { userId } });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      user: {
        userId: user.userId,
        userName: user.userName,
        email: user.email,
        permission: user.permission,
        profilePic: user.profilePic,
        guild: user.guild,
        party: user.party,
        status: user.status,
        theme: user.theme,
        language: user.language,
      },
    });
  } catch (err) {
    console.error("Error in GET /:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Startup sequence
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
    console.error("❌ Startup failed:", error);
    process.exit(1);
  }
};

runServer();

