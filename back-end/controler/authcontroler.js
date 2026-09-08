import express, { json } from 'express'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { User } from '../model/authmodel.js'

export const Register = async (req, res)=>{
    try {
        const {name, email, password} = req.body

        const ExitsUser = await User.findOne({email});

        if(ExitsUser){
            return res.status(400).json({
                status: false,
                message: "User Already Register!",
            })
        }

        const hashPassword = await  bcrypt.hash(password, 10);

        const newUser =await  User.create({name, email, password: hashPassword});

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
        })

    } catch (error) {
        console.log(error.message)
    }
}