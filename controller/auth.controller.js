import mongoose from 'mongoose';

export const signUp = async (req, res, next) => {
    const sesssion = await mongoose.startSession();
    sesssion.startTransaction();
    try {
      
    } catch (error) {
        await sesssion.abortTransaction();
        sessionStorage.endSesssion();
        next(error);
    } finally {
        sesssion.endSession();
    }
}

export const signin = async (req, res, next) => {

}

export const signout = async (req, res, next) => {  

}