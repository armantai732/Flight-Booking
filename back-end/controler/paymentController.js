import Razorpay from "razorpay";
import crypto from "crypto";
import { Booking } from "../model/bookingmodel.js";
import { Flight } from "../model/flightmodel.js";
import mongoose from "mongoose";

// Create Razorpay Order
export const createRazorpayOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                status: false,
                message: "Valid amount is required"
            });
        }

        const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
        const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

        if (!razorpayKeyId || !razorpayKeySecret || razorpayKeyId.includes("YOUR_KEY")) {
            return res.status(400).json({
                status: false,
                message: "Razorpay credentials are not configured in back-end/.env file."
            });
        }

        const razorpay = new Razorpay({
            key_id: razorpayKeyId,
            key_secret: razorpayKeySecret
        });

        const options = {
            amount: Math.round(Number(amount) * 100), // Amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        return res.status(200).json({
            status: true,
            order,
            key: razorpayKeyId
        });
    } catch (error) {
        console.error("Create Razorpay Order Error:", error);
        return res.status(400).json({
            status: false,
            message: error.message || "Failed to create Razorpay order. Check your Razorpay Key ID and Secret."
        });
    }
};

// Verify Razorpay Payment & Confirm Booking
export const verifyRazorpayPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            FLightNumber,
            passengers,
            selectedSeats
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                status: false,
                message: "Razorpay payment details are missing"
            });
        }

        // Verify Signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (!isAuthentic) {
            return res.status(400).json({
                status: false,
                message: "Payment verification failed. Invalid signature!"
            });
        }

        // ================= FIND FLIGHT =================
        const flight = await Flight.findOne({ FLightNumber });
        if (!flight) {
            return res.status(404).json({
                status: false,
                message: "Flight Not Found"
            });
        }

        // ================= CHECK SEATS =================
        const selectedSeatDetails = [];
        for (const selectedSeat of selectedSeats) {
            const { seatId } = selectedSeat;

            if (!mongoose.Types.ObjectId.isValid(seatId)) {
                return res.status(400).json({
                    status: false,
                    message: "Invalid Seat ID"
                });
            }

            const seat = flight.seats.id(seatId);
            if (!seat) {
                return res.status(404).json({
                    status: false,
                    message: "Seat Not Found"
                });
            }

            if (seat.status === "booked") {
                return res.status(400).json({
                    status: false,
                    message: `Seat ${seat.seatNumber} is already booked`
                });
            }

            selectedSeatDetails.push({
                seatId: seat._id,
                seatNumber: seat.seatNumber
            });
        }

        // ================= FARE CALCULATION =================
        const baseFare = Number(flight.price) * selectedSeatDetails.length;
        const taxes = baseFare / 25;
        let seatExtra = 0;

        selectedSeatDetails.forEach((selectedSeat) => {
            const seatNumber = selectedSeat.seatNumber;
            const lastLetter = seatNumber.slice(-1);
            if (lastLetter === "A" || lastLetter === "F") {
                seatExtra += 200;
            }
        });

        const totalAmount = baseFare + taxes + seatExtra;

        // ================= MARK SEATS AS BOOKED =================
        selectedSeatDetails.forEach((selectedSeat) => {
            const seat = flight.seats.id(selectedSeat.seatId);
            seat.status = "booked";
        });

        await flight.save();

        // ================= CREATE BOOKING IN DB =================
        const booking = await Booking.create({
            user: req.user.id,
            flight: flight._id,
            passengers: passengers,
            selectedSeats: selectedSeatDetails,
            baseFare: baseFare,
            taxes: taxes,
            seatExtra: seatExtra,
            totalAmount: totalAmount,
            paymentStatus: "Paid",
            bookingStatus: "Confirmed",
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature
        });

        return res.status(201).json({
            status: true,
            message: "Payment verified & Flight Booked Successfully!",
            booking
        });
    } catch (error) {
        console.error("Verify Razorpay Payment Error:", error);
        return res.status(500).json({
            status: false,
            message: error.message || "Failed to verify payment"
        });
    }
};
