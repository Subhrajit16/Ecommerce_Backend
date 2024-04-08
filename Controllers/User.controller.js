const Cart = require('../Schema/Cart.model');
const User = require('../Schema/Users.model');
const { generateToken } = require('../Service/jwtService');
const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({ message: 'User already exist with the email', email });
        }
        const newUser = new User({ firstName, lastName, email, password });
        await newUser.save();
        //here also i have to create cart for the user
        const newCart = new Cart({ user: newUser._id });
        await newCart.save();
        res.status(201).json({ message: 'User created successfully', newUser, success: true, newCart });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error, success: false });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Email or Password is wrong', success: false })
        }
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Email or Password is wrong', success: false })
        }
        const token = await generateToken(user._id, user.email);
        //Send the token in cookie
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Login successfully', id: user._id, userName: user.fullName, success: true,token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error, success: false });
    }
}

const getUserProfile = async (req, res) => {
    const {userId} = req.user;
    try {
        const user = await User.findById(userId).select('-password');
        if(!user){
            return res.status(404).json({message: 'User not found', success: false})
        }
        res.status(200).json({message: 'User found', user, success: true})
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error, success: false})
    }
}

module.exports = { register, loginUser, getUserProfile };