import express from 'express'
import mongoose from 'mongoose'

const seatSchema = new mongoose.Schema({
    seatNumber: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum : ["available", "booked"],
        default: "available"
    }
});

const flightSchema = new mongoose.Schema({
    airline: {
        type: String,
        required: true,
    },
    FLightNumber: {
        type: Number,
        required: true
    },
    Aircraft: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    Baggage: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    seats: [seatSchema]
}, {timestamps: true})

export const Flight = mongoose.model("flight", flightSchema);