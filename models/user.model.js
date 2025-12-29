import mongoose from "mongoose"; const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim:true
  },
  email: {      
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim:true ,
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [6, 'Password must be at least 6 characters long']

  }, 
}, { timestamps: true });

const User= mongoose.model('User', userSchema);
export default User;

