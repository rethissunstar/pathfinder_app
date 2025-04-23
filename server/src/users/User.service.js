// const bcrypt = require('bcrypt');
// const { validateEmail } = require('./User.utils');
// const { generateToken } = require('../../utils/loginUtils');

// const createUserService = (User) => {
//   const registerUser = async ({ userName, password, email, permission }) => {
//     const existing = await User.findOne({ where: { userName } });
//     if (existing) throw new Error('Username already exists');

//     if (email && !validateEmail(email)) {
//       throw new Error('Invalid email format');
//     }

//     const hash = await bcrypt.hash(password, 10);

//     const newUser = await User.create({
//       userName,
//       password: hash,
//       email,
//       permission,
//     });

//     const token = generateToken(newUser); // 🔐 generate token for new user

//     return {
//       token,
//       user: {
//         userId: newUser.userId,
//         userName: newUser.userName,
//         permission: newUser.permission,
//         email: newUser.email,
//       }
//     };
//   };

//   const loginUser = async ({ userName, password }) => {
//     const user = await User.findOne({ where: { userName } });
//     if (!user) throw new Error("Invalid username or password");

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) throw new Error("Invalid username or password");

//     const token = generateToken(user); // 🔐 real JWT

//     return {
//       token,
//       user: {
//         userId: user.userId,
//         userName: user.userName,
//         permission: user.permission,
//         email: user.email,
//         profilePic: user.profilePic,
//         guild: user.guild,
//         party: user.party,
//         status: user.status,
//       }
//     };
//   };

//   return {
//     registerUser,
//     loginUser,
//   };
// };

// module.exports = createUserService;

const bcrypt = require('bcrypt');
const { validateEmail } = require('./User.utils');
const { generateToken } = require('../../utils/loginUtils');

const createUserService = (User) => {
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
      }
    };
  };

  return {
    registerUser,
    loginUser,
  };
};

module.exports = createUserService;
