const User = require('./auth_model');
const Cart = require('../cart/cart_model');

/**
 * Auth Controller
 * Handles user authentication operations.
 */

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.register = async function (req, res) {
    try {
        const { email, password, name, phone } = req.body;

        // Validate required fields
        if (!email || !password || !name) {
            return res.status(400).json({
                status: 'error',
                statusCode: 400,
                message: 'Email, password, and name are required',
                result: null
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                status: 'error',
                statusCode: 409,
                message: 'User with this email already exists',
                result: null
            });
        }

        // Create new user (Note: In production, hash the password using bcrypt)
        const user = new User({
            email,
            password, // TODO: Hash password with bcrypt before saving
            name,
            phone
        });

        await user.save();

        // Return user without password
        const userResponse = {
            id: user._id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            createdAt: user.createdAt
        };

        res.status(201).json({
            status: 'success',
            statusCode: 201,
            message: 'User registered successfully',
            result: userResponse
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Internal Server Error',
            result: null
        });
    }
};

/**
 * Login user and merge guest cart if provided
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.login = async function (req, res) {
    try {
        const { email, password, guestId } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                status: 'error',
                statusCode: 400,
                message: 'Email and password are required',
                result: null
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                status: 'error',
                statusCode: 401,
                message: 'Invalid email or password',
                result: null
            });
        }

        // Check password (Note: In production, use bcrypt.compare)
        if (user.password !== password) { // TODO: Use bcrypt.compare in production
            return res.status(401).json({
                status: 'error',
                statusCode: 401,
                message: 'Invalid email or password',
                result: null
            });
        }

        // Merge guest cart if guestId is provided
        let mergedCart = null;
        if (guestId) {
            try {
                mergedCart = await Cart.mergeGuestCart(guestId, user._id.toString());
            } catch (cartError) {
                console.error('Error merging guest cart:', cartError);
                // Continue with login even if cart merge fails
            }
        }

        // Return user without password
        const userResponse = {
            id: user._id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            address: user.address,
            cart: mergedCart
        };

        res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Login successful',
            result: userResponse
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Internal Server Error',
            result: null
        });
    }
};

/**
 * Get user profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getProfile = async function (req, res) {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({
                status: 'error',
                statusCode: 404,
                message: 'User not found',
                result: null
            });
        }

        res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'User profile retrieved successfully',
            result: user
        });
    } catch (error) {
        console.error('Error getting user profile:', error);
        res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Internal Server Error',
            result: null
        });
    }
};
