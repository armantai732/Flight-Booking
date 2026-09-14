import express from 'express'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile : {
       type: String,
        required: true 
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type : String,
        default: null
    },
    gender: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, {timestamps: true})


export const User = mongoose.model("user", userSchema);