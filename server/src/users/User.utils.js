const User = require('./User.model');

// Generate a random 8-digit number
function generateRandomId() {
  return Math.floor(10000000 + Math.random() * 90000000);
}

// Ensure it's unique
async function generateUniqueUserId() {
  let id;
  let exists = true;

  while (exists) {
    id = generateRandomId();
    const existingUser = await User.findOne({ where: { userId: id } });
    exists = !!existingUser;
  }

  return id;
}

// 🔎 Email validator using regex
function validateEmail(email) {
  if (!email || email.length > 254) return false;

  const emailRegex = /^[^\s@!#$%^*][A-Za-z0-9]+(?:[.-]?[^\s@!#$%^*][A-Za-z0-9]+){0,3}@([A-Za-z0-9]+(?:[-.][A-Za-z0-9]+)*\.[A-Za-z]{2,})$/;
  return emailRegex.test(email);
}

module.exports = {
  generateUniqueUserId,
  validateEmail
};
