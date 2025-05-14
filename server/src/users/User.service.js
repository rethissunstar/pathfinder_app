

const bcrypt = require('bcrypt');
const { validateEmail } = require('./User.utils');
const { generateToken } = require('../../utils/loginUtils');

const createUserService = (User) => {
  const findByUsername = async (username) => {
    return await User.findOne({ where: { userName: username } });
  };

  const isUsernameAvailable = async (username) => {
    const user = await User.findOne({ where: { userName: username } });
    return !user;
  };

  const registerUser = async ({ userName, password, email, permission }) => {
    const existing = await User.findOne({ where: { userName } });
    if (existing) throw new Error('Username already exists');

    if (email && !validateEmail(email)) {
      throw new Error('Invalid email format');
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      password: hash,
      email,
      permission,
    });

    console.log("🔐 Registered new user:", {
      userId: newUser.userId,
      userName: newUser.userName,
      permission: newUser.permission,
    });

    const token = generateToken(newUser);
    console.log("✅ Token generated (register):", token);

    return {
      token,
      user: {
        userId: newUser.userId,
        userName: newUser.userName,
        permission: newUser.permission,
        email: newUser.email,
      }
    };
  };

  const loginUser = async ({ userName, password }) => {
    const user = await User.findOne({ where: { userName } });
    if (!user) throw new Error("Invalid username or password");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid username or password");

    console.log("🔐 Logging in user:", {
      userId: user.userId,
      userName: user.userName,
      permission: user.permission,
    });

    const token = generateToken(user);
    console.log("✅ Token generated (login):", token);

    return {
      token,
      user: {
        userId: user.userId,
        userName: user.userName,
        permission: user.permission,
        email: user.email,
        profilePic: user.profilePic,
        guild: user.guild,
        party: user.party,
        status: user.status,
        theme: user.theme,
        language: user.language,
      }
    };
  };

  const updateUserPreferences = async (userId, updates) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("User not found");
  
    const allowedKeys = ["theme", "language", "profilePic"];
    const safeUpdates = {};
    allowedKeys.forEach((key) => {
      if (updates[key] !== undefined) {
        safeUpdates[key] = updates[key];
      }
    });
  
    await user.update(safeUpdates);
    return user;
  };
  

  return {
    registerUser,
    loginUser,
    updateUserPreferences,
    findByUsername,
    isUsernameAvailable,
  };
};

module.exports = createUserService;
