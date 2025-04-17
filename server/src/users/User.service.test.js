const bcrypt = require('bcrypt');
const createUserService = require('../../src/users/User.service');
const { validateEmail } = require('../../src/users/User.utils');

// Mock bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn(() => 'hashed-password'),
  compare: jest.fn((raw, hashed) => raw === 'correctPassword'),
}));

describe('User Service', () => {
  let mockUserModel;
  let userService;

  beforeEach(() => {
    // Fresh mock for each test
    mockUserModel = {
      findOne: jest.fn(),
      create: jest.fn()
    };

    userService = createUserService(mockUserModel);
    jest.clearAllMocks();
  });

  describe('registerUser()', () => {
    it('should register a new user if username is unique and email is valid', async () => {
      mockUserModel.findOne.mockResolvedValue(null);
      mockUserModel.create.mockResolvedValue({
        userId: 123,
        userName: 'newuser',
        email: 'new@example.com',
        permission: 'player'
      });

      const newUser = await userService.registerUser({
        userName: 'newuser',
        password: 'securepass',
        email: 'new@example.com',
        permission: 'player'
      });

      expect(mockUserModel.findOne).toHaveBeenCalledWith({ where: { userName: 'newuser' } });
      expect(bcrypt.hash).toHaveBeenCalledWith('securepass', 10);
      expect(mockUserModel.create).toHaveBeenCalled();
      expect(newUser).toEqual({
        userId: 123,
        userName: 'newuser',
        email: 'new@example.com',
        permission: 'player'
      });
    });

    it('should throw if username already exists', async () => {
      mockUserModel.findOne.mockResolvedValue({ userName: 'existinguser' });

      await expect(userService.registerUser({
        userName: 'existinguser',
        password: 'test',
        email: 'valid@example.com'
      })).rejects.toThrow('Username already exists');
    });

    it('should throw if email is invalid', async () => {
      mockUserModel.findOne.mockResolvedValue(null);

      await expect(userService.registerUser({
        userName: 'newuser',
        password: 'test',
        email: 'bademail'
      })).rejects.toThrow('Invalid email format');
    });
  });

  describe('loginUser()', () => {
    it('should return token if login is successful', async () => {
      mockUserModel.findOne.mockResolvedValue({
        userName: 'validuser',
        password: 'correctPassword' // will match in mocked bcrypt.compare
      });

      const token = await userService.loginUser({
        userName: 'validuser',
        password: 'correctPassword'
      });

      expect(mockUserModel.findOne).toHaveBeenCalledWith({ where: { userName: 'validuser' } });
      expect(bcrypt.compare).toHaveBeenCalled();
      expect(token).toBe('FAKE-TOKEN-FOR-validuser');
    });

    it('should throw if user not found', async () => {
      mockUserModel.findOne.mockResolvedValue(null);

      await expect(userService.loginUser({
        userName: 'ghost',
        password: 'whatever'
      })).rejects.toThrow('Invalid username or password');
    });

    it('should throw if password is incorrect', async () => {
      mockUserModel.findOne.mockResolvedValue({
        userName: 'wrongpass',
        password: 'notMatch'
      });

      bcrypt.compare.mockResolvedValue(false);

      await expect(userService.loginUser({
        userName: 'wrongpass',
        password: 'incorrect'
      })).rejects.toThrow('Invalid username or password');
    });
  });
});
