import mongoose from "mongoose";
import { Booking } from "../model/bookingmodel.js";
import { Flight } from "../model/flightmodel.js";


export const createBooking = async (req, res)=>{
    try {
        
        const {FLightNumber, passengers, selectedSeats} = req.body;

        // flight number find 

        if(!FLightNumber){
            return res.status(400).json({
                status: false,
                message: "Flight Number is required!"
            })
        }

        if(!passengers || passengers.length ===0){
            return res.status(400).json({
                status: false,
                message: "Passengers are required"
            })
        }

        if(!selectedSeats || selectedSeats.length === 0){
            return res.status(400).json({
                status: false,
                message: "Please select at least one seat"
            });
        }

        const flight = await Flight.findOne({FLightNumber});
        
        if (!flight) {
            return res.status(404).json({
                status: false,
                message: "Flight Not Found"
            });
        }

        

        const selectedSeatDetails = [];

        for(const selecttedSeat of selectedSeats){
            const {seatId } = selecttedSeat;

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


        const totalAmount =
            Number(flight.price) * selectedSeatDetails.length;

        //  Mark Selected Seats as Booked
        
        selectedSeatDetails.forEach((selectedSeat) => {

            const seat = flight.seats.id(selectedSeat.seatId);

            seat.status = "booked";
        });


        await flight.save();


        const booking = await Booking.create({
            user: req.user.id,
            flight: flight._id,
            passengers: passengers,
            selectedSeats: selectedSeatDetails,
            totalAmount: totalAmount,
            paymentStatus: "Pending",
            bookingStatus: "Pending"
        })

        return res.status(201).json({
            status: true,
            message: "Flight Booked Successfully!",
            booking
        });


    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}




export const getBooking = async (req, res)=>{
    try {

        const { seatNumber } = req.params;

        const flight  = await Flight.findOne({"seats.seatNumber": seatNumber});

        if(!flight){
            return res.status(404).json({
                status: false,
                message: "Flight or seat not found",
            })
        }

        const seat  =  flight.seats.find(
            (seat)=> seat.seatNumber === seatNumber
        )

        if(!seat){
            return res.status(404).json({
                status: false,
                message: "Seat not found"
            });
        }

        if(seat.status === "booked"){
            return res.status(200).json({
                status: false,
                message: "Seat already booked",
                data: seat
            });
        }

        return res.status(200).json({
            status: true,
            message: "Seat is available",
            data: seat
        });

        
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}