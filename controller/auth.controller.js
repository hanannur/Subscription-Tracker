import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';  


// export const signUp = async (req, res, next) => {
//     // const session = await mongoose.startSession();
//     // session.startTransaction();
//     try {
//         const { username , email , password } = req.body;

//         const existingUser = await User.findOne({ email }).session(session);
//         if(existingUser){
//             const error = new Error ('User already exists with this email');
//             error.statusCode=400;
//             throw error;
//         }

//         //Hash password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         //Create new user
//         const newUser = new User({
//             name: username,
//             email,
//             password: hashedPassword
//         });
//         await newUser.save();

//         //Generate JWT token

//         const token = jwt.sign( 
//             { userId: newUser._id, email: newUser.email },
//             JWT_SECRET,
//             { expiresIn: JWT_EXPIRES_IN }
//         )

//         // await session.commitTransaction();
//         res.status(201).json({

//             success: true,
//             message: "User created successfully",
//             token: token,
//             data: { 
//                 user: newUser
//             }
//         });

//     } catch (error) {
//         // await session.abortTransaction();
//         // session.endSession();
//         next(error);
//     } 
// }

export const signUp = async (req, res, next) => {
    try {
        const { username , email , password } = req.body;

        const existingUser = await User.findOne({ email });
        if(existingUser){
            const error = new Error ('User already exists with this email');
            error.statusCode = 400;
            throw error;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            name: username,
            email,
            password: hashedPassword
        });
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.status(201).json({
            success: true,
            message: "User created successfully",
            token,
            data: { user: newUser }
        });

    } catch (error) {
        next(error);  // just pass error to middleware
    }
}



export const signin = async (req, res, next) => {
    res.status(200).json({ message: "Signin route works" });
};

export const signout = async (req, res, next) => {
    res.status(200).json({ message: "Signout route works" });
};

