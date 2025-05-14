const express = require('express');
const router = express.Router();
const userController = require('./User.controller');
const { getUserByUsername } = require("./User.controller");

router.get("/by-name/:username", getUserByUsername);



// POST /api/users/register
router.post('/register', userController.register);

// POST /api/users/login
router.post('/login', userController.login);

// PATCH /api/users/:id
router.patch('/:id', userController.patchUser);

module.exports = router;
