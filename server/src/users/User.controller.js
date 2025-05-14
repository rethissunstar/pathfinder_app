
let userService; // This will be initialized below or injected in tests

const register = async (req, res) => {
  try {
    const newUser = await userService.registerUser(req.body);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(400).json({ error: err.message });
  }
};

const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await userService.findByUsername(username);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ userId: user.userId });
  } catch (err) {
    console.error("Lookup failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { token, user } = await userService.loginUser(req.body); 
    res.status(200).json({
      message: 'Login successful',
      token,
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
    console.error("Login error:", err);
    res.status(401).json({ error: err.message });
  }
};

// const patchUser = async (req, res) => {
//   const { id } = req.params;
//   const { theme, language } = req.body;

//   try {
//     const updatedUser = await userService.updateUserPreferences(id, { theme, language });
//     res.json({ message: "User updated", user: updatedUser });
//   } catch (err) {
//     console.error("Update error:", err);
//     res.status(500).json({ error: err.message });
//   }
// };
const patchUser = async (req, res) => {
    const { id } = req.params;
    const { theme, language, profilePic } = req.body;
  
    try {
      const updatedUser = await userService.updateUserPreferences(id, { theme, language, profilePic });
      res.json({ message: "User updated", user: updatedUser });
    } catch (err) {
      console.error("Update error:", err);
      res.status(500).json({ error: err.message });
    }
  };
  
  const checkUsernameAvailability = async (req, res) => {
    const { username } = req.params;
    try {
      const available = await userService.isUsernameAvailable(username);
      res.json({ available });
    } catch (err) {
      console.error("Username check failed:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

// ✅ This allows tests to inject a mock service
const injectUserService = (service) => {
  userService = service;
};

// ✅ If this file is used in app runtime (not test), use real service
if (process.env.NODE_ENV !== 'test') {
  const defineUserModel = require('./User.model');
  const createUserService = require('./User.service');
  const sequelize = require('../../shared/db/connection');

  const User = defineUserModel(sequelize);
  userService = createUserService(User);
}

module.exports = {
  register,
  login,
  patchUser,
  getUserByUsername,
  injectUserService,
  checkUsernameAvailability,
};
