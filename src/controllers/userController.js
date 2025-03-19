const User = require('../../src/models/userModel');
const bcrypt = require('bcryptjs');
// Create a new user (admin or regular user)
const createUser = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;

        // Check if the email already exists
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        // Check if the phone number already exists
        const phoneExists = await User.findOne({ phone });
        if (phoneExists) {
            return res.status(400).json({ message: 'Phone number is already in use' });
        }

        // Create the user
        const user = new User({ name, email, phone, password, role });
        await user.save();

        res.status(201).json({
            message: `${role} id created successfully`,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                password:user.password
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();  // Fetch all users from the collection

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.status(200).json({
            message: 'Users retrieved successfully',
            TotalUser: users.length,
            users
        });
    } catch (error) {
        console.error('Error retrieving users:', error.message);
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
};
// Get a single user by ID
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;  // Retrieve the user ID from URL parameters
        
        // Find user by ID
        const user = await User.findById(userId);

        // If user not found
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user data
        res.status(200).json({
            message: 'Users retrieved successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;  // Get the user ID from the URL params
        const { name, email, phone, password } = req.body;

        // Find the user by ID
        const user = await User.findById(userId);

        // If user not found
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the new email already exists (excluding the current user's email)
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email is already in use' });
            }
        }

        // Check if the new phone number already exists (excluding the current user's phone)
        if (phone && phone !== user.phone) {
            const phoneExists = await User.findOne({ phone });
            if (phoneExists) {
                return res.status(400).json({ message: 'Phone number is already in use' });
            }
        }

        // Update the user with the new data
        if (name) user.name = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (password) user.password = password;  // Make sure to hash the password if changed

        // Save the updated user
        await user.save();

        res.status(200).json({
            message: 'updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                password: user.password
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check if email, password, and role are provided
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }
        if (!role) {
            return res.status(400).json({ message: 'Role is required' });
        }

        // Find user by email
        const user = await User.findOne({ email });

        // If user doesn't exist
        if (!user) {
            return res.status(400).json({ message: 'Email is incorrect' });
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Password is incorrect' });
        }

        // Check if the user's role matches the requested role
        if (role && user.role !== role) {
            return res.status(400).json({ message: `User is not an ${role}` });
        }

        // Return success with user details (excluding password)
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, loginUser };

