// const userService = require('./User.service');

// const register = async (req, res) => {
//   try {
//     const newUser = await userService.registerUser(req.body);
//     res.status(201).json({ message: 'User created successfully', user: newUser });
//   } catch (err) {
//     console.error('Registration error:', err);
//     res.status(400).json({ error: err.message });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const token = await userService.loginUser(req.body);
//     res.status(200).json({ message: 'Login successful', token });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(401).json({ error: err.message });
//   }
// };

// module.exports = {
//   register,
//   login,
// };

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

const login = async (req, res) => {
  try {
    const token = await userService.loginUser(req.body);
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(401).json({ error: err.message });
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
  injectUserService, // exported for test injection
};
