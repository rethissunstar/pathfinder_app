// const userController = require('../../src/users/User.controller');
// const userService = require('../../src/users/User.service');

// jest.mock('../../src/users/User.service');

// describe('User Controller', () => {
//   let req;
//   let res;

//   beforeEach(() => {
//     req = {
//       body: {}
//     };

//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn()
//     };

//     jest.clearAllMocks();
//   });

//   describe('register()', () => {
//     it('should return 201 on successful registration', async () => {
//       const mockUser = { userId: 12345678, userName: 'tester', email: 'test@test.com' };
//       userService.registerUser.mockResolvedValue(mockUser);

//       req.body = {
//         userName: 'tester',
//         password: 'securepassword',
//         email: 'test@test.com',
//         permission: 'player'
//       };

//       await userController.register(req, res);

//       expect(userService.registerUser).toHaveBeenCalledWith(req.body);
//       expect(res.status).toHaveBeenCalledWith(201);
//       expect(res.json).toHaveBeenCalledWith({
//         message: 'User created successfully',
//         user: mockUser
//       });
//     });

//     it('should return 400 on registration failure', async () => {
//       userService.registerUser.mockRejectedValue(new Error('Username already exists'));

//       await userController.register(req, res);

//       expect(res.status).toHaveBeenCalledWith(400);
//       expect(res.json).toHaveBeenCalledWith({
//         error: 'Username already exists'
//       });
//     });
//   });

//   describe('login()', () => {
//     it('should return 200 and token on success', async () => {
//       userService.loginUser.mockResolvedValue('fake-token');

//       req.body = { userName: 'tester', password: 'securepassword' };

//       await userController.login(req, res);

//       expect(userService.loginUser).toHaveBeenCalledWith(req.body);
//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.json).toHaveBeenCalledWith({
//         message: 'Login successful',
//         token: 'fake-token'
//       });
//     });

//     it('should return 401 on failure', async () => {
//       userService.loginUser.mockRejectedValue(new Error('Invalid username or password'));

//       await userController.login(req, res);

//       expect(res.status).toHaveBeenCalledWith(401);
//       expect(res.json).toHaveBeenCalledWith({
//         error: 'Invalid username or password'
//       });
//     });
//   });
// });

const userController = require('../../src/users/User.controller');

// Create a mock service with jest.fn()
const mockUserService = {
  registerUser: jest.fn(),
  loginUser: jest.fn()
};

// Inject the mock service before tests run
userController.injectUserService(mockUserService);

describe('User Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  describe('register()', () => {
    it('should return 201 on successful registration', async () => {
      const mockUser = { userId: 12345678, userName: 'tester', email: 'test@test.com' };
      mockUserService.registerUser.mockResolvedValue(mockUser);

      req.body = {
        userName: 'tester',
        password: 'securepassword',
        email: 'test@test.com',
        permission: 'player'
      };

      await userController.register(req, res);

      expect(mockUserService.registerUser).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User created successfully',
        user: mockUser
      });
    });

    it('should return 400 on registration failure', async () => {
      mockUserService.registerUser.mockRejectedValue(new Error('Username already exists'));

      await userController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Username already exists'
      });
    });
  });

  describe('login()', () => {
    it('should return 200 and token on success', async () => {
      mockUserService.loginUser.mockResolvedValue('fake-token');

      req.body = { userName: 'tester', password: 'securepassword' };

      await userController.login(req, res);

      expect(mockUserService.loginUser).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Login successful',
        token: 'fake-token'
      });
    });

    it('should return 401 on failure', async () => {
      mockUserService.loginUser.mockRejectedValue(new Error('Invalid username or password'));

      await userController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Invalid username or password'
      });
    });
  });
});
