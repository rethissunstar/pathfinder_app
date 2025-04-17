// const bcrypt = require('bcrypt');
// const User = require('./User.model');
// const { validateEmail } = require('./User.utils'); 

// const registerUser = async ({ userName, password, email, permission }) => {
//   const existing = await User.findOne({ where: { userName } });
//   if (existing) throw new Error('Username already exists');

//   // ✅ Email validation
//   if (email && !validateEmail(email)) {
//     throw new Error('Invalid email format');
//   }

//   const hash = await bcrypt.hash(password, 10);

//   const newUser = await User.create({
//     userName,
//     password: hash,
//     email,
//     permission,
//   });

//   return {
//     userId: newUser.userId,
//     userName: newUser.userName,
//     permission: newUser.permission,
//     email: newUser.email,
//   };
// };

// const loginUser = async ({ userName, password }) => {
//   const user = await User.findOne({ where: { userName } });
//   if (!user) throw new Error('Invalid username or password');

//   const match = await bcrypt.compare(password, user.password);
//   if (!match) throw new Error('Invalid username or password');

//   // I can generate a real JWT token here later if needed
//   return `FAKE-TOKEN-FOR-${user.userName}`;
// };

// module.exports = {
//   registerUser,
//   loginUser,
// };


const bcrypt = require('bcrypt');
const { validateEmail } = require('./User.utils');

/**
 * Injected User model allows for flexible, testable design
 */
const createUserService = (User) => {
  const registerUser = async ({ userName, password, email, permission }) => {
    const existing = await User.findOne({ where: { userName } });
    if (existing) throw new Error('Username already exists');

    // ✅ Email validation
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

    return {
      userId: newUser.userId,
      userName: newUser.userName,
      permission: newUser.permission,
      email: newUser.email,
    };
  };

  const loginUser = async ({ userName, password }) => {
    const user = await User.findOne({ where: { userName } });
    if (!user) throw new Error('Invalid username or password');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid username or password');

    // In real apps, generate a JWT or session
    return `FAKE-TOKEN-FOR-${user.userName}`;
  };

  return {
    registerUser,
    loginUser,
  };
};

module.exports = createUserService;
