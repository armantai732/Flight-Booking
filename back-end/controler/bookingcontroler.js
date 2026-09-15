import mongoose from "mongoose";
import { Booking } from "../model/bookingmodel.js";
import { Flight } from "../model/flightmodel.js";


export const createBooking = async (req, res) => {
    try {

        const { FLightNumber, passengers, selectedSeats } = req.body;

        // ================= FLIGHT NUMBER =================

        if (!FLightNumber) {
            return res.status(400).json({
                status: false,
                message: "Flight Number is required!"
            });
        }


        // ================= PASSENGERS =================

        if (!passengers || passengers.length === 0) {
            return res.status(400).json({
                status: false,
                message: "Passengers are required"
            });
        }


        // ================= SELECTED SEATS =================

        if (!selectedSeats || selectedSeats.length === 0) {
            return res.status(400).json({
                status: false,
                message: "Please select at least one seat"
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


        // =================================================
        //                FARE CALCULATION
        // =================================================

        // Flight Base Fare
        const baseFare =
            Number(flight.price) * selectedSeatDetails.length;


        // Taxes & Fees = 4% of Base Fare
        const taxes = baseFare / 25;


        // Window Seat Fee
        let seatExtra = 0;

        selectedSeatDetails.forEach((selectedSeat) => {

            const seatNumber = selectedSeat.seatNumber;

            // A and F = Window Seat
            const lastLetter = seatNumber.slice(-1);

            if (lastLetter === "A" || lastLetter === "F") {
                seatExtra += 200;
            }

        });


        // Final Total
        const totalAmount =
            baseFare + taxes + seatExtra;


        // =================================================
        //              MARK SEATS AS BOOKED
        // =================================================

        selectedSeatDetails.forEach((selectedSeat) => {

            const seat = flight.seats.id(selectedSeat.seatId);

            seat.status = "booked";

        });


        await flight.save();


        // =================================================
        //                  CREATE BOOKING
        // =================================================

        const booking = await Booking.create({

            user: req.user.id,

            flight: flight._id,

            passengers: passengers,

            selectedSeats: selectedSeatDetails,

            baseFare: baseFare,

            taxes: taxes,

            seatExtra: seatExtra,

            totalAmount: totalAmount,

            paymentStatus: "Pending",

            bookingStatus: "Pending"
        });


        // =================================================
        //                    RESPONSE
        // =================================================

        return res.status(201).json({

            status: true,

            message: "Flight Booked Successfully!",

            booking

        });


    } catch (error) {

        console.error("Create Booking Error:", error);

        return res.status(500).json({

            status: false,

            message: error.message

        });

    }
};


export const getMyBookings = async (req, res) => {
    try {
        const userId = req.user.id;

        const bookings = await Booking.find({ user: userId })
            .populate("flight", "airline FLightNumber Aircraft from to departureTime arrivalTime Baggage date price image")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            status: true,
            message: "Bookings fetched successfully",
            data: bookings
        });

    } catch (error) {
        console.error("Get My Bookings Error:", error);

        return res.status(500).json({
            status: false,
            message: "Failed to fetch bookings"
        });
    }
};




export const getAllBookings = async (req, res) => {
    try {

        const bookings = await Booking.find()
            .populate("user", "name email mobile")
            .populate(
                "flight",
                "airline FLightNumber Aircraft image from to departureTime arrivalTime Baggage date price"
            )
            .sort({ createdAt: -1 });


        return res.status(200).json({
            status: true,
            message: "All bookings fetched successfully",
            data: bookings
        });

    } catch (error) {

        console.error("Get All Bookings Error:", error);

        return res.status(500).json({
            status: false,
            message: "Failed to fetch bookings"
        });
    }
};




export const approveBooking = async (req, res) => {
    try {

        const { id } = req.params;

        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({
                status: false,
                message: "Booking Not Found"
            });
        }

        // Already cancelled booking approve nahi karni
        if (booking.bookingStatus === "Cancelled") {
            return res.status(400).json({
                status: false,
                message: "Cancelled booking cannot be approved"
            });
        }

        // Already confirmed
        if (booking.bookingStatus === "Confirmed") {
            return res.status(400).json({
                status: false,
                message: "Booking is already confirmed"
            });
        }

        booking.bookingStatus = "Confirmed";

        // Payment ko bhi Paid karna hai agar approval ko payment confirmation maana hai
        booking.paymentStatus = "Paid";

        await booking.save();

        return res.status(200).json({
            status: true,
            message: "Booking approved successfully",
            booking
        });

    } catch (error) {

        console.error("Approve Booking Error:", error);

        return res.status(500).json({
            status: false,
            message: "Failed to approve booking"
        });
    }
};