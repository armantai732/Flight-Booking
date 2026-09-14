import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "flight",
        required: true
    },
    passengers: [
        {
            name: {
                type : String,
                required: true,
            },
            age: {
                type : String,
                required: true,
            },
            gender: {
                type: String,
                required: true
            }
        }
    ],
    selectedSeats : [
        {
            seatId : {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            seatNumber : {
                type: String,
                required: true
            }
        }
    ],
    totalAmount: {
        type : Number,
        required: true,
    },
    paymentStatus: {
        type : String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending"
    },
    bookingStatus: {
        type : String,
        enum: ["Confirmed", "Cancelled", "Pending"],
        default: "Pending"
    }
}, {timestamps: true})

export const Booking = mongoose.model("Booking", bookingSchema);