import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, "Name must at least contain 3 characters"],
        maxLength: [20, "Name cannot exceed 20 characters"],
    },
    email: {
        type: String,
    },
    phone: Number,
    password: {
        type: String,
        minLength: [8, "Password must at least contain 8 characters"],
    }
});

export const User = mongoose.model("User", userSchema);
