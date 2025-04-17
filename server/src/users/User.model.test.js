const { Sequelize } = require('sequelize');

// In-memory SQLite DB for test isolation
const sequelize = new Sequelize('sqlite::memory:', { logging: false });

// ✅ Load model through factory
const defineUserModel = require('../../src/users/User.model');
const User = defineUserModel(sequelize); // 🔁 pass in sequelize instance

describe('User Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it('should create a user with expected values', async () => {
    const user = await User.create({
      userName: 'modelTester',
      password: 'hashedPass123',
      email: 'model@example.com'
    });

    expect(user.userId).toBeDefined();
    expect(user.userName).toBe('modelTester');
    expect(user.email).toBe('model@example.com');
    expect(user.permission).toBe('player'); // default
    expect(user.theme).toBe('light');       // default
    expect(user.status).toBe(true);         // default
  });

  it('should fail if required fields are missing', async () => {
    await expect(User.create({})).rejects.toThrow();
  });
});
