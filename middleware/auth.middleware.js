import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { JWT_SECRET } from '../config/env.js';
const authorize= async (req, res, next) => {
    try {
        let token
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if(!token){
            return res.status(401).json({ message: 'No token provided' });
        } 
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(401).json({ message: 'User not found' });
        }
        req.user = user;
        next();

    } catch (error) {
         next({ statusCode: 401, message: 'Invalid token', error: error.message });
    }
};

export default authorize;   