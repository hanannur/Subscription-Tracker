import User from "../models/user.model.js";


export const getUsers = async (req, res, next) => { 
    try {
        const users = await User.find().select('-password')   ;
        res.status(200).json({ users });    
    }catch (error) {
        next(error);
    }
}
export const getUser = async (req, res, next) => {     
    try {
        const users = await User.findById(req.params.id).select('-password')   ;
        if(!users){
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ users });    
    } catch (error) {
        next(error);
    }   };