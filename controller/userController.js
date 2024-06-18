import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt"

import jwt from "jsonwebtoken";






//sign up functionality
export const register = async (req, res, next) => {
    const { name, email, phone, password } = req.body;

    // console.log(name, email, phone, password)

    if (!name || !email || !phone || !password) {
        return res.status(404).json({
            success: false,
            message: "Please fill all the fields"
        });
    }

    const isUser= await User.findOne({email: email })
    if(isUser){
        return next(res.status(400).json({
            success:false,
            message:"User already exists"
        }))
    }
    const hashedPassword=await bcrypt.hash(password,10);
    try {
        const user = await User.create({ name, email, phone, password:hashedPassword });
        res.status(200).json({
            success: true,
            message: "User created successfully",
            user: user
        });
    } catch (error) {
        next(error);
    }
};






//login funcntionaity

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields"
        });
    }

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            return res.status(401).json({
                success: false,
                message: "Password not matched"
            });
        }



        
        // Additional code for generating a token or session can be added here
        const token=await jwt.sign({id: user._id},process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRES,
        });
        res.status(200).cookie("token",token,{
            httponly:true,
            expires:new Date(Date.now()+process.env.COOKIE_EXPIRES*24*60*60*1000),
            secure:true,
            sameSite:"None",
        }).json({
            success: true,
            message: "User logged in successfully",
            user: user,
            token: token
        })


    } catch (error) {
        // Handle errors and pass to error-handling middleware
        return next(error);
    }
};



//getting the user

export const getUser=async(req,res,next)=>{

    const user=await User.findById(req.user._id);

    if(!user){

        return next(res.status(404).json({
            success:false,
            message:"User not found"
        }))
         
    }

    res.status(200).json({
        success:true,
        user:user
        // user:req.user,
    })

}




//functionaluity fro logout

export const logout=async(req,res,next)=>{
    res.status(200).cookie("token","",{
        httponly:true,
        expires:new Date(Date.now()),
        secure:true,
        sameSite:"None",
    }).json({
        success: true,
        message: "User logged out successfully"
    })
}
  