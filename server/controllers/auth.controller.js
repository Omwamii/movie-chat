import User from '../models/user.model.js'
import bcrypt from "bcryptjs";
import generateToken from '../utils/token.util.js';

export const signup = async (req, res) => {
    // signup user
    try {

        const {username, password, confirmation} = req.body;

        console.log({
            username,
            password,
            confirmation
        })

        const user = await User.findOne({
            username
        })

        if (user) {
            return res.status(400).json({error: "Username already exists"})
        }

        // hash user's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = User({
            username,
            password: hashedPassword,
        })

        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save();
            const userObj = newUser.toObject();

            return res.status(201).json(userObj);
        } else {
            res.status(400).json({error: 'Invalid user data'})
        }
    } catch (error) {
        console.log("Error" + error);
        res.send(500).json({error: error.message})
    }
}

export const login = async (req, res) => {
    // login user
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username}).populate('joinedChannels')

        if (!user) {
            return res.status(400).json({error: "Invalid credentials"})
        }

        const isUserPassword = await bcrypt.compare(password, user.password)

        if (!isUserPassword) {
            return res.status(400).json({error: "Invalid credentials"});
        }

        generateToken(user._id, res);

        const userObj = user.toObject();
        return res.status(200).json({
            ...userObj
        })

    } catch (error) {
        console.log("error in login controller" + error.message);
        res.status(500).json({error: "Server error"});
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("token", "", { maxAge: 0});
        res.status(200).json({message: 'logged out successfully'})
    } catch (error) {
        console.log("Error logging out" + error);
        res.status(500);
    }
    // logout user
}