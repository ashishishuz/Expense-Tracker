
const bcrypt = require('bcrypt');
const userModel = require('../Models/userModel');

// Login callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Register callback
const registerController = async (req, res) => {
    try {
        const { name, mobile, email, password } = req.body;
        console.log('Request body:', req.body); // Debug log

        // Check if any required fields are missing
        if (!name || !mobile || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required',
            });
        }

        // console.log('Attempting to register:', email); // Debug log

        const existing = await userModel.findOne({ email });
        // console.log('User with this email id is already registered:', existing); // Debug log

        if (existing) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered',
            });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            name,
            email,
            mobile,
            password: hashedPassword,
        });
        await newUser.save();

        return res.status(201).send({
            success: true,
            newUser,
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send({
            success: false,
            error: error.message,
        });
    }
};


module.exports = { loginController, registerController };
