const express = require('express');
const authController = require('./auth_controller');
const router = express.Router();

/**
 * @route POST /auth/register
 * @description Register a new user
 * @access Public
 */
router.post('/auth/register', authController.register);

/**
 * @route POST /auth/login
 * @description Login user and merge guest cart
 * @access Public
 */
router.post('/auth/login', authController.login);

/**
 * @route GET /auth/profile/:userId
 * @description Get user profile
 * @access Public
 */
router.get('/auth/profile/:userId', authController.getProfile);

module.exports = router;
