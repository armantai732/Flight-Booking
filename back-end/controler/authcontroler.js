import express, { json } from 'express'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { User } from '../model/authmodel.js'

export const Register = async (req, res)=>{
    try {
        const {name, email, mobile,  password, date, gender} = req.body

        const ExitsUser = await User.findOne({email});

        if(ExitsUser){
            return res.status(400).json({
                status: false,
                message: "User Already Register!",
            })
        }

        const hashPassword = await  bcrypt.hash(password, 10);

        const newUser =await  User.create({name, email,mobile,  password: hashPassword, date, gender});

        return res.status(201).json({
            status: true,
            message: "Register Succesfully!",
            data: newUser
        })

    } catch (error) {
        console.log(error.message)
    }
}

export const Login = async (req, res)=>{
    try {
        const {email, password} = req.body;

        const ExitsUser = await User.findOne({email});

        if(!ExitsUser){
            return res.status(404).json({
                status: false,
                message: "Register First"
            })
        }

        const isMatch = await bcrypt.compare(password, ExitsUser.password);

        if(!isMatch){
            return res.status(400).json({
                status: false,
                message: "Password is Not match",
            })
        }

        const token = jsonwebtoken.sign({id: ExitsUser._id, email:ExitsUser.email}, process.env.JSON_WEB_TOKEN, {expiresIn: "7d"});

        

        return res.status(200).json({
            status : true,
            message: "Login Succesfully!",
            data: token,
            role: ExitsUser.role,
        })

    } catch (error) {
        console.log(error.message)
    }
}


export const GetProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Profile fetched successfully",
            data: user
        });

    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            status: false,
            message: "Server Error"
        });
    }
};


export const UpdateProfile = async (req, res) => {
    try {

        const userId = req.user.id;

        const {
            name,
            mobile,
            date,
            gender
        } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        // Update only provided fields
        if (name !== undefined) {
            user.name = name;
        }

        if (mobile !== undefined) {
            user.mobile = mobile;
        }

        if (date !== undefined) {
            user.date = date || null;
        }

        if (gender !== undefined) {
            user.gender = gender || null;
        }

        await user.save();

        return res.status(200).json({
            status: true,
            message: "Profile updated successfully",
            data: {
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                date: user.date,
                gender: user.gender,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });

    } catch (error) {

        console.log(error.message);

        return res.status(500).json({
            status: false,
            message: "Something went wrong"
        });
    }
};




export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;

        // 1. Check all fields
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // 2. Check new password and confirm password
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm password do not match"
            });
        }

        // 3. Get logged-in user
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // 4. Compare old password with database password
        const isPasswordCorrect = await bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect"
            });
        }

        // 5. Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 6. Update password
        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {
        console.error("Change Password Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};