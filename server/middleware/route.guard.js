import jwt from 'jsonwebtoken';
import User from '../models/user.model';

const guardRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({error: 'No authentication token provided'})
        }

        const userData = jwt.verify(token, process.env.JWT_SECRET);

        if (!userData) {
            return res.status(401).json({error: "Unauthorized - Incorrect credentials"})
        }

        const user = await User.findOne(userData.userId).select("-password");

        if (!user) {
            return res.status(404).json({error: "No such user"})
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Something went wrong"});
    }
}

export default guardRoute